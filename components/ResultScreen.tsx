"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, RefreshCw, Share2 } from "lucide-react";
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
  const [stripUrl, setStripUrl] = useState<string | null>(null);
  const [result, setResult]     = useState<FunnyResult | null>(null);
  const [frame, setFrame]       = useState<FrameId>("classic");
  const [showStickers, setShowStickers] = useState(true);
  const [stickers]   = useState(() => getRandomStickers(6));
  const [generating, setGenerating] = useState(true);
  const [copied, setCopied]     = useState(false);

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
    a.download = `fotoboodal-${Date.now()}.png`;
    a.click();
  };

  const handleShare = async () => {
    const shareText = lang === "mn"
      ? `Фото Буудал-д зураг авлаа! 📸\n\nТа ч авж үзээрэй 👉 funnyphotobooth.mn`
      : `Took photos at Foto Boodal MN! 📸\n\nTry it 👉 funnyphotobooth.mn`;
    if (navigator.share && stripUrl) {
      try {
        const res = await fetch(stripUrl);
        const blob = await res.blob();
        const file = new File([blob], "fotoboodal.png", { type: "image/png" });
        await navigator.share({ title: "Фото Буудал MN", text: shareText, files: [file] });
        return;
      } catch { /* fallback */ }
    }
    await navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    handleDownload();
  };

  if (!result) return null;

  const currentFrame = getFrameById(frame);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl mx-auto flex flex-col gap-4"
    >
      <AdComponent adSlot="0987654321" format="horizontal" className="opacity-50" />

      {/* Header label */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-[#2a2a2a]" />
        <span className="font-mono text-[10px] text-[#8a8070] tracking-widest">ТАНЫ ЗУРГИЙН ХЭСЭГ</span>
        <div className="h-px flex-1 bg-[#2a2a2a]" />
      </div>

      {/* Frame picker */}
      <div className="border border-[#2a2a2a] bg-[#111] p-4">
        <FramePicker selected={frame} onChange={handleFrameChange} lang={lang} />
      </div>

      {/* Sticker toggle */}
      <div className="flex items-center gap-3 px-1">
        <span className="font-mono text-[10px] text-[#8a8070] tracking-widest flex-1">
          {t("СТИКЕР OVERLAY", "STICKER OVERLAY")}
        </span>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleStickerToggle}
          className={`relative w-10 h-5 rounded-sm transition-colors ${showStickers ? "bg-[#d4a843]" : "bg-[#2a2a2a]"}`}
        >
          <motion.div
            animate={{ x: showStickers ? 20 : 2 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="absolute top-0.5 w-4 h-4 bg-[#0d0d0d] rounded-sm shadow"
          />
        </motion.button>
      </div>

      {/* Strip preview */}
      <div className="relative border border-[#2a2a2a]">
        {generating && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0d0d0d]/90 z-10 gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-8 h-8 border-2 border-t-transparent rounded-sm"
              style={{ borderColor: `${currentFrame.accentColor}40`, borderTopColor: currentFrame.accentColor }}
            />
            <span className="font-mono text-[10px] text-[#8a8070] tracking-widest">
              {t("БОЛОВСРУУЛЖ БАЙНА...", "PROCESSING...")}
            </span>
          </div>
        )}
        <PhotoStrip photos={photos} stripUrl={stripUrl} lang={lang} />
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-3">
        <motion.button
          whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.01 }}
          onClick={handleDownload} disabled={!stripUrl || generating}
          className="flex items-center justify-center gap-2 py-4 font-display text-xl tracking-wider text-[#0d0d0d] disabled:opacity-30 transition-colors"
          style={{ background: generating ? "#555" : "#d4a843" }}
        >
          <Download className="w-4 h-4" />
          {t("ТАТАХ", "DOWNLOAD")}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.01 }}
          onClick={handleShare} disabled={!stripUrl || generating}
          className="flex items-center justify-center gap-2 py-4 font-display text-xl tracking-wider border border-[#d4a843] text-[#d4a843] hover:bg-[#d4a843]/10 disabled:opacity-30 transition-colors"
        >
          <Share2 className="w-4 h-4" />
          <AnimatePresence mode="wait">
            {copied
              ? <motion.span key="c" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>✓ {t("ХУУЛАГДЛАА", "COPIED!")}</motion.span>
              : <motion.span key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{t("SHARE", "SHARE")}</motion.span>
            }
          </AnimatePresence>
        </motion.button>
      </div>

      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={onRetake}
        className="flex items-center justify-center gap-2 py-3 font-mono text-xs text-[#8a8070] border border-[#2a2a2a] hover:border-[#8a8070] hover:text-[#f5f0e8] transition-all tracking-widest"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        {t("ДАХИН АВАХ", "RETAKE")}
      </motion.button>
    </motion.div>
  );
}
