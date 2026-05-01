export type FrameId =
  | "classic" | "neon_pink" | "neon_cyan" | "gold" | "dark"
  | "pastel"  | "rainbow"   | "retro"     | "minimal" | "party"
  | "cherry"  | "ocean"     | "forest"    | "sunset"  | "midnight"
  | "cotton"  | "lavender"  | "noir"      | "holographic" | "polaroid";

export interface FrameOption {
  id: FrameId;
  label_mn: string;
  label_en: string;
  emoji: string;
  bgGradient: [string, string, string];
  borderColor: string;
  headerColor: string;
  captionColor: string;
  accentColor: string;
  pattern?: "dots" | "stars" | "hearts" | "zigzag" | "none";
  previewCSS: string;
}

export const FRAMES: FrameOption[] = [
  // ── Original 10 ──────────────────────────────────────────
  {
    id: "classic", label_mn: "Сонгодог", label_en: "Classic", emoji: "🤍",
    bgGradient: ["#1a1a2e","#16213e","#0f3460"],
    borderColor: "#ffffff", headerColor: "#ff2d78", captionColor: "#facc15", accentColor: "#ff2d78",
    pattern: "none", previewCSS: "linear-gradient(135deg,#1a1a2e,#0f3460)",
  },
  {
    id: "neon_pink", label_mn: "Неон ягаан", label_en: "Neon Pink", emoji: "💗",
    bgGradient: ["#1a0a2e","#2d0a3e","#1a0020"],
    borderColor: "#ff2d78", headerColor: "#ff2d78", captionColor: "#ff8fb1", accentColor: "#ff2d78",
    pattern: "dots", previewCSS: "linear-gradient(135deg,#1a0a2e,#2d0a3e)",
  },
  {
    id: "neon_cyan", label_mn: "Неон цэнхэр", label_en: "Neon Cyan", emoji: "💎",
    bgGradient: ["#001a2e","#002d3e","#001520"],
    borderColor: "#06b6d4", headerColor: "#06b6d4", captionColor: "#67e8f9", accentColor: "#06b6d4",
    pattern: "stars", previewCSS: "linear-gradient(135deg,#001a2e,#002d3e)",
  },
  {
    id: "gold", label_mn: "Алтан", label_en: "Gold", emoji: "👑",
    bgGradient: ["#1a1000","#2d1e00","#1a0f00"],
    borderColor: "#f59e0b", headerColor: "#f59e0b", captionColor: "#fde68a", accentColor: "#f59e0b",
    pattern: "dots", previewCSS: "linear-gradient(135deg,#1a1000,#2d1e00)",
  },
  {
    id: "dark", label_mn: "Хар", label_en: "Dark", emoji: "🖤",
    bgGradient: ["#050505","#0d0d0d","#111111"],
    borderColor: "#333333", headerColor: "#ffffff", captionColor: "#aaaaaa", accentColor: "#ffffff",
    pattern: "none", previewCSS: "linear-gradient(135deg,#050505,#111111)",
  },
  {
    id: "pastel", label_mn: "Пастель", label_en: "Pastel", emoji: "🌸",
    bgGradient: ["#fdf2f8","#fce7f3","#fbcfe8"],
    borderColor: "#f9a8d4", headerColor: "#be185d", captionColor: "#9d174d", accentColor: "#ec4899",
    pattern: "hearts", previewCSS: "linear-gradient(135deg,#fdf2f8,#fce7f3)",
  },
  {
    id: "rainbow", label_mn: "Солонго", label_en: "Rainbow", emoji: "🌈",
    bgGradient: ["#0f0f1a","#1a0f1a","#0f1a1a"],
    borderColor: "rainbow", headerColor: "#ff2d78", captionColor: "#facc15", accentColor: "#06b6d4",
    pattern: "zigzag", previewCSS: "linear-gradient(135deg,#ff2d78,#facc15,#06b6d4,#a855f7)",
  },
  {
    id: "retro", label_mn: "Ретро", label_en: "Retro", emoji: "📼",
    bgGradient: ["#1a0f00","#2d1a00","#3d2200"],
    borderColor: "#d97706", headerColor: "#fbbf24", captionColor: "#fde68a", accentColor: "#d97706",
    pattern: "zigzag", previewCSS: "linear-gradient(135deg,#1a0f00,#3d2200)",
  },
  {
    id: "minimal", label_mn: "Минимал", label_en: "Minimal", emoji: "⬜",
    bgGradient: ["#f8f8f8","#f0f0f0","#e8e8e8"],
    borderColor: "#e5e5e5", headerColor: "#111111", captionColor: "#444444", accentColor: "#111111",
    pattern: "none", previewCSS: "linear-gradient(135deg,#f8f8f8,#e8e8e8)",
  },
  {
    id: "party", label_mn: "Баяр", label_en: "Party", emoji: "🎉",
    bgGradient: ["#0a001a","#1a0030","#0d0020"],
    borderColor: "#a855f7", headerColor: "#c084fc", captionColor: "#e879f9", accentColor: "#a855f7",
    pattern: "stars", previewCSS: "linear-gradient(135deg,#0a001a,#1a0030)",
  },
  // ── New 10 ───────────────────────────────────────────────
  {
    id: "cherry", label_mn: "Интоор", label_en: "Cherry", emoji: "🍒",
    bgGradient: ["#1a0008","#2d0010","#1a000c"],
    borderColor: "#e11d48", headerColor: "#fb7185", captionColor: "#fda4af", accentColor: "#e11d48",
    pattern: "hearts", previewCSS: "linear-gradient(135deg,#1a0008,#3d0018)",
  },
  {
    id: "ocean", label_mn: "Далай", label_en: "Ocean", emoji: "🌊",
    bgGradient: ["#001a2e","#00253d","#001e35"],
    borderColor: "#0ea5e9", headerColor: "#38bdf8", captionColor: "#7dd3fc", accentColor: "#0ea5e9",
    pattern: "dots", previewCSS: "linear-gradient(135deg,#001a2e,#00253d)",
  },
  {
    id: "forest", label_mn: "Ой", label_en: "Forest", emoji: "🌲",
    bgGradient: ["#021a0a","#032d12","#021a0a"],
    borderColor: "#16a34a", headerColor: "#4ade80", captionColor: "#86efac", accentColor: "#16a34a",
    pattern: "stars", previewCSS: "linear-gradient(135deg,#021a0a,#032d12)",
  },
  {
    id: "sunset", label_mn: "Нар жаргалт", label_en: "Sunset", emoji: "🌅",
    bgGradient: ["#1a0a00","#2d1200","#3d1800"],
    borderColor: "#f97316", headerColor: "#fb923c", captionColor: "#fdba74", accentColor: "#f97316",
    pattern: "zigzag", previewCSS: "linear-gradient(135deg,#1a0a00,#f97316,#fbbf24)",
  },
  {
    id: "midnight", label_mn: "Шөнө дунд", label_en: "Midnight", emoji: "🌙",
    bgGradient: ["#020408","#050a14","#02060e"],
    borderColor: "#6366f1", headerColor: "#818cf8", captionColor: "#a5b4fc", accentColor: "#6366f1",
    pattern: "stars", previewCSS: "linear-gradient(135deg,#020408,#0d1230)",
  },
  {
    id: "cotton", label_mn: "Хөвөн", label_en: "Cotton Candy", emoji: "🍭",
    bgGradient: ["#fdf4ff","#fae8ff","#f5d0fe"],
    borderColor: "#d946ef", headerColor: "#a21caf", captionColor: "#86198f", accentColor: "#d946ef",
    pattern: "hearts", previewCSS: "linear-gradient(135deg,#fdf4ff,#fae8ff,#f5d0fe)",
  },
  {
    id: "lavender", label_mn: "Хяруул", label_en: "Lavender", emoji: "💜",
    bgGradient: ["#f5f3ff","#ede9fe","#ddd6fe"],
    borderColor: "#7c3aed", headerColor: "#6d28d9", captionColor: "#4c1d95", accentColor: "#7c3aed",
    pattern: "dots", previewCSS: "linear-gradient(135deg,#f5f3ff,#ede9fe)",
  },
  {
    id: "noir", label_mn: "Ноир", label_en: "Noir", emoji: "🎞️",
    bgGradient: ["#000000","#0a0a0a","#050505"],
    borderColor: "#d4a843", headerColor: "#d4a843", captionColor: "#f5f0e8", accentColor: "#d4a843",
    pattern: "none", previewCSS: "linear-gradient(135deg,#000,#1a1a1a)",
  },
  {
    id: "holographic", label_mn: "Холограф", label_en: "Holographic", emoji: "✨",
    bgGradient: ["#0d001a","#001a1a","#1a000d"],
    borderColor: "rainbow", headerColor: "#e879f9", captionColor: "#67e8f9", accentColor: "#e879f9",
    pattern: "stars", previewCSS: "linear-gradient(135deg,#ff2d78,#06b6d4,#a855f7,#facc15)",
  },
  {
    id: "polaroid", label_mn: "Поляроид", label_en: "Polaroid", emoji: "📷",
    bgGradient: ["#fffef0","#fffde8","#fefce8"],
    borderColor: "#e5e5e5", headerColor: "#1a1a1a", captionColor: "#555555", accentColor: "#1a1a1a",
    pattern: "none", previewCSS: "linear-gradient(135deg,#fffef0,#fefce8)",
  },
];

export function getFrameById(id: FrameId): FrameOption {
  return FRAMES.find((f) => f.id === id) ?? FRAMES[0];
}
