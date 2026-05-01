"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Camera from "@/components/Camera";
import ResultScreen from "@/components/ResultScreen";

type AppState = "home" | "camera" | "result";

function FilmStrip() {
  return (
    <div className="flex flex-row gap-2.5 items-center">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="sprocket" />
      ))}
    </div>
  );
}

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
    <div className="min-h-screen bg-white flex flex-col">

      {/* ── TOP NAV — logo + menu centered ──────────────────── */}
      <header className="border-b border-[#e8e5e0] sticky top-0 z-20 bg-white/95 backdrop-blur-sm">
        {/* Film rail */}
        <div className="bg-[#f7f5f2] border-b border-[#e8e5e0] px-6 py-1.5 flex items-center justify-between">
          <FilmStrip />
          <span className="font-mono text-[9px] text-[#b0a898] tracking-[0.3em]">ФОТО БУУДАЛ MN</span>
          <FilmStrip />
        </div>

        {/* Main nav row */}
        <div className="px-6 py-3 flex items-center justify-between gap-4">
          {/* Left nav links */}
          <nav className="flex items-center gap-1">
            {[
              { href: "/faq",     mn: "АСУУЛТ",  en: "FAQ" },
              { href: "/contact", mn: "ХОЛБОО",  en: "CONTACT" },
              { href: "/privacy", mn: "НУУЦЛАЛ", en: "PRIVACY" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-mono text-[10px] tracking-widest text-[#6b6860] hover:text-[#c8913a] px-3 py-1.5 transition-colors border border-transparent hover:border-[#e8e5e0] rounded-sm"
              >
                {lang === "mn" ? l.mn : l.en}
              </Link>
            ))}
          </nav>

          {/* Center — logo */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setAppState("home")}
            className="flex flex-col items-center flex-shrink-0"
          >
            <div className="flex items-baseline gap-2">
              <span className="font-display text-3xl md:text-4xl text-[#111110] leading-none">ФОТО</span>
              <span className="font-display text-3xl md:text-4xl film-shimmer leading-none">БУУДАЛ</span>
            </div>
          </motion.button>

          {/* Right — lang toggle */}
          <div className="flex items-center gap-2 justify-end">
            <button
              onClick={() => setLang(l => l === "mn" ? "en" : "mn")}
              className="font-mono text-[10px] tracking-widest text-[#6b6860] hover:text-[#c8913a] px-3 py-1.5 border border-[#e8e5e0] hover:border-[#c8913a] rounded-sm transition-colors"
            >
              {lang === "mn" ? "EN" : "МН"}
            </button>
          </div>
        </div>
      </header>

      {/* ── MAIN ────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">

          {/* HOME */}
          {appState === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 grid md:grid-cols-[1fr_auto_1fr]"
            >
              {/* Left — feature list */}
              <div className="p-8 md:p-12 flex flex-col justify-between border-r border-[#e8e5e0]">
                <div className="space-y-5 mt-2">
                  {[
                    { num: "01", text: t("3 секундын countdown", "3-second countdown") },
                    { num: "02", text: t("4 зураг автоматаар", "4 automatic captures") },
                    { num: "03", text: t("6 filter сонголт", "6 filter options") },
                    { num: "04", text: t("20 хүрээний загвар", "20 frame styles") },
                    { num: "05", text: t("Emoji стикер overlay", "Emoji sticker overlay") },
                    { num: "06", text: t("PNG татах & share", "PNG download & share") },
                  ].map((f, i) => (
                    <motion.div
                      key={f.num}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="flex items-center gap-3 group"
                    >
                      <span className="font-mono text-[10px] text-[#c8913a]/70 w-5 flex-shrink-0">{f.num}</span>
                      <div className="h-px w-4 bg-[#e8e5e0] group-hover:w-8 group-hover:bg-[#c8913a]/40 transition-all duration-300" />
                      <span className="font-mono text-[11px] text-[#6b6860] group-hover:text-[#111110] transition-colors leading-relaxed">{f.text}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-8 flex items-center gap-2 border border-[#e8e5e0] px-3 py-2 self-start">
                  <div className="w-2 h-2 rounded-full bg-[#c8913a] animate-pulse" />
                  <span className="font-mono text-[9px] text-[#b0a898] tracking-widest">ISO 400 • FREE</span>
                </div>
              </div>

              {/* Center — CTA */}
              <div className="flex flex-col items-center justify-center p-8 md:p-12 gap-8 min-w-[220px] border-r border-[#e8e5e0]">
                <motion.div
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="relative"
                >
                  <div className="w-24 h-24 rounded-xl bg-[#f7f5f2] border border-[#e8e5e0] flex items-center justify-center text-5xl shadow-sm">
                    📸
                  </div>
                  <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#c0392b] animate-pulse" />
                </motion.div>

                <motion.button
                  whileTap={{ scale: 0.96 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setAppState("camera")}
                  className="relative overflow-hidden w-full"
                >
                  <div className="bg-[#111110] text-white font-display text-3xl py-4 px-6 w-full text-center tracking-wider hover:bg-[#c8913a] transition-colors duration-300">
                    {t("ЭХЛЭХ", "START")}
                  </div>
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 pointer-events-none"
                  />
                </motion.button>

                <p className="font-mono text-[9px] text-[#b0a898] text-center leading-relaxed tracking-widest">
                  {t("КАМЕРЫН ЗӨВШӨӨРӨЛ\nШААРДЛАГАТАЙ", "CAMERA PERMISSION\nREQUIRED")}
                </p>
              </div>

              {/* Right — exposure sheet */}
              <div className="p-8 md:p-12 hidden md:flex flex-col justify-between">
                <div className="space-y-6">
                  {[
                    { label: "ОГНОО / DATE",    value: new Date().toLocaleDateString("mn-MN") },
                    { label: "ФОРМАТ / FORMAT", value: "4×1 STRIP • PNG" },
                    { label: "ХУРД / SPEED",    value: "1/125s • f/2.8" },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="font-mono text-[9px] text-[#b0a898] tracking-widest mb-1">{label}</p>
                      <p className="font-mono text-xs text-[#6b6860]">{value}</p>
                    </div>
                  ))}
                  <div>
                    <p className="font-mono text-[9px] text-[#b0a898] tracking-widest mb-2">ЗУРГИЙН ТОО / FRAMES</p>
                    <div className="flex gap-1.5">
                      {[1,2,3,4].map(n => (
                        <div key={n} className="w-8 h-10 border border-[#e8e5e0] flex items-center justify-center bg-[#f7f5f2]">
                          <span className="font-mono text-[9px] text-[#b0a898]">{n}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="font-mono text-[9px] text-[#b0a898] tracking-widest mb-2">EXPOSURE</p>
                  <div className="flex gap-px">
                    {Array.from({length: 20}).map((_, i) => (
                      <div key={i} className="h-5 flex-1"
                        style={{ background: `rgba(200,145,58,${i/20 * 0.9})` }} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* CAMERA */}
          {appState === "camera" && (
            <motion.div
              key="camera"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-start px-4 py-8"
            >
              <Camera lang={lang} onComplete={handlePhotosComplete} />
            </motion.div>
          )}

          {/* RESULT */}
          {appState === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-start px-4 py-8"
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

      {/* ── BOTTOM FILM RAIL ─────────────────────────────────── */}
      <div className="border-t border-[#e8e5e0] bg-[#f7f5f2] px-6 py-2 flex items-center justify-between">
        <FilmStrip />
        <span className="font-mono text-[9px] text-[#b0a898] tracking-[0.25em]">© 2025 ФОТО БУУДАЛ MN</span>
        <FilmStrip />
      </div>

    </div>
  );
}
