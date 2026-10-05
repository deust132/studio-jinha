#!/usr/bin/env node
// 채팅으로 이미지를 만들고 이어서 고치는 터미널 도구 (OpenAI GPT Image 2.5)
//
//   npm run chat                          대화 모드
//   node chat.mjs "프롬프트"               한 장만 생성
//   node chat.mjs --edit a.png "프롬프트"  기존 이미지 수정

import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import OpenAI, { toFile } from "openai";

try {
  process.loadEnvFile(".env");
} catch {}

if (!process.env.OPENAI_API_KEY) {
  console.error("OPENAI_API_KEY가 없어요. .env 파일이나 환경변수에 넣어 주세요.");
  process.exit(1);
}

const MODELS = {
  flare: "gpt-image-2.5-flare", // 빠른 일반 생성
  sunburst: "gpt-image-2.5-sunburst", // 정밀 편집, 더 느림
};
const QUALITIES = ["low", "medium", "high", "xhigh", "max", "auto"];
const OUT_DIR = "outputs";

const client = new OpenAI();
const state = {
  model: process.env.IMAGE_MODEL || MODELS.flare,
  size: "auto",
  quality: "auto",
  current: null, // 마지막 결과 이미지 경로. 다음 메시지는 이 이미지를 수정함
  refs: [], // /add 로 붙인 참고 이미지
};

function save(b64, format = "png") {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const file = path.join(OUT_DIR, `${stamp}.${format}`);
  fs.writeFileSync(file, Buffer.from(b64, "base64"));
  return file;
}

async function run(prompt) {
  const inputs = [state.current, ...state.refs].filter(Boolean);
  const common = {
    model: state.model,
    prompt,
    size: state.size,
    quality: state.quality,
  };

  const started = Date.now();
  const res = inputs.length
    ? await client.images.edit({
        ...common,
        image: await Promise.all(
          inputs.map((p) => toFile(fs.createReadStream(p), path.basename(p))),
        ),
      })
    : await client.images.generate(common);

  const file = save(res.data[0].b64_json, res.output_format);
  state.current = file;
  state.refs = [];
  const secs = ((Date.now() - started) / 1000).toFixed(1);
  console.log(`→ ${file} (${inputs.length ? "수정" : "생성"}, ${secs}s)`);
  return file;
}

const HELP = `
그냥 문장을 입력하면 이미지를 만들어요. 그다음 메시지는 방금 만든 이미지를 고쳐요.

  /new              새 이미지로 시작 (이전 결과를 이어서 고치지 않음)
  /open <파일>      이 이미지부터 이어서 수정
  /add <파일>       다음 요청에 참고 이미지 추가 (여러 장 가능)
  /model flare|sunburst
  /size <WxH|auto>  예: 1024x1536, 1536x864 (16의 배수, 비율 1:3~3:1)
  /quality ${QUALITIES.join("|")}
  /status           현재 설정 보기
  /quit             종료
`;

function command(line) {
  const [cmd, ...rest] = line.slice(1).split(/\s+/);
  const arg = rest.join(" ").trim();
  const needFile = () => {
    if (!fs.existsSync(arg)) throw new Error(`파일이 없어요: ${arg}`);
    return arg;
  };

  switch (cmd) {
    case "help":
      console.log(HELP);
      break;
    case "new":
      state.current = null;
      state.refs = [];
      console.log("새 이미지로 시작해요.");
      break;
    case "open":
      state.current = needFile();
      console.log(`이어서 고칠 이미지: ${state.current}`);
      break;
    case "add":
      state.refs.push(needFile());
      console.log(`참고 이미지 ${state.refs.length}장`);
      break;
    case "model":
      if (!MODELS[arg]) throw new Error("flare 또는 sunburst");
      state.model = MODELS[arg];
      console.log(`모델: ${state.model}`);
      break;
    case "size":
      if (arg !== "auto" && !/^\d+x\d+$/.test(arg)) throw new Error("예: 1024x1536 또는 auto");
      state.size = arg;
      console.log(`크기: ${state.size}`);
      break;
    case "quality":
      if (!QUALITIES.includes(arg)) throw new Error(QUALITIES.join(", "));
      state.quality = arg;
      console.log(`품질: ${state.quality}`);
      break;
    case "status":
      console.log(state);
      break;
    case "quit":
    case "exit":
      return false;
    default:
      throw new Error(`모르는 명령이에요: /${cmd} (/help 참고)`);
  }
  return true;
}

async function chat() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const prompt = () => {
    rl.setPrompt(state.current ? "\n수정> " : "\n생성> ");
    rl.prompt();
  };
  console.log(`GPT Image 2.5 채팅 (${state.model}) - /help 로 명령어 보기`);
  prompt();

  for await (const raw of rl) {
    const line = raw.trim();
    try {
      if (line.startsWith("/")) {
        if (!command(line)) break;
      } else if (line) {
        await run(line);
      }
    } catch (err) {
      console.error(`오류: ${err.message}`);
    }
    prompt();
  }
  rl.close();
}

const args = process.argv.slice(2);
if (args.length === 0) {
  await chat();
} else {
  if (args[0] === "--edit") {
    if (!fs.existsSync(args[1] ?? "")) {
      console.error(`파일이 없어요: ${args[1]}`);
      process.exit(1);
    }
    state.current = args[1];
    args.splice(0, 2);
  }
  await run(args.join(" "));
}
