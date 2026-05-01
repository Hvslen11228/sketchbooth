export type SceneId =
  | "neon_default"
  | "city_night"
  | "booth_inside"
  | "nature"
  | "sunset"
  | "retro_arcade"
  | "cozy_cafe"
  | "space";

export interface SceneOption {
  id: SceneId;
  label_mn: string;
  label_en: string;
  emoji: string;
  // CSS for the full-page background
  bodyCSS: string;
  // Pseudo-element radial/linear overlays (applied via inline style on the ::before div)
  overlayCSS: string;
}

export const SCENES: SceneOption[] = [
  {
    id: "neon_default",
    label_mn: "Неон",
    label_en: "Neon",
    emoji: "🌌",
    bodyCSS: "linear-gradient(135deg, #0a0a0f 0%, #1a0a2e 30%, #0d1117 60%, #0a1628 100%)",
    overlayCSS: `
      radial-gradient(ellipse at 20% 20%, rgba(255,45,120,0.12) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 80%, rgba(168,85,247,0.12) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 50%, rgba(6,182,212,0.08) 0%, transparent 60%)
    `,
  },
  {
    id: "city_night",
    label_mn: "Хотын шөнэ",
    label_en: "City Night",
    emoji: "🌃",
    bodyCSS: "linear-gradient(180deg, #020814 0%, #0a1628 40%, #0f1f3d 70%, #1a0a2e 100%)",
    overlayCSS: `
      radial-gradient(ellipse at 50% 0%, rgba(255,200,50,0.08) 0%, transparent 40%),
      radial-gradient(ellipse at 20% 60%, rgba(255,100,50,0.06) 0%, transparent 30%),
      radial-gradient(ellipse at 80% 70%, rgba(50,100,255,0.08) 0%, transparent 35%),
      radial-gradient(ellipse at 60% 30%, rgba(255,150,0,0.05) 0%, transparent 20%)
    `,
  },
  {
    id: "booth_inside",
    label_mn: "Booth дотор",
    label_en: "Booth Inside",
    emoji: "🎪",
    bodyCSS: "linear-gradient(180deg, #1a0800 0%, #2d1200 30%, #1a0a00 60%, #0d0500 100%)",
    overlayCSS: `
      radial-gradient(ellipse at 50% 10%, rgba(255,200,100,0.25) 0%, transparent 35%),
      radial-gradient(ellipse at 50% 50%, rgba(255,150,50,0.08) 0%, transparent 60%),
      radial-gradient(ellipse at 20% 80%, rgba(255,80,0,0.06) 0%, transparent 30%),
      radial-gradient(ellipse at 80% 80%, rgba(255,80,0,0.06) 0%, transparent 30%)
    `,
  },
  {
    id: "nature",
    label_mn: "Природ",
    label_en: "Nature",
    emoji: "🌿",
    bodyCSS: "linear-gradient(180deg, #020d06 0%, #051a0c 30%, #0a2d14 60%, #051505 100%)",
    overlayCSS: `
      radial-gradient(ellipse at 30% 20%, rgba(50,200,80,0.10) 0%, transparent 40%),
      radial-gradient(ellipse at 70% 60%, rgba(20,150,50,0.08) 0%, transparent 40%),
      radial-gradient(ellipse at 50% 90%, rgba(100,200,50,0.06) 0%, transparent 35%)
    `,
  },
  {
    id: "sunset",
    label_mn: "Нар жаргалт",
    label_en: "Sunset",
    emoji: "🌅",
    bodyCSS: "linear-gradient(180deg, #0d0005 0%, #2d0a1a 20%, #4d1500 45%, #7d2a00 65%, #2d1000 100%)",
    overlayCSS: `
      radial-gradient(ellipse at 50% 40%, rgba(255,120,0,0.20) 0%, transparent 45%),
      radial-gradient(ellipse at 50% 20%, rgba(255,60,100,0.15) 0%, transparent 35%),
      radial-gradient(ellipse at 20% 70%, rgba(200,0,100,0.08) 0%, transparent 30%),
      radial-gradient(ellipse at 80% 70%, rgba(200,0,50,0.08) 0%, transparent 30%)
    `,
  },
  {
    id: "retro_arcade",
    label_mn: "Ретро аркад",
    label_en: "Retro Arcade",
    emoji: "🕹️",
    bodyCSS: "linear-gradient(135deg, #000a00 0%, #001a00 40%, #000d00 70%, #000500 100%)",
    overlayCSS: `
      radial-gradient(ellipse at 25% 25%, rgba(0,255,0,0.10) 0%, transparent 35%),
      radial-gradient(ellipse at 75% 75%, rgba(0,200,255,0.08) 0%, transparent 35%),
      radial-gradient(ellipse at 50% 50%, rgba(255,0,150,0.06) 0%, transparent 50%)
    `,
  },
  {
    id: "cozy_cafe",
    label_mn: "Кофешоп",
    label_en: "Cozy Café",
    emoji: "☕",
    bodyCSS: "linear-gradient(180deg, #0d0600 0%, #1a0f00 30%, #2d1a05 60%, #1a0d00 100%)",
    overlayCSS: `
      radial-gradient(ellipse at 40% 30%, rgba(200,120,30,0.12) 0%, transparent 40%),
      radial-gradient(ellipse at 70% 60%, rgba(180,80,10,0.08) 0%, transparent 35%),
      radial-gradient(ellipse at 20% 70%, rgba(220,140,40,0.07) 0%, transparent 30%)
    `,
  },
  {
    id: "space",
    label_mn: "Сансар",
    label_en: "Space",
    emoji: "🚀",
    bodyCSS: "linear-gradient(135deg, #000005 0%, #05000f 30%, #000510 60%, #020005 100%)",
    overlayCSS: `
      radial-gradient(ellipse at 30% 20%, rgba(100,0,255,0.12) 0%, transparent 40%),
      radial-gradient(ellipse at 70% 70%, rgba(0,50,200,0.10) 0%, transparent 40%),
      radial-gradient(ellipse at 50% 50%, rgba(200,0,255,0.06) 0%, transparent 55%)
    `,
  },
];

export function getSceneById(id: SceneId): SceneOption {
  return SCENES.find((s) => s.id === id) ?? SCENES[0];
}
