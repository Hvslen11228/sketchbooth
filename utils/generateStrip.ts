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

const PHOTO_W = 600;
const PHOTO_H = 450;
const GAP     = 10;
const PAD     = 18;
const BORDER  = 14;
const STRIP_W = PHOTO_W + (PAD + BORDER) * 2;

export async function generateStrip(opts: StripOptions): Promise<string> {
  const { photos, filterCSS, frame, showStickers, stickers } = opts;

  const STRIP_H = PAD * 2 + BORDER * 2 + PHOTO_H * photos.length + GAP * (photos.length - 1);

  const canvas = document.createElement("canvas");
  canvas.width  = STRIP_W;
  canvas.height = STRIP_H;
  const ctx = canvas.getContext("2d")!;

  // Background
  const [c0, c1, c2] = frame.bgGradient;
  const bg = ctx.createLinearGradient(0, 0, STRIP_W, STRIP_H);
  bg.addColorStop(0, c0); bg.addColorStop(0.5, c1); bg.addColorStop(1, c2);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, STRIP_W, STRIP_H);

  // Mongolian frame decoration
  drawFrameDecoration(ctx, frame.id, frame.accentColor, frame.borderColor, STRIP_W, STRIP_H);

  // Photos
  const loadImg = (src: string): Promise<HTMLImageElement> =>
    new Promise((res, rej) => {
      const img = new Image();
      img.onload = () => res(img);
      img.onerror = rej;
      img.src = src;
    });

  for (let i = 0; i < photos.length; i++) {
    const img = await loadImg(photos[i]);
    const x = PAD + BORDER;
    const y = PAD + BORDER + (PHOTO_H + GAP) * i;

    // Border
    ctx.fillStyle = frame.borderColor === "rainbow"
      ? ["#ff2d78","#facc15","#06b6d4","#a855f7"][i % 4]
      : frame.borderColor;
    roundRect(ctx, x - BORDER, y - BORDER, PHOTO_W + BORDER * 2, PHOTO_H + BORDER * 2, 10);
    ctx.fill();

    drawCornerOrnaments(ctx, frame.id, frame.accentColor, x - BORDER, y - BORDER, PHOTO_W + BORDER * 2, PHOTO_H + BORDER * 2);

    // Photo
    ctx.save();
    roundRect(ctx, x, y, PHOTO_W, PHOTO_H, 4);
    ctx.clip();
    if (filterCSS && filterCSS !== "none") {
      const off = document.createElement("canvas");
      off.width = img.naturalWidth; off.height = img.naturalHeight;
      const octx = off.getContext("2d")!;
      octx.filter = filterCSS;
      octx.drawImage(img, 0, 0);
      ctx.drawImage(off, x, y, PHOTO_W, PHOTO_H);
    } else {
      ctx.drawImage(img, x, y, PHOTO_W, PHOTO_H);
    }
    ctx.restore();

    // Stickers
    if (showStickers) {
      for (const s of stickers.filter((_, si) => si % photos.length === i)) {
        ctx.save();
        ctx.translate(x + (s.x / 100) * PHOTO_W, y + (s.y / 100) * PHOTO_H);
        ctx.rotate((s.rotate * Math.PI) / 180);
        ctx.font = `${s.size * 1.5}px serif`;
        ctx.textAlign = "center";
        ctx.fillText(s.emoji, 0, 0);
        ctx.restore();
      }
    }
  }

  return canvas.toDataURL("image/png", 1.0);
}

// ── Helper: rounded rect path ─────────────────────────────
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
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

