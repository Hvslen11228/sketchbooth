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
    a.href = stripUrl;
    a.download = `funny-photobooth-mn-${Date.now()}.png`;
    a.click();
  };

  const handleShare = async () => {
    const shareText = lang === "mn"
      ? `Funny Photobooth Mongolia-д зураг авлаа! 📸🔥\n\nТа ч авж үзээрэй 👉 funnyphotobooth.mn`
      : `Just took photos at Funny Photobooth Mongolia! 📸🔥\n\nTry it 👉 funnyphotobooth.mn`;
    if (navigator.share && stripUrl) {
      try {
        const res = await fetch(stripUrl);
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
      {/* Ad */}
      <AdComponent adSlot="0987654321" format="horizontal" className="opacity-70" />

      {/* Frame picker — хамгийн дээр */}
      <div className="rounded-2xl p-4 border-2 border-purple-100 bg-white shadow-sm">
        <FramePicker selected={frame} onChange={handleFrameChange} lang={lang} />
      </div>

      {/* Sticker toggle */}
      <div className="flex items-center justify-center gap-3">
        <Sticker className="w-4 h-4 text-gray-400" />
        <p className="text-gray-500 text-sm font-medium">{t("Стикер", "Stickers")}</p>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleStickerToggle}
          className={`relative w-12 h-6 rounded-full transition-colors ${showStickers ? "bg-purple-500" : "bg-gray-200"}`}
        >
          <motion.div
            animate={{ x: showStickers ? 24 : 2 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
          />
        </motion.button>
      </div>

      {/* Strip preview */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg">
        {generating && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10 rounded-2xl">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              className="w-10 h-10 border-4 border-t-transparent rounded-full"
              style={{ borderColor: `${currentFrame.accentColor}40`, borderTopColor: currentFrame.accentColor }}
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
          className="flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white disabled:opacity-40 shadow-md"
          style={{ background: "linear-gradient(135deg, #ff2d78, #a855f7)", boxShadow: "0 4px 20px rgba(255,45,120,0.35)" }}
        >
          <Download className="w-5 h-5" />
          {t("Татах", "Download")}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.02 }}
          onClick={handleShare} disabled={!stripUrl || generating}
          className="flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white disabled:opacity-40 shadow-md"
          style={{ background: "linear-gradient(135deg, #06b6d4, #3b82f6)", boxShadow: "0 4px 20px rgba(6,182,212,0.35)" }}
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
        className="flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-gray-500 border-2 border-gray-200 hover:border-pink-300 hover:text-pink-500 bg-white transition-all shadow-sm"
      >
        <RefreshCw className="w-4 h-4" />
        {t("Дахин авах 😂", "Retake 😂")}
      </motion.button>
    </motion.div>
  );
}
