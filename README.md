# studio-jinha

채팅하듯 문장을 입력하면 OpenAI **GPT Image 2.5**로 이미지를 만들고, 이어지는 메시지로 계속 고치는 터미널 도구예요.

## 준비

```bash
npm install
cp .env.example .env   # .env 에 OPENAI_API_KEY 입력
```

Node.js 21.7 이상이 필요해요. `.env`는 git에 올라가지 않아요.

## 사용

```bash
npm run chat
```

```
생성> 창가에 앉은 고양이, 따뜻한 오후 햇살
→ outputs/2026-...png (생성)
수정> 배경을 밤으로 바꿔줘
→ outputs/2026-...png (수정)
```

첫 메시지는 새 이미지를 만들고, 다음 메시지부터는 직전 결과를 고쳐요. 결과는 `outputs/`에 저장돼요.

| 명령 | 설명 |
|---|---|
| `/new` | 새 이미지로 시작 |
| `/open <파일>` | 이 이미지부터 이어서 수정 |
| `/add <파일>` | 다음 요청에 참고 이미지 추가 (여러 장 가능) |
| `/model flare\|sunburst` | `flare`: 빠른 생성 (기본), `sunburst`: 정밀 편집, 더 느림 |
| `/size <WxH\|auto>` | 예: `1024x1536`, `1536x864` (16의 배수, 비율 1:3~3:1, 최대 3840x2160) |
| `/quality <low\|medium\|high\|xhigh\|max\|auto>` | 품질 |
| `/status`, `/help`, `/quit` | |

한 장만 만들 때:

```bash
node chat.mjs "제품 사진, 흰 배경"
node chat.mjs --edit outputs/a.png "흑백으로"
```
