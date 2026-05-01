"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, RefreshCw, Share2, Sticker } from "lucide-react";
import PhotoStrip from "./PhotoStrip";
import AdComponent from "./AdComponent";
import FramePicker from "./FramePicker";
import { generateStrip } from "@/utils/generateStrip";
import { getRandomResult, getRandomStickers, FunnyResult } from "@/utils/randomCaption";
import { FrameId, getFrameById } from "@/utils/frames";

interface ResultScreenProps {
  photos: string[];
  filterCSS: string;
  lang: "mn" | "en";
  onRetake: () => void;
}

export default function ResultScreen({ photos, filterCSS, lang, onRetake }: ResultScreenProps) {
  const [stripUrl, setStripUrl]   = useState<string | null>(null);
  const [result, setResult]       = useState<FunnyResult | null>(null);
  const [frame, setFrame]         = useState<FrameId>("classic");
  const [showStickers, setShowStickers] = useState(true);
  const [stickers] = useState(() => getRandomStickers(6));
  const [generating, setGenerating] = useState(true);
  const [copied, setCopied]       = useState(false);

  const t = useCallback((mn: string, en: string) => lang === "mn" ? mn : en, [lang]);

  const buildStrip = useCallback(async (r: FunnyResult, frameId: FrameId, withStickers: boolean) => {
    setGenerating(true);
    const url = await generateStrip({
      photos, filterCSS,
      frame: getFrameById(frameId),
      showStickers: withStickers,
      stickers,
      caption: r.caption,
      lang,
    });
    setStripUrl(url);
    setGenerating(false);
  }, [photos, filterCSS, stickers, lang]);

  useEffect(() => {
    const r = getRandomResult(lang);
    setResult(r);
    buildStrip(r, "classic", true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFrameChange = (id: FrameId) => {
    setFrame(id);
    if (result) buildStrip(result, id, showStickers);
  };

  const handleStickerToggle = () => {
    const next = !showStickers;
    setShowStickers(next);
    if (result) buildStrip(result, frame, next);
  };

  const handleDownload = () => {
    if (!stripUrl) return;
    const a = document.createElement("a");
    a.href = stripUrl;
    a.download = `sketchbooth-${Date.now()}.png`;
    a.click();
  };

  const handleShare = async () => {
    const text = lang === "mn"
      ? `Sketch Booth-д зураг авлаа! 📸\n👉 sketchbooth.mn`
      : `Took photos at Sketch Booth MN! 📸\n👉 sketchbooth.mn`;
    if (navigator.share && stripUrl) {
      try {
        const blob = await (await fetch(stripUrl)).blob();
        await navigator.share({ title: "Sketch Booth MN", text, files: [new File([blob], "sketchbooth.png", { type: "image/png" })] });
        return;
      } catch { /* fallback */ }
    }
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    handleDownload();
  };

  if (!result) return null;
  const currentFrame = getFrameById(frame);

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-xl mx-auto flex flex-col gap-5">

      <AdComponent adSlot="0987654321" format="horizontal" className="opacity-40" />

      {/* Frame picker */}
      <div className="border border-black/10 bg-[#f0ece4] p-4">
        <FramePicker selected={frame} onChange={handleFrameChange} lang={lang} />
      </div>

      {/* Sticker toggle */}
      <div className="flex items-center gap-3 px-1">
        <span className="font-mono text-[9px] text-[#9a9490] tracking-[0.2em] flex-1">
          {t("СТИКЕР OVERLAY", "STICKER OVERLAY")}
        </span>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleStickerToggle}
          className={`relative w-10 h-5 transition-colors ${showStickers ? "bg-[#0a0a0a]" : "bg-black/15"}`}
        >
          <motion.div
            animate={{ x: showStickers ? 21 : 2 }}
            transition={{ type: "spring", stiffness: 500 }}
            className="absolute top-0.5 w-4 h-4 bg-white shadow-sm"
          />
        </motion.button>
      </div>

      {/* Strip */}
      <div className="relative border border-black/10">
        {generating && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#f9f7f4]/95 z-10 gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-7 h-7 border-2 border-t-transparent border-[#0a0a0a]"
            />
            <span className="font-mono text-[9px] text-[#9a9490] tracking-[0.25em]">
              {t("БОЛОВСРУУЛЖ БАЙНА", "PROCESSING")}
            </span>
          </div>
        )}
        <PhotoStrip photos={photos} stripUrl={stripUrl} lang={lang} />
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3">
        <motion.button
          whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.01 }}
          onClick={handleDownload} disabled={!stripUrl || generating}
          className="flex items-center justify-center gap-2 py-4 font-mono text-[11px] tracking-[0.15em] bg-[#0a0a0a] text-white disabled:opacity-30 hover:bg-[#e8301a] transition-colors"
        >
          <Download className="w-4 h-4" />
          {t("ТАТАХ", "DOWNLOAD")}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.01 }}
          onClick={handleShare} disabled={!stripUrl || generating}
          className="flex items-center justify-center gap-2 py-4 font-mono text-[11px] tracking-[0.15em] border-2 border-[#0a0a0a] text-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-white disabled:opacity-30 transition-colors"
        >
          <Share2 className="w-4 h-4" />
          <AnimatePresence mode="wait">
            {copied
              ? <motion.span key="c" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>✓ {t("ХУУЛАГДЛАА", "COPIED!")}</motion.span>
              : <motion.span key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>SHARE</motion.span>
            }
          </AnimatePresence>
        </motion.button>
      </div>

      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={onRetake}
        className="flex items-center justify-center gap-2 py-3 font-mono text-[10px] tracking-[0.2em] text-[#9a9490] border border-black/10 hover:border-black/30 hover:text-[#0a0a0a] bg-[#f0ece4] transition-all"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        {t("ДАХИН АВАХ", "RETAKE")}
      </motion.button>
    </motion.div>
  );
}
