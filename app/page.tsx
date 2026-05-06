"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Camera from "@/components/Camera";
import ResultScreen from "@/components/ResultScreen";

type Page = "home" | "camera" | "result";

export default function Home() {
  const [page, setPage] = useState<Page>("home");
  const [photos, setPhotos] = useState<string[]>([]);
  const [filter, setFilter] = useState("none");

  const lang = "mn";
  const t = (mn: string, en: string) => lang === "mn" ? mn : en;

  const onComplete = useCallback((p: string[], f: string) => {
    setPhotos(p); setFilter(f); setPage("result");
  }, []);

  const onRetake = useCallback(() => {
    setPhotos([]); setFilter("none"); setPage("camera");
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── HEADER ──────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 bg-white">
        {/* Top micro-bar */}
        <div style={{ background: "#111", padding: "6px 0" }}>
          <div className="max-w-2xl mx-auto px-6 flex items-center justify-center">
            <span style={{ fontFamily: "monospace", fontSize: "10px", letterSpacing: "0.3em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>
              Mongolia's Funniest Photo Booth · Free · 2025
            </span>
          </div>
        </div>

        {/* Main header row */}
        <div style={{ borderBottom: "1px solid #e8e8e8" }}>
          <div className="max-w-2xl mx-auto px-6 flex items-center justify-between" style={{ height: "64px" }}>

            {/* Left nav */}
            <nav className="flex items-center gap-6">
              {[
                { href: "/faq", label: "FAQ" },
                { href: "/contact", label: "Холбоо" },
              ].map(l => (
                <Link key={l.href} href={l.href} className="group relative">
                  <span style={{ fontSize: "12px", letterSpacing: "0.08em", color: "#999", textTransform: "uppercase", fontWeight: 500, transition: "color 0.2s" }}
                    className="group-hover:text-black"
                  >
                    {l.label}
                  </span>
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>

            {/* Center — wordmark */}
            <button
              onClick={() => setPage("home")}
              className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
            >
              <span style={{
                fontFamily: "'Georgia', serif",
                fontSize: "22px",
                fontWeight: 400,
                letterSpacing: "0.12em",
                color: "#111",
                lineHeight: 1,
                textTransform: "uppercase",
              }}>
                Sketch Booth
              </span>
              <span style={{
                fontFamily: "monospace",
                fontSize: "8px",
                letterSpacing: "0.35em",
                color: "#bbb",
                marginTop: "3px",
                textTransform: "uppercase",
              }}>
                Est. 2025 · MN
              </span>
            </button>

            {/* Right — privacy link */}
            <Link href="/privacy" className="group relative">
              <span style={{ fontSize: "12px", letterSpacing: "0.08em", color: "#999", textTransform: "uppercase", fontWeight: 500 }}
                className="group-hover:text-black transition-colors duration-200"
              >
                Нууцлал
              </span>
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-300" />
            </Link>
          </div>
        </div>
      </header>

      {/* ── MAIN ────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col items-center w-full px-4 py-8">
        <div className="w-full max-w-2xl mx-auto">
          <AnimatePresence mode="wait">

            {page === "home" && (
              <motion.div key="home"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center text-center gap-8 pt-8"
              >
                <div className="text-7xl">📸</div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">Sketch Booth</h1>
                  <p className="text-gray-500 text-lg">{t("4 зураг аваад, strip болгоод, найздаа share хий!", "Take 4 photos, make a strip, share it!")}</p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {[t("📸 4 зураг","📸 4 photos"), t("🎨 6 filter","🎨 6 filters"), t("🖼️ 20 frame","🖼️ 20 frames"), t("🎭 Стикер","🎭 Stickers"), t("📥 PNG татах","📥 Download"), t("✨ Үнэгүй","✨ Free")].map(f => (
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

            {page === "camera" && (
              <motion.div key="camera" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="flex items-center gap-2 mb-6">
                  <button onClick={() => setPage("home")} className="text-gray-400 hover:text-gray-900 text-sm">← {t("Буцах", "Back")}</button>
                  <div className="h-4 w-px bg-gray-200" />
                  <span className="text-sm text-gray-500">{t("Зураг авах", "Capture")}</span>
                </div>
                <Camera lang={lang} onComplete={onComplete} />
              </motion.div>
            )}

            {page === "result" && (
              <motion.div key="result" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-sm font-medium text-gray-900">{t("Таны зургийн хэсэг", "Your photo strip")}</span>
                </div>
                <ResultScreen photos={photos} filterCSS={filter} lang={lang} onRetake={onRetake} />
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer>
        {/* Main footer */}
        <div style={{ borderTop: "1px solid #e8e8e8", padding: "40px 0 32px" }}>
          <div className="max-w-2xl mx-auto px-6">
            <div className="flex items-start justify-between">
              {/* Brand */}
              <div>
                <div style={{ fontFamily: "'Georgia', serif", fontSize: "18px", letterSpacing: "0.1em", color: "#111", textTransform: "uppercase", marginBottom: "6px" }}>
                  Sketch Booth
                </div>
                <div style={{ fontFamily: "monospace", fontSize: "10px", letterSpacing: "0.25em", color: "#bbb", textTransform: "uppercase" }}>
                  Mongolia · 2025
                </div>
              </div>

              {/* Links grid */}
              <div className="flex gap-12">
                <div className="flex flex-col gap-3">
                  <div style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "0.3em", color: "#bbb", textTransform: "uppercase", marginBottom: "2px" }}>Хуудас</div>
                  {[{ href: "/faq", label: "FAQ" }, { href: "/contact", label: "Холбоо барих" }].map(l => (
                    <Link key={l.href} href={l.href} className="group relative self-start">
                      <span style={{ fontSize: "13px", color: "#555" }} className="group-hover:text-black transition-colors duration-200">{l.label}</span>
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-300" />
                    </Link>
                  ))}
                </div>
                <div className="flex flex-col gap-3">
                  <div style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "0.3em", color: "#bbb", textTransform: "uppercase", marginBottom: "2px" }}>Бусад</div>
                  {[{ href: "/privacy", label: "Нууцлал" }].map(l => (
                    <Link key={l.href} href={l.href} className="group relative self-start">
                      <span style={{ fontSize: "13px", color: "#555" }} className="group-hover:text-black transition-colors duration-200">{l.label}</span>
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-300" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ background: "#111", padding: "12px 0" }}>
          <div className="max-w-2xl mx-auto px-6 flex items-center justify-between">
            <span style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "0.3em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase" }}>
              © 2025 Sketch Booth MN
            </span>
            <span style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "0.3em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase" }}>
              Free · Open · Fun
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
