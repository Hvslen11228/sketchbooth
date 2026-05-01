"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera as CameraIcon, Globe } from "lucide-react";
import Camera from "@/components/Camera";
import ResultScreen from "@/components/ResultScreen";
import AdComponent from "@/components/AdComponent";

type AppState = "home" | "camera" | "result";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("home");
  const [lang, setLang] = useState<"mn" | "en">("mn");
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const [capturedFilter, setCapturedFilter] = useState<string>("none");

  const t = (mn: string, en: string) => lang === "mn" ? mn : en;

  const handlePhotosComplete = useCallback((photos: string[], filter: string) => {
    setCapturedPhotos(photos);
    setCapturedFilter(filter);
    setAppState("result");
  }, []);

  const handleRetake = useCallback(() => {
    setCapturedPhotos([]);
    setCapturedFilter("none");
    setAppState("camera");
  }, []);

  return (
    <div className="gradient-bg min-h-screen relative">
      <div className="relative z-10 min-h-screen flex flex-col">

        {/* ── Header ─────────────────────────────────────────── */}
        <header className="px-4 py-3 flex items-center justify-between border-b border-white/5">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setAppState("home")}
            className="flex items-center gap-2"
          >
            <CameraIcon className="w-5 h-5 text-pink-400" />
            <span className="font-black text-lg text-white">
              Funny<span className="text-pink-400">Booth</span>
              <span className="text-xs text-white/30 ml-1">MN</span>
            </span>
          </motion.button>

          <div className="flex items-center gap-3">
            {/* Language toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setLang(l => l === "mn" ? "en" : "mn")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white text-sm font-bold transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              {lang === "mn" ? "MN" : "EN"}
            </motion.button>
          </div>

          {/* Ad in header — non-intrusive */}
          <div className="hidden md:block">
            <AdComponent adSlot="1122334455" format="horizontal" className="w-40 opacity-60" />
          </div>
        </header>

        {/* ── Main content ───────────────────────────────────── */}
        <main className="flex-1 flex flex-col items-center justify-start px-4 py-6 gap-6">
          <AnimatePresence mode="wait">

            {/* HOME screen */}
            {appState === "home" && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="flex flex-col items-center gap-8 max-w-md mx-auto text-center pt-8"
              >
                {/* Hero emoji */}
                <motion.div
                  animate={{ y: [0, -10, 0], rotate: [0, 3, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="text-8xl"
                >
                  📸
                </motion.div>

                {/* Title */}
                <div>
                  <h1 className="text-5xl font-black text-white text-glow-pink leading-tight">
                    Funny<br />
                    <span style={{ color: "#ff2d78" }}>Photobooth</span>
                  </h1>
                  <p className="text-white/40 text-sm mt-2 font-bold tracking-widest uppercase">
                    Mongolia 🇲🇳
                  </p>
                </div>

                {/* Description */}
                <p className="text-white/60 text-lg leading-relaxed">
                  {t(
                    "4 зураг авч, хөгжилтэй caption нэмж, найздаа share хий! 🔥",
                    "Take 4 photos, add funny captions, share with friends! 🔥"
                  )}
                </p>

                {/* Feature pills */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {[
                    t("📸 4 зураг", "📸 4 photos"),
                    t("🎨 Filter", "🎨 Filters"),
                    t("😂 Хөгжилтэй", "😂 Funny captions"),
                    t("🎭 Стикер", "🎭 Stickers"),
                    t("📥 Татах", "📥 Download"),
                  ].map((f) => (
                    <span key={f} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/60 text-sm font-medium">
                      {f}
                    </span>
                  ))}
                </div>

                {/* Start button */}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.04 }}
                  onClick={() => setAppState("camera")}
                  className="relative w-full py-6 rounded-3xl font-black text-2xl text-white overflow-hidden glow-pink"
                  style={{ background: "linear-gradient(135deg, #ff2d78, #a855f7, #06b6d4)" }}
                >
                  <motion.div
                    animate={{ x: ["0%", "200%"] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12"
                  />
                  📸 {t("Эхлэх", "Start")}
                </motion.button>

                <p className="text-white/20 text-xs">
                  {t("Камерын зөвшөөрөл шаардлагатай", "Camera permission required")}
                </p>
              </motion.div>
            )}

            {/* CAMERA screen */}
            {appState === "camera" && (
              <motion.div
                key="camera"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                className="w-full max-w-2xl"
              >
                <Camera lang={lang} onComplete={handlePhotosComplete} />
              </motion.div>
            )}

            {/* RESULT screen */}
            {appState === "result" && (
              <motion.div
                key="result"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                className="w-full max-w-xl"
              >
                <ResultScreen
                  photos={capturedPhotos}
                  filterCSS={capturedFilter}
                  lang={lang}
                  onRetake={handleRetake}
                />
              </motion.div>
            )}

          </AnimatePresence>
        </main>

        {/* ── Footer ─────────────────────────────────────────── */}
        <footer className="py-4 px-4 text-center border-t border-white/5">
          <p className="text-white/20 text-xs">
            © 2025 FunnyBooth MN •{" "}
            <span className="text-pink-500/60">
              {t("Монголын хамгийн хөгжилтэй photo booth", "Mongolia's funniest photobooth")}
            </span>
          </p>
        </footer>
      </div>
    </div>
  );
}
