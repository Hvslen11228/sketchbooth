/**
 * generateStrip.ts
 * Combines 4 captured photos into a vertical photostrip PNG using Canvas API.
 * Adds white borders, rounded corners, branding, and optional stickers.
 */

export interface StripOptions {
  photos: string[];        // base64 data URLs (4 images)
  filterCSS: string;       // CSS filter string
  showStickers: boolean;
  stickers: { emoji: string; x: number; y: number; rotate: number; size: number }[];
  caption: string;
  lang: "mn" | "en";
}

export async function generateStrip(opts: StripOptions): Promise<string> {
  const { photos, filterCSS, showStickers, stickers, caption } = opts;

  // Strip layout constants
  const PHOTO_W = 600;
  const PHOTO_H = 450;
  const MARGIN = 20;
  const BORDER = 16;
  const HEADER_H = 80;
  const FOOTER_H = 90;
  const STRIP_W = PHOTO_W + BORDER * 2 + MARGIN * 2;
  const STRIP_H = HEADER_H + (PHOTO_H + MARGIN) * photos.length + MARGIN + FOOTER_H;

  const canvas = document.createElement("canvas");
  canvas.width = STRIP_W;
  canvas.height = STRIP_H;
  const ctx = canvas.getContext("2d")!;

  // ── Background ──────────────────────────────────────────────────────────────
  const bg = ctx.createLinearGradient(0, 0, STRIP_W, STRIP_H);
  bg.addColorStop(0, "#1a0a2e");
  bg.addColorStop(0.5, "#0d1117");
  bg.addColorStop(1, "#0a1628");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, STRIP_W, STRIP_H);

  // ── Header branding ──────────────────────────────────────────────────────────
  ctx.fillStyle = "#ff2d78";
  ctx.font = "bold 28px 'Nunito', sans-serif";
  ctx.textAlign = "center";
  ctx.shadowColor = "#ff2d78";
  ctx.shadowBlur = 12;
  ctx.fillText("📸 Funny Photobooth MN", STRIP_W / 2, 48);
  ctx.shadowBlur = 0;

  // ── Load and draw each photo ─────────────────────────────────────────────────
  const loadImage = (src: string): Promise<HTMLImageElement> =>
    new Promise((res, rej) => {
      const img = new Image();
      img.onload = () => res(img);
      img.onerror = rej;
      img.src = src;
    });

  for (let i = 0; i < photos.length; i++) {
    const img = await loadImage(photos[i]);
    const x = MARGIN + BORDER;
    const y = HEADER_H + (PHOTO_H + MARGIN) * i + MARGIN / 2;

    // White border / frame
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    roundRect(ctx, x - BORDER, y - BORDER / 2, PHOTO_W + BORDER * 2, PHOTO_H + BORDER, 12);
    ctx.fill();

    // Clip to rounded rect for photo
    ctx.save();
    roundRect(ctx, x, y, PHOTO_W, PHOTO_H, 8);
    ctx.clip();

    // Apply filter via offscreen canvas
    if (filterCSS && filterCSS !== "none") {
      const offscreen = document.createElement("canvas");
      offscreen.width = img.naturalWidth;
      offscreen.height = img.naturalHeight;
      const octx = offscreen.getContext("2d")!;
      octx.filter = filterCSS;
      octx.drawImage(img, 0, 0);
      ctx.drawImage(offscreen, x, y, PHOTO_W, PHOTO_H);
    } else {
      ctx.drawImage(img, x, y, PHOTO_W, PHOTO_H);
    }

    // Photo number badge
    ctx.restore();
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.beginPath();
    ctx.arc(x + 28, y + 28, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "white";
    ctx.font = "bold 18px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`${i + 1}`, x + 28, y + 34);

    // Stickers overlay on each photo
    if (showStickers && stickers.length > 0) {
      const photoStickers = stickers.filter((_, si) => si % photos.length === i);
      for (const s of photoStickers) {
        const sx = x + (s.x / 100) * PHOTO_W;
        const sy = y + (s.y / 100) * PHOTO_H;
        ctx.save();
        ctx.translate(sx, sy);
        ctx.rotate((s.rotate * Math.PI) / 180);
        ctx.font = `${s.size * 1.5}px serif`;
        ctx.textAlign = "center";
        ctx.fillText(s.emoji, 0, 0);
        ctx.restore();
      }
    }
  }

  // ── Footer caption ───────────────────────────────────────────────────────────
  const footerY = HEADER_H + (PHOTO_H + MARGIN) * photos.length + MARGIN * 1.5;

  ctx.fillStyle = "rgba(255,255,255,0.08)";
  roundRect(ctx, MARGIN, footerY, STRIP_W - MARGIN * 2, FOOTER_H - 10, 16);
  ctx.fill();

  ctx.fillStyle = "#facc15";
  ctx.font = "bold 22px 'Nunito', sans-serif";
  ctx.textAlign = "center";
  ctx.shadowColor = "#facc15";
  ctx.shadowBlur = 8;
  // Truncate long captions
  const displayCaption = caption.length > 40 ? caption.slice(0, 37) + "…" : caption;
  ctx.fillText(displayCaption, STRIP_W / 2, footerY + 36);
  ctx.shadowBlur = 0;

  ctx.fillStyle = "rgba(255,255,255,0.4)";
  ctx.font = "14px sans-serif";
  ctx.fillText("funnyphotobooth.mn • Share this! 🔥", STRIP_W / 2, footerY + 64);

  return canvas.toDataURL("image/png", 1.0);
}

/** Helper: draw rounded rectangle path */
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
