/**
 * generateStrip.ts
 * Combines 4 captured photos into a vertical photostrip PNG using Canvas API.
 * Supports multiple frames: backgrounds, border colors, patterns, branding.
 */

import { FrameOption } from "./frames";

export interface StripOptions {
  photos: string[];
  filterCSS: string;
  frame: FrameOption;
  showStickers: boolean;
  stickers: { emoji: string; x: number; y: number; rotate: number; size: number }[];
  caption: string;
  lang: "mn" | "en";
}

const PHOTO_W  = 600;
const PHOTO_H  = 450;
const MARGIN   = 20;
const BORDER   = 14;
const HEADER_H = 80;
const FOOTER_H = 90;
const STRIP_W  = PHOTO_W + BORDER * 2 + MARGIN * 2;

export async function generateStrip(opts: StripOptions): Promise<string> {
  const { photos, filterCSS, frame, showStickers, stickers, caption } = opts;

  const STRIP_H =
    HEADER_H + (PHOTO_H + MARGIN) * photos.length + MARGIN + FOOTER_H;

  const canvas = document.createElement("canvas");
  canvas.width  = STRIP_W;
  canvas.height = STRIP_H;
  const ctx = canvas.getContext("2d")!;

  // ── Background ─────────────────────────────────────────────────────────────
  const [c0, c1, c2] = frame.bgGradient;
  const bg = ctx.createLinearGradient(0, 0, STRIP_W, STRIP_H);
  bg.addColorStop(0,   c0);
  bg.addColorStop(0.5, c1);
  bg.addColorStop(1,   c2);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, STRIP_W, STRIP_H);

  // ── Background pattern ─────────────────────────────────────────────────────
  drawPattern(ctx, (frame.pattern ?? "none") as string, frame.accentColor, STRIP_W, STRIP_H);

  // ── Header ─────────────────────────────────────────────────────────────────
  ctx.shadowColor = frame.headerColor;
  ctx.shadowBlur  = 14;
  ctx.fillStyle   = frame.headerColor;
  ctx.font        = "bold 26px 'Nunito', sans-serif";
  ctx.textAlign   = "center";
  ctx.fillText("📸 Funny Photobooth MN", STRIP_W / 2, 50);
  ctx.shadowBlur  = 0;

  // ── Photos ─────────────────────────────────────────────────────────────────
  const loadImg = (src: string): Promise<HTMLImageElement> =>
    new Promise((res, rej) => {
      const img = new Image();
      img.onload = () => res(img);
      img.onerror = rej;
      img.src = src;
    });

  for (let i = 0; i < photos.length; i++) {
    const img = await loadImg(photos[i]);
    const x   = MARGIN + BORDER;
    const y   = HEADER_H + (PHOTO_H + MARGIN) * i + MARGIN / 2;

    // Border / frame color — rainbow cycles per photo
    if (frame.borderColor === "rainbow") {
      const rainbowColors = ["#ff2d78", "#facc15", "#06b6d4", "#a855f7"];
      ctx.fillStyle = rainbowColors[i % rainbowColors.length];
    } else {
      ctx.fillStyle = frame.borderColor;
    }
    roundRect(ctx, x - BORDER, y - BORDER / 2, PHOTO_W + BORDER * 2, PHOTO_H + BORDER, 14);
    ctx.fill();

    // Clip & draw photo
    ctx.save();
    roundRect(ctx, x, y, PHOTO_W, PHOTO_H, 8);
    ctx.clip();

    if (filterCSS && filterCSS !== "none") {
      const off = document.createElement("canvas");
      off.width  = img.naturalWidth;
      off.height = img.naturalHeight;
      const octx = off.getContext("2d")!;
      octx.filter = filterCSS;
      octx.drawImage(img, 0, 0);
      ctx.drawImage(off, x, y, PHOTO_W, PHOTO_H);
    } else {
      ctx.drawImage(img, x, y, PHOTO_W, PHOTO_H);
    }
    ctx.restore();

    // Photo number badge
    ctx.fillStyle = "rgba(0,0,0,0.65)";
    ctx.beginPath();
    ctx.arc(x + 28, y + 28, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "white";
    ctx.font      = "bold 16px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(String(i + 1), x + 28, y + 34);

    // Stickers
    if (showStickers && stickers.length > 0) {
      for (const s of stickers.filter((_, si) => si % photos.length === i)) {
        const sx = x + (s.x / 100) * PHOTO_W;
        const sy = y + (s.y / 100) * PHOTO_H;
        ctx.save();
        ctx.translate(sx, sy);
        ctx.rotate((s.rotate * Math.PI) / 180);
        ctx.font      = `${s.size * 1.5}px serif`;
        ctx.textAlign = "center";
        ctx.fillText(s.emoji, 0, 0);
        ctx.restore();
      }
    }
  }

  // ── Footer caption ──────────────────────────────────────────────────────────
  const footerY = HEADER_H + (PHOTO_H + MARGIN) * photos.length + MARGIN * 1.5;

  // Footer bg pill
  ctx.fillStyle = "rgba(255,255,255,0.07)";
  roundRect(ctx, MARGIN, footerY, STRIP_W - MARGIN * 2, FOOTER_H - 10, 16);
  ctx.fill();

  // Caption
  ctx.fillStyle   = frame.captionColor;
  ctx.font        = "bold 22px 'Nunito', sans-serif";
  ctx.textAlign   = "center";
  ctx.shadowColor = frame.captionColor;
  ctx.shadowBlur  = 8;
  const safe = caption.length > 40 ? caption.slice(0, 37) + "…" : caption;
  ctx.fillText(safe, STRIP_W / 2, footerY + 36);
  ctx.shadowBlur  = 0;

  ctx.fillStyle = "rgba(255,255,255,0.35)";
  ctx.font      = "13px sans-serif";
  ctx.fillText("funnyphotobooth.mn • Share this! 🔥", STRIP_W / 2, footerY + 62);

  return canvas.toDataURL("image/png", 1.0);
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawPattern(
  ctx: CanvasRenderingContext2D,
  pattern: string,
  color: string,
  w: number,
  h: number
) {
  ctx.globalAlpha = 0.07;
  ctx.fillStyle   = color;
  ctx.font        = "14px serif";
  ctx.textAlign   = "center";

  if (pattern === "dots") {
    for (let x = 12; x < w; x += 28) {
      for (let y = 12; y < h; y += 28) {
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  } else if (pattern === "stars") {
    for (let x = 20; x < w; x += 40) {
      for (let y = 20; y < h; y += 40) {
        ctx.fillText("✦", x, y);
      }
    }
  } else if (pattern === "hearts") {
    for (let x = 20; x < w; x += 36) {
      for (let y = 20; y < h; y += 36) {
        ctx.fillText("♥", x, y);
      }
    }
  } else if (pattern === "ugulz") {
    // Угалзан хээ — traditional Mongolian scrollwork border pattern
    ctx.globalAlpha = 0.18;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    const step = 30;
    for (let x = 0; x < w; x += step) {
      // Vertical borders: top and bottom bands
      for (const bandY of [0, h - step]) {
        ctx.beginPath();
        ctx.moveTo(x, bandY + step * 0.5);
        ctx.bezierCurveTo(x + step * 0.3, bandY, x + step * 0.7, bandY + step, x + step, bandY + step * 0.5);
        ctx.stroke();
        // Small loop flourish
        ctx.beginPath();
        ctx.arc(x + step * 0.5, bandY + step * 0.5, step * 0.15, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
    for (let y = step; y < h - step; y += step) {
      for (const bandX of [0, w - step]) {
        ctx.beginPath();
        ctx.moveTo(bandX + step * 0.5, y);
        ctx.bezierCurveTo(bandX, y + step * 0.3, bandX + step, y + step * 0.7, bandX + step * 0.5, y + step);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(bandX + step * 0.5, y + step * 0.5, step * 0.15, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
  } else if (pattern === "els") {
    // Говийн элс — sand dune wave lines
    ctx.globalAlpha = 0.12;
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    for (let y = 20; y < h; y += 22) {
      ctx.beginPath();
      for (let x = 0; x <= w; x += 4) {
        const wave = Math.sin((x / w) * Math.PI * 6 + y * 0.1) * 5;
        x === 0 ? ctx.moveTo(x, y + wave) : ctx.lineTo(x, y + wave);
      }
      ctx.stroke();
    }
  } else if (pattern === "naran") {
    // Нарны тойрог — radiating sun rays from center
    ctx.globalAlpha = 0.10;
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    const cx = w / 2, cy = h / 2;
    const rays = 24;
    for (let i = 0; i < rays; i++) {
      const angle = (i / rays) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(angle) * 40, cy + Math.sin(angle) * 40);
      ctx.lineTo(cx + Math.cos(angle) * Math.max(w, h), cy + Math.sin(angle) * Math.max(w, h));
      ctx.stroke();
    }
    // Center circle rings
    for (const r of [20, 35]) {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    }
  } else if (pattern === "zigzag") {
    ctx.strokeStyle = color;
    ctx.lineWidth   = 1.5;
    for (let y = 20; y < h; y += 24) {
      ctx.beginPath();
      for (let x = 0; x < w; x += 20) {
        x % 40 === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y + 10);
      }
      ctx.stroke();
    }
  }

  ctx.globalAlpha = 1;
}
