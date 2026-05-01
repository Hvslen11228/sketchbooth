"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera as CameraIcon, Globe } from "lucide-react";
import Link from "next/link";
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
    <div className="min-h-screen flex flex-col" style={{
      background: "linear-gradient(135deg, #f5f3ff 0%, #ede8ff 40%, #f3f0ff 70%, #faf8ff 100%)"
    }}>
      {/* Subtle overlay */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        background: "radial-gradient(ellipse at 20% 20%, rgba(255,45,120,0.05) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(168,85,247,0.05) 0%, transparent 50%)"
      }} />

      <div className="relative z-10 flex flex-col min-h-screen">

        {/* ── Header ─────────────────────────────────────── */}
        <header className="px-4 py-3 flex items-center justify-between border-b border-purple-200/60 bg-white/50 backdrop-blur-sm sticky top-0 z-20">
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => setAppState("home")} className="flex items-center gap-2">
            <CameraIcon className="w-5 h-5 text-pink-500" />
            <span className="font-black text-lg text-gray-800">
              Funny<span className="text-pink-500">Booth</span>
              <span className="text-xs text-gray-400 ml-1">MN</span>
            </span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setLang(l => l === "mn" ? "en" : "mn")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-purple-200 text-gray-600 hover:text-gray-900 text-sm font-bold transition-colors shadow-sm"
          >
            <Globe className="w-3.5 h-3.5" />
            {lang === "mn" ? "MN" : "EN"}
          </motion.button>
        </header>

        {/* ── Main ───────────────────────────────────────── */}
        <main className="flex-1 flex flex-col items-center justify-start px-4 py-8 gap-6">
          <AnimatePresence mode="wait">

            {/* HOME */}
            {appState === "home" && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="flex flex-col items-center gap-8 max-w-md mx-auto text-center"
              >
                <motion.div
                  animate={{ y: [0, -10, 0], rotate: [0, 3, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="text-8xl"
                >📸</motion.div>

                <div>
                  <h1 className="text-5xl font-black leading-tight" style={{ color: "#1a1a2e" }}>
                    Funny<br /><span style={{ color: "#ff2d78" }}>Photobooth</span>
                  </h1>
                  <p className="text-gray-400 text-sm mt-2 font-bold tracking-widest uppercase">Mongolia 🇲🇳</p>
                </div>

                <p className="text-gray-500 text-lg leading-relaxed">
                  {t("4 зураг авч, хөгжилтэй caption нэмж, найздаа share хий! 🔥",
                     "Take 4 photos, add funny captions, share with friends! 🔥")}
                </p>

                <div className="flex flex-wrap gap-2 justify-center">
                  {[
                    { icon: "📸", text: t("4 зураг", "4 photos") },
                    { icon: "🎨", text: t("Filter", "Filters") },
                    { icon: "😂", text: t("Хөгжилтэй", "Funny") },
                    { icon: "🖼️", text: t("Frame", "Frames") },
                    { icon: "🎭", text: t("Стикер", "Stickers") },
                    { icon: "📥", text: t("Татах", "Download") },
                  ].map((f) => (
                    <span key={f.text} className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-purple-100 rounded-full text-gray-600 text-sm font-medium shadow-sm">
                      <span>{f.icon}</span><span>{f.text}</span>
                    </span>
                  ))}
                </div>

                <motion.button
                  whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.03 }}
                  onClick={() => setAppState("camera")}
                  className="relative w-full py-6 rounded-3xl font-black text-2xl text-white overflow-hidden shadow-xl"
                  style={{ background: "linear-gradient(135deg, #ff2d78, #a855f7, #06b6d4)", boxShadow: "0 8px 32px rgba(255,45,120,0.35)" }}
                >
                  <motion.div
                    animate={{ x: ["0%", "200%"] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12"
                  />
                  📸 {t("Эхлэх", "Start")}
                </motion.button>

                <p className="text-gray-400 text-xs">
                  {t("Камерын зөвшөөрөл шаардлагатай", "Camera permission required")}
                </p>
              </motion.div>
            )}

            {/* CAMERA */}
            {appState === "camera" && (
              <motion.div key="camera" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} className="w-full max-w-2xl">
                <Camera lang={lang} onComplete={handlePhotosComplete} />
              </motion.div>
            )}

            {/* RESULT */}
            {appState === "result" && (
              <motion.div key="result" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} className="w-full max-w-xl">
                <ResultScreen photos={capturedPhotos} filterCSS={capturedFilter} lang={lang} onRetake={handleRetake} />
              </motion.div>
            )}

          </AnimatePresence>
        </main>

        {/* ── Footer ─────────────────────────────────────── */}
        <footer className="py-6 px-4 border-t border-purple-100 bg-white/40 backdrop-blur-sm">
          <div className="max-w-xl mx-auto flex flex-col items-center gap-4">
            <div className="flex items-center gap-3 flex-wrap justify-center">
              {[
                { href: "/faq",     icon: "❓", mn: "Асуулт",       en: "FAQ" },
                { href: "/contact", icon: "📬", mn: "Холбоо барих", en: "Contact" },
                { href: "/privacy", icon: "🔒", mn: "Нууцлал",      en: "Privacy" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm bg-white border-2 border-purple-200 text-purple-700 hover:border-pink-400 hover:text-pink-600 hover:shadow-md"
                >
                  <span className="text-base">{l.icon}</span>
                  <span>{lang === "mn" ? l.mn : l.en}</span>
                </Link>
              ))}
            </div>
            <p className="text-gray-400 text-xs">© 2025 FunnyBooth MN</p>
          </div>
        </footer>

      </div>
    </div>
  );
}
