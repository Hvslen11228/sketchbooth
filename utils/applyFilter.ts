export type FilterName = "none" | "vintage" | "bw" | "warm" | "contrast" | "oversaturated";

export interface FilterOption {
  id: FilterName;
  label_mn: string;
  label_en: string;
  css: string;       // CSS filter string for canvas & video preview
  emoji: string;
}

export const FILTERS: FilterOption[] = [
  {
    id: "none",
    label_mn: "Байгалийн",
    label_en: "Normal",
    css: "none",
    emoji: "📷",
  },
  {
    id: "vintage",
    label_mn: "Антик",
    label_en: "Vintage",
    css: "sepia(0.6) contrast(1.1) brightness(0.9) saturate(0.8)",
    emoji: "🟤",
  },
  {
    id: "bw",
    label_mn: "Хар цагаан",
    label_en: "B&W",
    css: "grayscale(1) contrast(1.2)",
    emoji: "⬛",
  },
  {
    id: "warm",
    label_mn: "Дулаан",
    label_en: "Warm",
    css: "sepia(0.2) saturate(1.4) brightness(1.05) hue-rotate(-10deg)",
    emoji: "🟠",
  },
  {
    id: "contrast",
    label_mn: "Хурц",
    label_en: "High Contrast",
    css: "contrast(1.8) brightness(0.95) saturate(1.2)",
    emoji: "⚡",
  },
  {
    id: "oversaturated",
    label_mn: "Хэт тод",
    label_en: "Vivid",
    css: "saturate(2.5) contrast(1.1) brightness(1.05) hue-rotate(5deg)",
    emoji: "🌈",
  },
];

export function getFilterById(id: FilterName): FilterOption {
  return FILTERS.find((f) => f.id === id) ?? FILTERS[0];
}
