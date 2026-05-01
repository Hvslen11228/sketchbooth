// Funny captions shown after photo capture
export const MN_CAPTIONS = [
  "гоё гарлаа шүү 😂",
  "аймар царайтай байна 😭",
  "энэ хэн бэ 🤣",
  "crush харчихлаа 💀",
  "паспортын зураг болохгүй 💀",
  "TikTok viral болно шүү ✨",
  "ээж нь харвал уйлна 😭",
  "filter хэрэгтэй байна бол 🥲",
  "яаж ийм гоё байдаг юм 😍",
  "найздаа яаж явуулахав 😅",
  "нүдээ аниад дахиж хий 🙈",
  "10/10 зураг гарлаа 🔥",
  "Instagram-д тавиарай 📱",
  "ойр дотны хүмүүстэй share хий 😂",
];

export const EN_CAPTIONS = [
  "You look amazing 😂",
  "What is that face 😭",
  "Who is this person 🤣",
  "Your crush saw this 💀",
  "Not for passport 💀",
  "TikTok material ✨",
  "Mom would cry 😭",
  "Needs a filter 🥲",
  "How are you this cute 😍",
  "Do I send this? 😅",
  "Try again with eyes open 🙈",
  "10/10 pic 🔥",
  "Post this on Instagram 📱",
  "Share with besties 😂",
];

export type Mood = { emoji: string; label_mn: string; label_en: string };

export const MOODS: Mood[] = [
  { emoji: "😄", label_mn: "Маш сайхан байна!", label_en: "Happy vibes!" },
  { emoji: "🍺", label_mn: "Согтуу мэт харагдана", label_en: "Drunk energy" },
  { emoji: "😴", label_mn: "Унтмаар байна уу?", label_en: "Sleepy mode" },
  { emoji: "🤪", label_mn: "Галзуурсан байна!", label_en: "Absolutely crazy!" },
  { emoji: "😎", label_mn: "Хэт cool байна", label_en: "Too cool for this" },
  { emoji: "🥺", label_mn: "Уйлмаар байна уу?", label_en: "About to cry" },
  { emoji: "🔥", label_mn: "Халуун байна!", label_en: "On fire!" },
  { emoji: "👻", label_mn: "Аймаар харагдана", label_en: "Spooky vibes" },
];

export interface FunnyResult {
  caption: string;
  mood: Mood;
  beautyScore: number;
  cringeScore: number;
  viralScore: number;
}

/** Generate a random funny result for the result screen */
export function getRandomResult(lang: "mn" | "en"): FunnyResult {
  const captions = lang === "mn" ? MN_CAPTIONS : EN_CAPTIONS;
  return {
    caption: captions[Math.floor(Math.random() * captions.length)],
    mood: MOODS[Math.floor(Math.random() * MOODS.length)],
    beautyScore: Math.floor(Math.random() * 40) + 60,         // 60–100
    cringeScore: Math.floor(Math.random() * 80) + 70,         // 70–150
    viralScore: Math.floor(Math.random() * 50) + 50,          // 50–100
  };
}

/** Random emoji sticker for overlay */
const STICKERS = ["😂", "🔥", "💀", "✨", "🤣", "👑", "💅", "🫡", "🥵", "🤙", "💯", "🎉", "😎", "🫶", "👀"];
export function getRandomStickers(count = 3): { emoji: string; x: number; y: number; rotate: number; size: number }[] {
  return Array.from({ length: count }, () => ({
    emoji: STICKERS[Math.floor(Math.random() * STICKERS.length)],
    x: Math.random() * 80 + 5,           // 5–85% from left
    y: Math.random() * 80 + 5,           // 5–85% from top
    rotate: (Math.random() - 0.5) * 40,  // -20 to +20 deg
    size: Math.floor(Math.random() * 20) + 24, // 24–44px
  }));
}
