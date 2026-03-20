export type Photo = {
  id: string;
  src: string;
  alt: string;
  category: string;
  width: number;
  height: number;
};

export const categories = ["All", "Portrait", "Landscape", "Product"] as const;

// Cloudinary에 사진 업로드 후 여기에 추가하세요
// src 형식: "https://res.cloudinary.com/de7dksviz/image/upload/v1234567890/folder/filename.jpg"
export const photos: Photo[] = [
  // --- 샘플 (Cloudinary 데모 이미지) ---
  {
    id: "sample-1",
    src: "https://res.cloudinary.com/demo/image/upload/q_auto,f_auto/lady.jpg",
    alt: "Portrait sample",
    category: "Portrait",
    width: 800,
    height: 1200,
  },
  {
    id: "sample-2",
    src: "https://res.cloudinary.com/demo/image/upload/q_auto,f_auto/brown_sheep.jpg",
    alt: "Landscape sample",
    category: "Landscape",
    width: 1200,
    height: 800,
  },
  {
    id: "sample-3",
    src: "https://res.cloudinary.com/demo/image/upload/q_auto,f_auto/shoes.jpg",
    alt: "Product sample",
    category: "Product",
    width: 1000,
    height: 1000,
  },
  {
    id: "sample-4",
    src: "https://res.cloudinary.com/demo/image/upload/q_auto,f_auto/couple.jpg",
    alt: "Portrait sample 2",
    category: "Portrait",
    width: 800,
    height: 1200,
  },
  {
    id: "sample-5",
    src: "https://res.cloudinary.com/demo/image/upload/q_auto,f_auto/fat_cat.jpg",
    alt: "Landscape sample 2",
    category: "Landscape",
    width: 1200,
    height: 800,
  },
  {
    id: "sample-6",
    src: "https://res.cloudinary.com/demo/image/upload/q_auto,f_auto/basketball_in_net.jpg",
    alt: "Product sample 2",
    category: "Product",
    width: 1000,
    height: 1000,
  },
];
