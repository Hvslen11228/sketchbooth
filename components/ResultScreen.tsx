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
    a.href     = stripUrl;
    a.download = `funny-photobooth-mn-${Date.now()}.png`;
    a.click();
  };

  const handleShare = async () => {
    const shareText = lang === "mn"
      ? `Funny Photobooth Mongolia-д зураг авлаа! 📸🔥 ${result?.caption ?? ""}\n\nТа ч авж үзээрэй 👉 funnyphotobooth.mn`
      : `Just took photos at Funny Photobooth Mongolia! 📸🔥 ${result?.caption ?? ""}\n\nTry it 👉 funnyphotobooth.mn`;

    if (navigator.share && stripUrl) {
      try {
        const res  = await fetch(stripUrl);
        const blob = await res.blob();
        const file = new File([blob], "photobooth.png", { type: "image/png" });
        await navigator.share({ title: "Funny Photobooth MN", text: shareText, files: [file] });
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
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl mx-auto flex flex-col gap-5"
    >
      {/* Ad — result screen only */}
      <AdComponent adSlot="0987654321" format="horizontal" className="opacity-60" />

      {/* Mood card — icon + label */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring" }}
        className="flex items-center gap-4 rounded-2xl px-5 py-4 border border-white/10"
        style={{ background: "rgba(255,255,255,0.04)" }}
      >
        <motion.span
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="text-4xl flex-shrink-0"
        >
          {result.mood.emoji}
        </motion.span>
        <div>
          <p className="text-white/40 text-[10px] uppercase tracking-widest mb-0.5">
            {t("Өнөөдрийн байдал", "Today's Mood")}
          </p>
          <p className="text-white font-black text-base">
            {lang === "mn" ? result.mood.label_mn : result.mood.label_en}
          </p>
        </div>
      </motion.div>

      {/* Caption */}
      <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-2xl px-4 py-3">
        <p className="text-yellow-300 font-black text-center text-lg">{result.caption}</p>
      </div>

      {/* Frame picker */}
      <div className="rounded-2xl p-4 border border-white/10 bg-white/3">
        <FramePicker selected={frame} onChange={handleFrameChange} lang={lang} />
      </div>

      {/* Sticker toggle */}
      <div className="flex items-center justify-center gap-3">
        <Sticker className="w-4 h-4 text-white/40" />
        <p className="text-white/50 text-sm">{t("Стикер", "Stickers")}</p>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleStickerToggle}
          className={`relative w-12 h-6 rounded-full transition-colors ${showStickers ? "bg-purple-500" : "bg-white/20"}`}
        >
          <motion.div
            animate={{ x: showStickers ? 24 : 2 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
          />
        </motion.button>
      </div>

      {/* Strip preview */}
      <div className="relative rounded-2xl overflow-hidden">
        {generating && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 z-10 gap-3 rounded-2xl">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              className="w-10 h-10 border-4 border-t-transparent rounded-full"
              style={{ borderColor: `${currentFrame.accentColor}60`, borderTopColor: currentFrame.accentColor }}
            />
          </div>
        )}
        <PhotoStrip photos={photos} stripUrl={stripUrl} lang={lang} />
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-3">
        <motion.button
          whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.02 }}
          onClick={handleDownload} disabled={!stripUrl || generating}
          className="flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white disabled:opacity-40"
          style={{ background: "linear-gradient(135deg, #ff2d78, #a855f7)", boxShadow: "0 0 20px #ff2d7850" }}
        >
          <Download className="w-5 h-5" />
          {t("Татах", "Download")}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.02 }}
          onClick={handleShare} disabled={!stripUrl || generating}
          className="flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white disabled:opacity-40"
          style={{ background: "linear-gradient(135deg, #06b6d4, #3b82f6)", boxShadow: "0 0 20px #06b6d450" }}
        >
          <Share2 className="w-5 h-5" />
          <AnimatePresence mode="wait">
            {copied
              ? <motion.span key="c" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>✓ {t("Хуулагдлаа", "Copied!")}</motion.span>
              : <motion.span key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{t("Хуваалцах", "Share")}</motion.span>
            }
          </AnimatePresence>
        </motion.button>
      </div>

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={onRetake}
        className="flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white/60 border border-white/10 hover:border-white/30 hover:text-white transition-all"
      >
        <RefreshCw className="w-4 h-4" />
        {t("Дахин авах 😂", "Retake until perfect 😂")}
      </motion.button>
    </motion.div>
  );
}
