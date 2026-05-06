"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, RefreshCw, Share2 } from "lucide-react";
import PhotoStrip from "./PhotoStrip";
import FramePicker from "./FramePicker";
import { generateStrip } from "@/utils/generateStrip";
import { getRandomResult, getRandomStickers, FunnyResult } from "@/utils/randomCaption";
import { FrameId, getFrameById } from "@/utils/frames";

interface Props { photos: string[]; filterCSS: string; lang: "mn"|"en"; onRetake: () => void; }

export default function ResultScreen({ photos, filterCSS, lang, onRetake }: Props) {
  const [stripUrl, setStripUrl] = useState<string|null>(null);
  const [result, setResult]     = useState<FunnyResult|null>(null);
  const [frame, setFrame]       = useState<FrameId>("classic");
  const [showStickers, setShowStickers] = useState(true);
  const [stickers] = useState(() => getRandomStickers(6));
  const [generating, setGenerating] = useState(true);
  const [copied, setCopied] = useState(false);

  const build = useCallback(async (r: FunnyResult, fid: FrameId, stk: boolean) => {
    setGenerating(true);
    const url = await generateStrip({ photos, filterCSS, frame: getFrameById(fid), showStickers: stk, stickers, caption: r.caption, lang });
    setStripUrl(url); setGenerating(false);
  }, [photos, filterCSS, stickers, lang]);

  useEffect(() => {
    const r = getRandomResult(lang); setResult(r); build(r, "classic", true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFrameChange = (id: FrameId) => { setFrame(id); if (result) build(result, id, showStickers); };
  const onStickerToggle = () => { const n = !showStickers; setShowStickers(n); if (result) build(result, frame, n); };

  const download = async () => {
    if (!stripUrl) return;
    try {
      // Convert data URL to blob for better mobile support
      const res = await fetch(stripUrl);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `sketchbooth-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    } catch {
      // Fallback: open in new tab (works on iOS Safari)
      window.open(stripUrl, "_blank");
    }
  };
  const share = async () => {
    const text = "Sketch Booth-д зураг авлаа! 📸 👉 sketchbooth.mn";
    if (navigator.share && stripUrl) {
      try { const blob = await (await fetch(stripUrl)).blob(); await navigator.share({ title: "Sketch Booth", text, files: [new File([blob], "strip.png", { type: "image/png" })] }); return; } catch { /**/ }
    }
    await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2500); download();
  };

  if (!result) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Frame */}
      <div style={{ padding: 16, border: "1px solid #e5e5e3", borderRadius: 14, background: "white" }}>
        <FramePicker selected={frame} onChange={onFrameChange} lang={lang} />
      </div>

      {/* Sticker toggle */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 12, color: "#999", letterSpacing: "0.04em" }}>Стикер нэмэх</span>
        <button onClick={onStickerToggle} style={{
          width: 40, height: 22, borderRadius: 100, border: "none", cursor: "pointer",
          background: showStickers ? "#1a1a1a" : "#e5e5e3", position: "relative", transition: "background 0.2s",
        }}>
          <motion.div animate={{ x: showStickers ? 20 : 2 }} transition={{ type: "spring", stiffness: 500 }}
            style={{ position: "absolute", top: 3, width: 16, height: 16, borderRadius: "50%", background: "white", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }}
          />
        </button>
      </div>

      {/* Strip */}
      <div style={{ position: "relative", borderRadius: 14, overflow: "hidden", border: "1px solid #e5e5e3" }}>
        {generating && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(250,250,249,0.9)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
              style={{ width: 24, height: 24, border: "2px solid #1a1a1a", borderTopColor: "transparent", borderRadius: "50%" }}
            />
          </div>
        )}
        <PhotoStrip photos={photos} stripUrl={stripUrl} lang={lang} />
      </div>

      {/* Actions */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <motion.button whileTap={{ scale: 0.97 }} onClick={download} disabled={!stripUrl || generating} style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          padding: "13px 0", borderRadius: 12, border: "none", cursor: "pointer",
          background: "#1a1a1a", color: "white", fontSize: 12, letterSpacing: "0.06em",
          opacity: (!stripUrl || generating) ? 0.4 : 1,
        }}>
          <Download size={14} /> Татах
        </motion.button>
        <motion.button whileTap={{ scale: 0.97 }} onClick={share} disabled={!stripUrl || generating} style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          padding: "13px 0", borderRadius: 12, cursor: "pointer",
          border: "1.5px solid #1a1a1a", background: "white", color: "#1a1a1a",
          fontSize: 12, letterSpacing: "0.06em",
          opacity: (!stripUrl || generating) ? 0.4 : 1,
        }}>
          <Share2 size={14} />
          <AnimatePresence mode="wait">
            {copied ? <motion.span key="c" initial={{opacity:0}} animate={{opacity:1}}>✓ Хуулагдлаа</motion.span>
                    : <motion.span key="s" initial={{opacity:0}} animate={{opacity:1}}>Share</motion.span>}
          </AnimatePresence>
        </motion.button>
      </div>

      <motion.button whileTap={{ scale: 0.98 }} onClick={onRetake} style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        padding: "12px 0", borderRadius: 12, border: "1.5px solid #e5e5e3",
        background: "white", color: "#999", fontSize: 12, letterSpacing: "0.06em", cursor: "pointer",
      }}>
        <RefreshCw size={13} /> Дахин авах
      </motion.button>
    </div>
  );
}
