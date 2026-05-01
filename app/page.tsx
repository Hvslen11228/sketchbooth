"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Camera from "@/components/Camera";
import ResultScreen from "@/components/ResultScreen";

type AppState = "home" | "camera" | "result";

// Film sprocket strip decoration
function FilmStrip({ vertical = false }: { vertical?: boolean }) {
  const holes = Array.from({ length: vertical ? 12 : 8 });
  return (
    <div className={`flex ${vertical ? "flex-col" : "flex-row"} gap-3 items-center`}>
      {holes.map((_, i) => (
        <div key={i} className="sprocket flex-shrink-0" />
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
    <div className="min-h-screen bg-[#0d0d0d] flex flex-col">

      {/* ── TOP FILM RAIL ─────────────────────────────────────── */}
      <div className="bg-[#1a1a1a] border-b border-[#2a2a2a] px-6 py-2 flex items-center justify-between">
        <FilmStrip />
        <div className="flex items-center gap-3">
          {/* Lang toggle */}
          <button
            onClick={() => setLang(l => l === "mn" ? "en" : "mn")}
            className="font-mono text-xs text-[#8a8070] hover:text-[#d4a843] transition-colors px-2 py-1 border border-[#2a2a2a] hover:border-[#d4a843] rounded"
          >
            {lang === "mn" ? "EN" : "МН"}
          </button>
        </div>
        <FilmStrip />
      </div>

      {/* ── HEADER ────────────────────────────────────────────── */}
      <header className="px-6 pt-6 pb-4 border-b border-[#1e1e1e]">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setAppState("home")}
          className="w-full text-left"
        >
          <div className="flex items-baseline gap-3">
            <h1 className="font-display text-6xl md:text-8xl text-[#f5f0e8] leading-none tracking-wide">
              ФОТО
            </h1>
            <h1 className="font-display text-6xl md:text-8xl film-shimmer leading-none">
              БУУДАЛ
            </h1>
          </div>
          <div className="flex items-center gap-4 mt-1">
            <div className="h-px flex-1 bg-[#2a2a2a]" />
            <span className="font-mono text-[10px] text-[#8a8070] tracking-[0.3em] uppercase">
              Mongolia's Funniest Photobooth
            </span>
            <div className="h-px flex-1 bg-[#2a2a2a]" />
          </div>
        </motion.button>
      </header>

      {/* ── MAIN CONTENT ──────────────────────────────────────── */}
      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">

          {/* HOME */}
          {appState === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 grid md:grid-cols-[1fr_auto_1fr] gap-0"
            >
              {/* Left panel */}
              <div className="p-6 md:p-10 flex flex-col justify-between border-r border-[#1e1e1e]">
                {/* Feature list */}
                <div className="space-y-4 mt-4">
                  {[
                    { num: "01", text: t("3 секундын countdown", "3-second countdown") },
                    { num: "02", text: t("4 зураг автоматаар", "4 automatic captures") },
                    { num: "03", text: t("6 filter сонголт", "6 filter options") },
                    { num: "04", text: t("10 хүрээний загвар", "10 frame styles") },
                    { num: "05", text: t("Emoji стикер overlay", "Emoji sticker overlay") },
                    { num: "06", text: t("PNG татах & share", "PNG download & share") },
                  ].map((f, i) => (
                    <motion.div
                      key={f.num}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="flex items-center gap-4 group"
                    >
                      <span className="font-mono text-[10px] text-[#d4a843]/60 w-6 flex-shrink-0">{f.num}</span>
                      <div className="h-px w-6 bg-[#2a2a2a] group-hover:w-10 group-hover:bg-[#d4a843]/40 transition-all duration-300" />
                      <span className="font-mono text-xs text-[#8a8070] group-hover:text-[#f5f0e8] transition-colors">{f.text}</span>
                    </motion.div>
                  ))}
                </div>

                {/* ISO badge */}
                <div className="mt-8 inline-flex items-center gap-2 border border-[#2a2a2a] px-3 py-1.5 self-start">
                  <div className="w-2 h-2 rounded-full bg-[#d4a843] animate-pulse" />
                  <span className="font-mono text-[10px] text-[#8a8070]">ISO 400 • FREE</span>
                </div>
              </div>

              {/* Center — big CTA */}
              <div className="flex flex-col items-center justify-center p-8 gap-8 relative">
                {/* Vertical film strip left */}
                <div className="hidden md:block absolute left-0 top-0 bottom-0 bg-[#1a1a1a] w-5 flex flex-col items-center justify-center py-4 gap-3">
                  <FilmStrip vertical />
                </div>
                <div className="hidden md:block absolute right-0 top-0 bottom-0 bg-[#1a1a1a] w-5 flex flex-col items-center justify-center py-4 gap-3">
                  <FilmStrip vertical />
                </div>

                {/* Camera icon */}
                <motion.div
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="relative"
                >
                  <div className="w-28 h-28 rounded-2xl bg-[#1a1a1a] border-2 border-[#2a2a2a] flex items-center justify-center text-6xl shadow-2xl">
                    📸
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#c0392b] animate-pulse" />
                </motion.div>

                {/* Main CTA button */}
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setAppState("camera")}
                  className="relative overflow-hidden w-full max-w-[200px]"
                >
                  <div className="bg-[#d4a843] text-[#0d0d0d] font-display text-3xl py-4 px-8 w-full text-center tracking-wider hover:bg-[#f0c060] transition-colors">
                    {t("ЭХЛЭХ", "START")}
                  </div>
                  {/* Shimmer */}
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 pointer-events-none"
                  />
                </motion.button>

                <p className="font-mono text-[10px] text-[#8a8070]/60 text-center max-w-[160px] leading-relaxed">
                  {t("КАМЕРЫН ЗӨВШӨӨРӨЛ ШААРДЛАГАТАЙ", "CAMERA PERMISSION REQUIRED")}
                </p>
              </div>

              {/* Right panel — exposure sheet aesthetic */}
              <div className="p-6 md:p-10 border-l border-[#1e1e1e] hidden md:flex flex-col justify-between">
                <div className="space-y-6">
                  <div>
                    <p className="font-mono text-[9px] text-[#8a8070]/50 tracking-widest mb-2">ОГНОО / DATE</p>
                    <p className="font-mono text-xs text-[#8a8070]">{new Date().toLocaleDateString("mn-MN")}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[9px] text-[#8a8070]/50 tracking-widest mb-2">ФОРМАТ / FORMAT</p>
                    <p className="font-mono text-xs text-[#8a8070]">4×1 STRIP • PNG</p>
                  </div>
                  <div>
                    <p className="font-mono text-[9px] text-[#8a8070]/50 tracking-widest mb-2">ЗУРГИЙН ТОО / FRAMES</p>
                    <div className="flex gap-2 mt-1">
                      {[1,2,3,4].map(n => (
                        <div key={n} className="w-8 h-10 border border-[#2a2a2a] flex items-center justify-center">
                          <span className="font-mono text-[9px] text-[#8a8070]">{n}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="font-mono text-[9px] text-[#8a8070]/50 tracking-widest mb-2">ХУРД / SPEED</p>
                    <p className="font-mono text-xs text-[#8a8070]">1/125s • f/2.8</p>
                  </div>
                </div>

                {/* Decorative exposure gradient */}
                <div className="mt-4">
                  <p className="font-mono text-[9px] text-[#8a8070]/40 tracking-widest mb-2">EXPOSURE</p>
                  <div className="flex gap-0.5">
                    {Array.from({length: 16}).map((_, i) => (
                      <div key={i} className="h-6 flex-1 rounded-sm"
                        style={{ background: `rgba(212,168,67,${i/16 * 0.8})` }} />
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-start px-4 py-6"
            >
              <Camera lang={lang} onComplete={handlePhotosComplete} />
            </motion.div>
          )}

          {/* RESULT */}
          {appState === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-start px-4 py-6"
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

      {/* ── BOTTOM FILM RAIL + FOOTER ──────────────────────────── */}
      <div className="border-t border-[#1e1e1e]">
        {/* Footer links */}
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-1">
            {[
              { href: "/faq",     label: t("АСУУЛТ", "FAQ") },
              { href: "/contact", label: t("ХОЛБОО", "CONTACT") },
              { href: "/privacy", label: t("НУУЦЛАЛ", "PRIVACY") },
            ].map((l, i) => (
              <span key={l.href} className="flex items-center">
                <Link
                  href={l.href}
                  className="font-mono text-[11px] text-[#8a8070] hover:text-[#d4a843] transition-colors tracking-widest px-3 py-1"
                >
                  {l.label}
                </Link>
                {i < 2 && <span className="text-[#2a2a2a] text-xs">·</span>}
              </span>
            ))}
          </div>
          <span className="font-mono text-[10px] text-[#8a8070]/40">© 2025</span>
        </div>

        {/* Bottom film strip */}
        <div className="bg-[#1a1a1a] border-t border-[#2a2a2a] px-6 py-2 flex items-center justify-between">
          <FilmStrip />
          <span className="font-mono text-[9px] text-[#8a8070]/30 tracking-widest">ФОТО БУУДАЛ MN</span>
          <FilmStrip />
        </div>
      </div>
    </div>
  );
}
