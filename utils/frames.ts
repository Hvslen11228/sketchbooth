// Frame definitions for the photostrip generator

export type FrameId =
  | "classic"
  | "neon_pink"
  | "neon_cyan"
  | "gold"
  | "dark"
  | "pastel"
  | "rainbow"
  | "retro"
  | "minimal"
  | "party";

export interface FrameOption {
  id: FrameId;
  label_mn: string;
  label_en: string;
  emoji: string;
  // Strip background gradient stops
  bgGradient: [string, string, string];
  // Photo border color
  borderColor: string;
  // Header text color
  headerColor: string;
  // Caption text color
  captionColor: string;
  // Accent / glow color
  accentColor: string;
  // Optional: decorative pattern type
  pattern?: "dots" | "stars" | "hearts" | "zigzag" | "none";
  // Preview CSS for the UI thumbnail
  previewCSS: string;
}

export const FRAMES: FrameOption[] = [
  {
    id: "classic",
    label_mn: "Сонгодог",
    label_en: "Classic",
    emoji: "🤍",
    bgGradient: ["#1a1a2e", "#16213e", "#0f3460"],
    borderColor: "#ffffff",
    headerColor: "#ff2d78",
    captionColor: "#facc15",
    accentColor: "#ff2d78",
    pattern: "none",
    previewCSS: "linear-gradient(135deg, #1a1a2e, #0f3460)",
  },
  {
    id: "neon_pink",
    label_mn: "Неон ягаан",
    label_en: "Neon Pink",
    emoji: "💗",
    bgGradient: ["#1a0a2e", "#2d0a3e", "#1a0020"],
    borderColor: "#ff2d78",
    headerColor: "#ff2d78",
    captionColor: "#ff8fb1",
    accentColor: "#ff2d78",
    pattern: "dots",
    previewCSS: "linear-gradient(135deg, #1a0a2e, #2d0a3e)",
  },
  {
    id: "neon_cyan",
    label_mn: "Неон цэнхэр",
    label_en: "Neon Cyan",
    emoji: "💎",
    bgGradient: ["#001a2e", "#002d3e", "#001520"],
    borderColor: "#06b6d4",
    headerColor: "#06b6d4",
    captionColor: "#67e8f9",
    accentColor: "#06b6d4",
    pattern: "stars",
    previewCSS: "linear-gradient(135deg, #001a2e, #002d3e)",
  },
  {
    id: "gold",
    label_mn: "Алтан",
    label_en: "Gold",
    emoji: "👑",
    bgGradient: ["#1a1000", "#2d1e00", "#1a0f00"],
    borderColor: "#f59e0b",
    headerColor: "#f59e0b",
    captionColor: "#fde68a",
    accentColor: "#f59e0b",
    pattern: "dots",
    previewCSS: "linear-gradient(135deg, #1a1000, #2d1e00)",
  },
  {
    id: "dark",
    label_mn: "Хар",
    label_en: "Dark",
    emoji: "🖤",
    bgGradient: ["#050505", "#0d0d0d", "#111111"],
    borderColor: "#333333",
    headerColor: "#ffffff",
    captionColor: "#aaaaaa",
    accentColor: "#ffffff",
    pattern: "none",
    previewCSS: "linear-gradient(135deg, #050505, #111111)",
  },
  {
    id: "pastel",
    label_mn: "Пастель",
    label_en: "Pastel",
    emoji: "🌸",
    bgGradient: ["#fdf2f8", "#fce7f3", "#fbcfe8"],
    borderColor: "#f9a8d4",
    headerColor: "#be185d",
    captionColor: "#9d174d",
    accentColor: "#ec4899",
    pattern: "hearts",
    previewCSS: "linear-gradient(135deg, #fdf2f8, #fce7f3)",
  },
  {
    id: "rainbow",
    label_mn: "Солонго",
    label_en: "Rainbow",
    emoji: "🌈",
    bgGradient: ["#0f0f1a", "#1a0f1a", "#0f1a1a"],
    borderColor: "rainbow",
    headerColor: "#ff2d78",
    captionColor: "#facc15",
    accentColor: "#06b6d4",
    pattern: "zigzag",
    previewCSS: "linear-gradient(135deg, #ff2d78, #facc15, #06b6d4, #a855f7)",
  },
  {
    id: "retro",
    label_mn: "Ретро",
    label_en: "Retro",
    emoji: "📼",
    bgGradient: ["#1a0f00", "#2d1a00", "#3d2200"],
    borderColor: "#d97706",
    headerColor: "#fbbf24",
    captionColor: "#fde68a",
    accentColor: "#d97706",
    pattern: "zigzag",
    previewCSS: "linear-gradient(135deg, #1a0f00, #3d2200)",
  },
  {
    id: "minimal",
    label_mn: "Минимал",
    label_en: "Minimal",
    emoji: "⬜",
    bgGradient: ["#f8f8f8", "#f0f0f0", "#e8e8e8"],
    borderColor: "#e5e5e5",
    headerColor: "#111111",
    captionColor: "#444444",
    accentColor: "#111111",
    pattern: "none",
    previewCSS: "linear-gradient(135deg, #f8f8f8, #e8e8e8)",
  },
  {
    id: "party",
    label_mn: "Намрын баяр",
    label_en: "Party",
    emoji: "🎉",
    bgGradient: ["#0a001a", "#1a0030", "#0d0020"],
    borderColor: "#a855f7",
    headerColor: "#c084fc",
    captionColor: "#e879f9",
    accentColor: "#a855f7",
    pattern: "stars",
    previewCSS: "linear-gradient(135deg, #0a001a, #1a0030)",
  },
];

export function getFrameById(id: FrameId): FrameOption {
  return FRAMES.find((f) => f.id === id) ?? FRAMES[0];
}
