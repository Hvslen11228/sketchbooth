"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Camera from "@/components/Camera";
import ResultScreen from "@/components/ResultScreen";

type Page = "home" | "camera" | "result";

export default function Home() {
  const [page, setPage] = useState<Page>("home");
  const [lang, setLang] = useState<"mn" | "en">("mn");
  const [photos, setPhotos] = useState<string[]>([]);
  const [filter, setFilter] = useState("none");

  const t = (mn: string, en: string) => lang === "mn" ? mn : en;

  const onComplete = useCallback((p: string[], f: string) => {
    setPhotos(p); setFilter(f); setPage("result");
  }, []);

  const onRetake = useCallback(() => {
    setPhotos([]); setFilter("none"); setPage("camera");
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* Navbar */}
      <header className="border-b border-gray-100 sticky top-0 bg-white z-20">
        <div className="max-w-2xl mx-auto px-4 h-14 grid grid-cols-3 items-center">
          {/* Left — nav links */}
          <div className="flex items-center gap-4">
            <Link href="/faq" className="text-sm text-gray-500 hover:text-gray-900">FAQ</Link>
            <Link href="/contact" className="text-sm text-gray-500 hover:text-gray-900">Холбоо</Link>
          </div>
          {/* Center — logo */}
          <button onClick={() => setPage("home")} className="font-bold text-lg text-gray-900 text-center">
            Sketch Booth
          </button>
          {/* Right — lang */}
          <div className="flex justify-end">
            <button
              onClick={() => setLang(l => l === "mn" ? "en" : "mn")}
              className="text-sm text-gray-400 hover:text-gray-900 border border-gray-200 px-2 py-0.5 rounded"
            >
              {lang === "mn" ? "EN" : "МН"}
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center w-full px-4 py-8">
        <div className="w-full max-w-lg">
        <AnimatePresence mode="wait">

          {/* Home */}
          {page === "home" && (
            <motion.div key="home"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center text-center gap-8 pt-8"
            >
              <div className="text-7xl">📸</div>

              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Sketch Booth</h1>
                <p className="text-gray-500 text-lg">
                  {t("4 зураг аваад, strip болгоод, найздаа share хий!", "Take 4 photos, make a strip, share it!")}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  t("📸 4 зураг", "📸 4 photos"),
                  t("🎨 6 filter", "🎨 6 filters"),
                  t("🖼️ 20 frame", "🖼️ 20 frames"),
                  t("🎭 Стикер", "🎭 Stickers"),
                  t("📥 PNG татах", "📥 Download"),
                  t("✨ Үнэгүй", "✨ Free"),
                ].map(f => (
                  <span key={f} className="bg-gray-50 border border-gray-200 text-gray-600 text-sm px-3 py-1 rounded-full">{f}</span>
                ))}
              </div>

              <button
                onClick={() => setPage("camera")}
                className="bg-gray-900 text-white text-lg font-semibold px-10 py-4 rounded-2xl hover:bg-gray-700 transition-colors w-full max-w-xs"
              >
                {t("Эхлэх", "Start")} →
              </button>

              <p className="text-gray-400 text-sm">{t("Камерын зөвшөөрөл шаардлагатай", "Camera permission required")}</p>
            </motion.div>
          )}

          {/* Camera */}
          {page === "camera" && (
            <motion.div key="camera"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <button onClick={() => setPage("home")} className="text-gray-400 hover:text-gray-900 text-sm">← {t("Буцах", "Back")}</button>
                <div className="h-4 w-px bg-gray-200" />
                <span className="text-sm text-gray-500">{t("Зураг авах", "Capture")}</span>
              </div>
              <Camera lang={lang} onComplete={onComplete} />
            </motion.div>
          )}

          {/* Result */}
          {page === "result" && (
            <motion.div key="result"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <span className="text-sm font-medium text-gray-900">{t("Таны зургийн хэсэг", "Your photo strip")}</span>
              </div>
              <ResultScreen photos={photos} filterCSS={filter} lang={lang} onRetake={onRetake} />
            </motion.div>
          )}

        </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-4">
        <div className="max-w-2xl mx-auto px-4 flex items-center justify-between">
          <div className="flex gap-4">
            <Link href="/faq" className="text-sm text-gray-400 hover:text-gray-600">FAQ</Link>
            <Link href="/contact" className="text-sm text-gray-400 hover:text-gray-600">Холбоо барих</Link>
            <Link href="/privacy" className="text-sm text-gray-400 hover:text-gray-600">Нууцлал</Link>
          </div>
          <span className="text-sm text-gray-300">© 2025</span>
        </div>
      </footer>
    </div>
  );
}
