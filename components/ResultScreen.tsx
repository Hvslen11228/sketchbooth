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

interface Props { photos: string[]; filterCSS: string; lang: "mn"|"en"; onRetake: () => void; }

export default function ResultScreen({ photos, filterCSS, lang, onRetake }: Props) {
  const [stripUrl, setStripUrl] = useState<string|null>(null);
  const [result, setResult]     = useState<FunnyResult|null>(null);
  const [frame, setFrame]       = useState<FrameId>("classic");
  const [showStickers, setShowStickers] = useState(true);
  const [stickers] = useState(() => getRandomStickers(6));
  const [generating, setGenerating] = useState(true);
  const [copied, setCopied] = useState(false);

  const t = useCallback((mn: string, en: string) => lang === "mn" ? mn : en, [lang]);

  const build = useCallback(async (r: FunnyResult, fid: FrameId, stk: boolean) => {
    setGenerating(true);
    const url = await generateStrip({ photos, filterCSS, frame: getFrameById(fid), showStickers: stk, stickers, caption: r.caption, lang });
    setStripUrl(url);
    setGenerating(false);
  }, [photos, filterCSS, stickers, lang]);

  useEffect(() => {
    const r = getRandomResult(lang);
    setResult(r);
    build(r, "classic", true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFrameChange = (id: FrameId) => { setFrame(id); if (result) build(result, id, showStickers); };
  const onStickerToggle = () => { const n = !showStickers; setShowStickers(n); if (result) build(result, frame, n); };

  const download = () => {
    if (!stripUrl) return;
    const a = document.createElement("a");
    a.href = stripUrl; a.download = `sketchbooth-${Date.now()}.png`; a.click();
  };

  const share = async () => {
    const text = t("Sketch Booth-д зураг авлаа! 📸 👉 sketchbooth.mn", "Took photos at Sketch Booth MN! 📸 👉 sketchbooth.mn");
    if (navigator.share && stripUrl) {
      try {
        const blob = await (await fetch(stripUrl)).blob();
        await navigator.share({ title: "Sketch Booth", text, files: [new File([blob], "strip.png", { type: "image/png" })] });
        return;
      } catch { /**/ }
    }
    await navigator.clipboard.writeText(text);
    setCopied(true); setTimeout(() => setCopied(false), 2500);
    download();
  };

  if (!result) return null;

  return (
    <div className="flex flex-col gap-5 w-full max-w-xl mx-auto">
      <AdComponent adSlot="0987654321" format="horizontal" className="opacity-50" />

      {/* Frame picker */}
      <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
        <FramePicker selected={frame} onChange={onFrameChange} lang={lang} />
      </div>

      {/* Sticker toggle */}
      <div className="flex items-center justify-between px-1">
        <span className="text-sm text-gray-600">{t("Стикер нэмэх", "Add stickers")}</span>
        <button onClick={onStickerToggle}
          className={`w-11 h-6 rounded-full transition-colors relative ${showStickers ? "bg-gray-900" : "bg-gray-200"}`}
        >
          <motion.div animate={{ x: showStickers ? 22 : 2 }} transition={{ type: "spring", stiffness: 500 }}
            className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
          />
        </button>
      </div>

      {/* Strip */}
      <div className="relative rounded-2xl overflow-hidden border border-gray-100">
        {generating && (
          <div className="absolute inset-0 bg-white/90 flex items-center justify-center z-10">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              className="w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full"
            />
          </div>
        )}
        <PhotoStrip photos={photos} stripUrl={stripUrl} lang={lang} />
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button onClick={download} disabled={!stripUrl || generating}
          className="flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white bg-gray-900 hover:bg-gray-700 disabled:opacity-40 transition-colors"
        >
          <Download className="w-4 h-4" />
          {t("Татах", "Download")}
        </button>
        <button onClick={share} disabled={!stripUrl || generating}
          className="flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold border-2 border-gray-900 text-gray-900 hover:bg-gray-50 disabled:opacity-40 transition-colors"
        >
          <Share2 className="w-4 h-4" />
          <AnimatePresence mode="wait">
            {copied
              ? <motion.span key="c" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>✓ {t("Хуулагдлаа", "Copied!")}</motion.span>
              : <motion.span key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Share</motion.span>
            }
          </AnimatePresence>
        </button>
      </div>

      <button onClick={onRetake}
        className="flex items-center justify-center gap-2 py-3 rounded-xl text-gray-500 border border-gray-200 hover:border-gray-400 hover:text-gray-900 bg-white transition-all text-sm"
      >
        <RefreshCw className="w-4 h-4" />
        {t("Дахин авах", "Retake")}
      </button>
    </div>
  );
}
