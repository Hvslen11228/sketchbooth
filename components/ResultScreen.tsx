"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, RefreshCw, Share2, Sticker } from "lucide-react";
import PhotoStrip from "./PhotoStrip";
import AdComponent from "./AdComponent";
import { generateStrip } from "@/utils/generateStrip";
import { getRandomResult, getRandomStickers, FunnyResult } from "@/utils/randomCaption";

interface ResultScreenProps {
  photos: string[];
  filterCSS: string;
  lang: "mn" | "en";
  onRetake: () => void;
}

export default function ResultScreen({ photos, filterCSS, lang, onRetake }: ResultScreenProps) {
  const [stripUrl, setStripUrl] = useState<string | null>(null);
  const [result, setResult] = useState<FunnyResult | null>(null);
  const [showStickers, setShowStickers] = useState(true);
  const [stickers] = useState(() => getRandomStickers(6));
  const [generating, setGenerating] = useState(true);
  const [copied, setCopied] = useState(false);

  const t = useCallback((mn: string, en: string) => lang === "mn" ? mn : en, [lang]);

  // Generate strip on mount
  useEffect(() => {
    const r = getRandomResult(lang);
    setResult(r);

    (async () => {
      setGenerating(true);
      const url = await generateStrip({
        photos,
        filterCSS,
        showStickers,
        stickers,
        caption: r.caption,
        lang,
      });
      setStripUrl(url);
      setGenerating(false);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Regenerate strip when sticker toggle changes
  useEffect(() => {
    if (!result || photos.length === 0) return;
    (async () => {
      setGenerating(true);
      const url = await generateStrip({ photos, filterCSS, showStickers, stickers, caption: result.caption, lang });
      setStripUrl(url);
      setGenerating(false);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showStickers]);

  const handleDownload = () => {
    if (!stripUrl) return;
    const a = document.createElement("a");
    a.href = stripUrl;
    a.download = `funny-photobooth-mn-${Date.now()}.png`;
    a.click();
  };

  const handleShare = async () => {
    const shareText = lang === "mn"
      ? `Funny Photobooth Mongolia-д зураг авлаа! 📸🔥 ${result?.caption ?? ""}\n\nТа ч авж үзээрэй 👉 funnyphotobooth.mn`
      : `Just took photos at Funny Photobooth Mongolia! 📸🔥 ${result?.caption ?? ""}\n\nTry it 👉 funnyphotobooth.mn`;

    if (navigator.share && stripUrl) {
      try {
        const res = await fetch(stripUrl);
        const blob = await res.blob();
        const file = new File([blob], "photobooth.png", { type: "image/png" });
        await navigator.share({ title: "Funny Photobooth MN", text: shareText, files: [file] });
        return;
      } catch { /* fallback */ }
    }
    // Fallback: copy text
    await navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    handleDownload();
  };

  if (!result) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl mx-auto flex flex-col gap-6"
    >
      {/* ── Ad — result screen (NON-intrusive, above content) ── */}
      <AdComponent adSlot="0987654321" format="horizontal" className="opacity-70" />

      {/* ── Funny result card ─────────────────────────────────── */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring" }}
        className="rounded-3xl p-5 border border-pink-500/30"
        style={{ background: "linear-gradient(135deg, #1a0a2e88, #0d111788)" }}
      >
        {/* Mood */}
        <div className="flex items-center gap-3 mb-4">
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-4xl"
          >
            {result.mood.emoji}
          </motion.span>
          <div>
            <p className="text-white/50 text-xs uppercase tracking-widest">
              {t("Өнөөдрийн байдал", "Today's Mood")}
            </p>
            <p className="text-white font-black text-lg">
              {lang === "mn" ? result.mood.label_mn : result.mood.label_en}
            </p>
          </div>
        </div>

        {/* Caption */}
        <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-2xl px-4 py-3 mb-4">
          <p className="text-yellow-300 font-black text-center text-lg text-glow-yellow">
            {result.caption}
          </p>
        </div>

        {/* Fake scores */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: t("Гоо үзэсгэлэн", "Beauty"), value: result.beautyScore, color: "#ff2d78", max: 100 },
            { label: t("Крейнж", "Cringe"), value: result.cringeScore, color: "#facc15", max: 150 },
            { label: t("Вирал", "Viral"), value: result.viralScore, color: "#06b6d4", max: 100 },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-white/40 text-xs mb-1">{s.label}</p>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-1">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((s.value / s.max) * 100, 100)}%` }}
                  transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ background: s.color }}
                />
              </div>
              <p className="font-black text-sm" style={{ color: s.color }}>
                {s.value}{s.label === t("Крейнж", "Cringe") && s.value > 100 ? "% 💀" : "%"}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Strip preview ─────────────────────────────────────── */}
      <div className="relative">
        {generating && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 rounded-2xl z-10 gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full"
            />
            <p className="text-white/70 text-sm">{t("Strip үүсгэж байна...", "Generating strip...")}</p>
          </div>
        )}
        <PhotoStrip photos={photos} stripUrl={stripUrl} lang={lang} />
      </div>

      {/* ── Sticker toggle ─────────────────────────────────────── */}
      <div className="flex items-center justify-center gap-3">
        <Sticker className="w-4 h-4 text-white/40" />
        <p className="text-white/50 text-sm">{t("Стикер", "Stickers")}</p>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowStickers(!showStickers)}
          className={`relative w-12 h-6 rounded-full transition-colors ${showStickers ? "bg-purple-500" : "bg-white/20"}`}
        >
          <motion.div
            animate={{ x: showStickers ? 24 : 2 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
          />
        </motion.button>
      </div>

      {/* ── TikTok viral hint ─────────────────────────────────── */}
      <motion.div
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-center p-4 rounded-2xl border border-cyan-500/30 bg-cyan-500/5"
      >
        <p className="text-cyan-400 font-bold text-sm">
          🎵 {t("TikTok Story-даа хуваалц!", "Share this to your TikTok Story!")}
        </p>
        <p className="text-white/30 text-xs mt-1">
          {t("\"Retake until perfect\" 😂 хийж үзээрэй", "\"Retake until perfect\" challenge 😂")}
        </p>
      </motion.div>

      {/* ── Action buttons ────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3">
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          onClick={handleDownload}
          disabled={!stripUrl}
          className="flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white disabled:opacity-40 glow-pink"
          style={{ background: "linear-gradient(135deg, #ff2d78, #a855f7)" }}
        >
          <Download className="w-5 h-5" />
          {t("Татах", "Download")}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          onClick={handleShare}
          disabled={!stripUrl}
          className="flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white disabled:opacity-40 glow-cyan"
          style={{ background: "linear-gradient(135deg, #06b6d4, #3b82f6)" }}
        >
          <Share2 className="w-5 h-5" />
          <AnimatePresence mode="wait">
            {copied
              ? <motion.span key="copied" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>✓ {t("Хуулагдлаа", "Copied!")}</motion.span>
              : <motion.span key="share" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{t("Хуваалцах", "Share")}</motion.span>
            }
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Retake button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={onRetake}
        className="flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white/70 border border-white/10 hover:border-white/30 hover:text-white transition-all"
      >
        <RefreshCw className="w-4 h-4" />
        {t("Дахин авах 😂", "Retake until perfect 😂")}
      </motion.button>
    </motion.div>
  );
}
