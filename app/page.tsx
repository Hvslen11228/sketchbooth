"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera as CameraIcon, Globe } from "lucide-react";
import Link from "next/link";
import Camera from "@/components/Camera";
import ResultScreen from "@/components/ResultScreen";
import AdComponent from "@/components/AdComponent";
import ScenePicker from "@/components/ScenePicker";
import { SceneId, getSceneById } from "@/utils/scenes";

type AppState = "home" | "camera" | "result";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("home");
  const [lang, setLang] = useState<"mn" | "en">("mn");
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const [capturedFilter, setCapturedFilter] = useState<string>("none");
  const [scene, setScene] = useState<SceneId>("neon_default");

  const t = (mn: string, en: string) => lang === "mn" ? mn : en;
  const currentScene = getSceneById(scene);

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
    <div className="min-h-screen relative" style={{ background: currentScene.bodyCSS }}>
      {/* Dynamic scene overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 transition-all duration-700"
        style={{ background: currentScene.overlayCSS }}
      />

      <div className="relative z-10 min-h-screen flex flex-col">

        {/* ── Header ─────────────────────────────────────── */}
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

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setLang(l => l === "mn" ? "en" : "mn")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white text-sm font-bold transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            {lang === "mn" ? "MN" : "EN"}
          </motion.button>
        </header>

        {/* ── Scene picker — зөвхөн home & camera дэлгэц дээр ── */}
        <AnimatePresence>
          {appState !== "result" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="px-4 pt-3 overflow-hidden"
            >
              <ScenePicker selected={scene} onChange={setScene} lang={lang} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Main content ────────────────────────────────── */}
        <main className="flex-1 flex flex-col items-center justify-start px-4 py-6 gap-6">
          <AnimatePresence mode="wait">

            {/* HOME */}
            {appState === "home" && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="flex flex-col items-center gap-8 max-w-md mx-auto text-center pt-4"
              >
                <motion.div
                  animate={{ y: [0, -10, 0], rotate: [0, 3, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="text-8xl"
                >
                  📸
                </motion.div>

                <div>
                  <h1
                    className="text-5xl font-black text-white leading-tight"
                    style={{ textShadow: "0 0 30px rgba(255,45,120,0.5)" }}
                  >
                    Funny<br />
                    <span style={{ color: "#ff2d78" }}>Photobooth</span>
                  </h1>
                  <p className="text-white/40 text-sm mt-2 font-bold tracking-widest uppercase">
                    Mongolia 🇲🇳
                  </p>
                </div>

                <p className="text-white/60 text-lg leading-relaxed">
                  {t(
                    "4 зураг авч, хөгжилтэй caption нэмж, найздаа share хий! 🔥",
                    "Take 4 photos, add funny captions, share with friends! 🔥"
                  )}
                </p>

                {/* Feature pills */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {[
                    { icon: "📸", text: t("4 зураг", "4 photos") },
                    { icon: "🎨", text: t("Filter", "Filters") },
                    { icon: "😂", text: t("Хөгжилтэй", "Funny captions") },
                    { icon: "🖼️", text: t("Frame", "Frames") },
                    { icon: "🎭", text: t("Стикер", "Stickers") },
                    { icon: "📥", text: t("Татах", "Download") },
                  ].map((f) => (
                    <span
                      key={f.text}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/60 text-sm font-medium"
                    >
                      <span>{f.icon}</span>
                      <span>{f.text}</span>
                    </span>
                  ))}
                </div>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.04 }}
                  onClick={() => setAppState("camera")}
                  className="relative w-full py-6 rounded-3xl font-black text-2xl text-white overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #ff2d78, #a855f7, #06b6d4)",
                    boxShadow: "0 0 30px rgba(255,45,120,0.4), 0 0 60px rgba(168,85,247,0.2)",
                  }}
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

            {/* CAMERA */}
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

            {/* RESULT */}
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

        {/* ── Footer ──────────────────────────────────────── */}
        <footer className="py-5 px-4 border-t border-white/5">
          <div className="max-w-xl mx-auto flex flex-col items-center gap-3">
            <div className="flex items-center gap-5 text-xs text-white/30">
              <Link href="/faq" className="hover:text-white/70 transition-colors">
                ❓ {t("Асуулт", "FAQ")}
              </Link>
              <Link href="/contact" className="hover:text-white/70 transition-colors">
                📬 {t("Холбоо барих", "Contact")}
              </Link>
              <Link href="/privacy" className="hover:text-white/70 transition-colors">
                🔒 {t("Нууцлал", "Privacy")}
              </Link>
            </div>
            <p className="text-white/15 text-xs">
              © 2025 FunnyBooth MN
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