// ── Draw full-strip decorative overlay for Mongolian frames ──
function drawFrameDecoration(
  ctx: CanvasRenderingContext2D,
  frameId: string,
  accent: string,
  borderColor: string,
  W: number,
  H: number
) {
  if (frameId === "mongol_uguljee") {
    // Угалзан хээ: top & bottom ornamental band with repeating scroll/knot pattern
    const BH = 36; // band height
    for (const [bandY, flip] of [[0, false], [H - BH, true]] as [number, boolean][]) {
      ctx.save();
      if (flip) { ctx.translate(0, H); ctx.scale(1, -1); }

      // Gold band background
      const grad = ctx.createLinearGradient(0, bandY, 0, bandY + BH);
      grad.addColorStop(0, "#8b4800");
      grad.addColorStop(0.5, "#c8781a");
      grad.addColorStop(1, "#8b4800");
      ctx.fillStyle = grad;
      ctx.fillRect(0, flip ? H - BH : bandY, W, BH);

      // Repeating ugalz scroll units across the band
      ctx.strokeStyle = "#ffd080";
      ctx.lineWidth = 1.8;
      ctx.globalAlpha = 0.9;
      const unit = 32;
      const by = flip ? H - BH : bandY;
      for (let bx = 0; bx < W; bx += unit) {
        const cx = bx + unit / 2, cy = by + BH / 2;
        // Outer scroll arc
        ctx.beginPath();
        ctx.arc(cx, cy, 9, 0, Math.PI * 1.5);
        ctx.stroke();
        // Inner tight curl
        ctx.beginPath();
        ctx.arc(cx - 4, cy - 4, 4, 0, Math.PI * 2);
        ctx.stroke();
        // Connecting line
        ctx.beginPath();
        ctx.moveTo(bx, cy);
        ctx.lineTo(bx + unit, cy);
        ctx.stroke();
        // Diamond accent
        ctx.beginPath();
        ctx.moveTo(cx, by + 4);
        ctx.lineTo(cx + 5, cy);
        ctx.lineTo(cx, by + BH - 4);
        ctx.lineTo(cx - 5, cy);
        ctx.closePath();
        ctx.fillStyle = "#ffd080";
        ctx.globalAlpha = 0.4;
        ctx.fill();
        ctx.globalAlpha = 0.9;
      }

      // Top/bottom thin lines
      ctx.strokeStyle = "#ffd080";
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.6;
      const lineY = flip ? H - BH : bandY;
      ctx.beginPath(); ctx.moveTo(0, lineY + 2); ctx.lineTo(W, lineY + 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, lineY + BH - 2); ctx.lineTo(W, lineY + BH - 2); ctx.stroke();

      ctx.restore();
    }

    // Left & right thin vertical gold strips
    for (const bx of [0, W - 12]) {
      const gv = ctx.createLinearGradient(bx, 0, bx + 12, 0);
      gv.addColorStop(0, "#8b4800"); gv.addColorStop(0.5, "#c8781a"); gv.addColorStop(1, "#8b4800");
      ctx.fillStyle = gv;
      ctx.globalAlpha = 0.7;
      ctx.fillRect(bx, BH, 12, H - BH * 2);
    }
    ctx.globalAlpha = 1;

  } else if (frameId === "mongol_flag") {
    // Монгол туг: left red stripe + right red stripe like the flag
    const SW = 48; // stripe width
    for (const bx of [0, W - SW]) {
      ctx.fillStyle = "#c8102e";
      ctx.globalAlpha = 0.92;
      ctx.fillRect(bx, 0, SW, H);
    }
    // Сoyombo-style sun & moon on left stripe center
    drawSoyombo(ctx, SW / 2, H / 2, 18, "#f5c518");
    ctx.globalAlpha = 1;

  } else if (frameId === "mongol_naran") {
    // Нарны тойрог: radial sun rays from all 4 corners + center
    ctx.globalAlpha = 0.15;
    ctx.strokeStyle = accent;
    ctx.lineWidth = 2;
    for (const [ox, oy] of [[0,0],[W,0],[0,H],[W,H],[W/2,H/2]] as [number,number][]) {
      const rays = ox === W/2 ? 36 : 16;
      for (let r = 0; r < rays; r++) {
        const angle = (r / rays) * Math.PI * 2;
        const dist = Math.max(W, H) * 1.2;
        ctx.beginPath();
        ctx.moveTo(ox, oy);
        ctx.lineTo(ox + Math.cos(angle) * dist, oy + Math.sin(angle) * dist);
        ctx.stroke();
      }
    }
    // Concentric circles at center
    ctx.globalAlpha = 0.2;
    for (const cr of [30, 60, 100, 150]) {
      ctx.beginPath();
      ctx.arc(W / 2, H / 2, cr, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

  } else if (frameId === "mongol_els") {
    // Говийн элс: wave dune lines across full strip
    ctx.globalAlpha = 0.18;
    ctx.strokeStyle = "#8b6914";
    for (let y = 30; y < H; y += 18) {
      ctx.lineWidth = y % 54 === 30 ? 2 : 1;
      ctx.beginPath();
      for (let x = 0; x <= W; x += 3) {
        const wave = Math.sin((x / W) * Math.PI * 5 + y * 0.08) * 7
                   + Math.sin((x / W) * Math.PI * 11 + y * 0.05) * 3;
        x === 0 ? ctx.moveTo(x, y + wave) : ctx.lineTo(x, y + wave);
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

  } else if (frameId === "mongol_nomad") {
    // Нүүдэлчин: Mongolian traditional diamond/cross lattice border
    const BW = 28;
    ctx.globalAlpha = 0.85;
    // Top & bottom bands
    for (const [by, flip] of [[0,false],[H - BW, true]] as [number,boolean][]) {
      ctx.fillStyle = "#2d6e2d";
      ctx.fillRect(0, by, W, BW);
      // Diamond lattice
      ctx.strokeStyle = "#e8e8e8";
      ctx.lineWidth = 1.2;
      const unit = BW;
      for (let bx = 0; bx < W + unit; bx += unit) {
        ctx.beginPath();
        ctx.moveTo(bx, by); ctx.lineTo(bx - unit/2, by + BW/2);
        ctx.lineTo(bx, by + BW); ctx.lineTo(bx + unit/2, by + BW/2);
        ctx.closePath(); ctx.stroke();
      }
    }
    // Side bands
    for (const bx of [0, W - BW]) {
      ctx.fillStyle = "#2d6e2d";
      ctx.fillRect(bx, BW, BW, H - BW * 2);
      ctx.strokeStyle = "#e8e8e8";
      ctx.lineWidth = 1.2;
      for (let by = BW; by < H - BW; by += BW) {
        ctx.beginPath();
        ctx.moveTo(bx + BW/2, by);
        ctx.lineTo(bx, by + BW/2);
        ctx.lineTo(bx + BW/2, by + BW);
        ctx.lineTo(bx + BW, by + BW/2);
        ctx.closePath(); ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
  }
}

// ── Corner ornaments drawn ON the photo border ─────────────
function drawCornerOrnaments(
  ctx: CanvasRenderingContext2D,
  frameId: string,
  accent: string,
  x: number, y: number, w: number, h: number
) {
  if (!frameId.startsWith("mongol_")) return;
  const size = 22;
  ctx.strokeStyle = accent;
  ctx.lineWidth = 2;
  ctx.globalAlpha = 0.85;
  // Four corners
  for (const [cx, cy, sx, sy] of [
    [x + size, y + size, -1, -1],
    [x + w - size, y + size, 1, -1],
    [x + size, y + h - size, -1, 1],
    [x + w - size, y + h - size, 1, 1],
  ] as [number,number,number,number][]) {
    if (frameId === "mongol_uguljee") {
      // Scroll corner
      ctx.beginPath();
      ctx.arc(cx, cy, 10, 0, Math.PI * 1.5);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx + sx * 3, cy + sy * 3, 4, 0, Math.PI * 2);
      ctx.stroke();
    } else if (frameId === "mongol_flag" || frameId === "mongol_naran") {
      // Star/sun corner
      drawStar(ctx, cx, cy, 5, 10, 5, accent);
    } else if (frameId === "mongol_nomad") {
      // Diamond corner
      ctx.beginPath();
      ctx.moveTo(cx, cy - 10); ctx.lineTo(cx + 10, cy);
      ctx.lineTo(cx, cy + 10); ctx.lineTo(cx - 10, cy);
      ctx.closePath(); ctx.stroke();
    } else if (frameId === "mongol_els") {
      // Curved arc corner
      ctx.beginPath();
      ctx.arc(cx, cy, 10, 0, Math.PI / 2);
      ctx.stroke();
    }
  }
  ctx.globalAlpha = 1;
}

// ── Draw a soyombo-style sun & moon symbol ─────────────────
function drawSoyombo(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, color: string) {
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.globalAlpha = 0.9;
  // Sun circle
  ctx.beginPath(); ctx.arc(cx, cy, r * 0.4, 0, Math.PI * 2); ctx.fill();
  // Rays
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * r * 0.55, cy + Math.sin(a) * r * 0.55);
    ctx.lineTo(cx + Math.cos(a) * r * 0.9, cy + Math.sin(a) * r * 0.9);
    ctx.stroke();
  }
  // Moon crescent above
  ctx.beginPath();
  ctx.arc(cx, cy - r * 1.2, r * 0.35, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#003478";
  ctx.beginPath();
  ctx.arc(cx + r * 0.15, cy - r * 1.2, r * 0.28, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
}

// ── Draw a star shape ─────────────────────────────────────
function drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, points: number, outer: number, inner: number, color: string) {
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.8;
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const angle = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
    const r = i % 2 === 0 ? outer : inner;
    i === 0 ? ctx.moveTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r)
            : ctx.lineTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r);
  }
  ctx.closePath(); ctx.fill();
  ctx.globalAlpha = 1;
}
