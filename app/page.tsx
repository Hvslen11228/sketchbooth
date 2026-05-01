"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Camera from "@/components/Camera";
import ResultScreen from "@/components/ResultScreen";

type AppState = "home" | "camera" | "result";

const TICKER_ITEMS = [
  "SKETCH BOOTH MN", "📸 ЗУРАГ АВ", "SHARE IT", "4 FRAMES",
  "20 STYLES", "FREE", "SKETCH BOOTH MN", "📸 ЗУРАГ АВ", "SHARE IT", "4 FRAMES", "20 STYLES", "FREE",
];

export default function Home() {
  const [appState, setAppState] = useState<AppState>("home");
  const [lang, setLang] = useState<"mn" | "en">("mn");
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const [capturedFilter, setCapturedFilter] = useState<string>("none");

  const t = (mn: string, en: string) => lang === "mn" ? mn : en;

  const handlePhotosComplete = useCallback((photos: string[], filter: string) => {
    setCapturedPhotos(photos); setCapturedFilter(filter); setAppState("result");
  }, []);

  const handleRetake = useCallback(() => {
    setCapturedPhotos([]); setCapturedFilter("none"); setAppState("camera");
  }, []);

  return (
    <div className="min-h-screen bg-[#f9f7f4] flex flex-col">

      {/* ── HEADER ───────────────────────────────────────────── */}
      <header className="border-b border-black/10 sticky top-0 z-30 bg-[#f9f7f4]/95 backdrop-blur-sm">
        <div className="flex items-stretch">

          {/* Logo block */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setAppState("home")}
            className="px-6 py-4 border-r border-black/10 flex items-center"
          >
            <div>
              <div className="font-display text-[11px] font-300 text-[#9a9490] tracking-[0.25em] leading-none mb-1">MN</div>
              <div className="font-display text-xl font-900 text-[#0a0a0a] leading-none tracking-tight">SKETCH<br/>BOOTH</div>
            </div>
          </motion.button>

          {/* Nav — center */}
          <nav className="flex-1 flex items-center justify-center gap-0">
            {[
              { href: "/faq",     mn: "АСУУЛТ",  en: "FAQ" },
              { href: "/contact", mn: "ХОЛБОО",  en: "CONTACT" },
              { href: "/privacy", mn: "НУУЦЛАЛ", en: "PRIVACY" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-mono text-[10px] tracking-[0.2em] text-[#9a9490] hover:text-[#0a0a0a] hover:bg-black/5 px-5 py-4 h-full flex items-center border-r border-black/5 transition-all"
              >
                {lang === "mn" ? l.mn : l.en}
              </Link>
            ))}
          </nav>

          {/* Lang + start */}
          <div className="flex items-stretch border-l border-black/10">
            <button
              onClick={() => setLang(l => l === "mn" ? "en" : "mn")}
              className="font-mono text-[10px] tracking-widest text-[#9a9490] hover:text-[#0a0a0a] px-4 border-r border-black/10 transition-colors"
            >
              {lang === "mn" ? "EN" : "МН"}
            </button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setAppState("camera")}
              className="font-display text-[11px] font-700 tracking-[0.15em] bg-[#e8301a] text-white px-6 hover:bg-[#0a0a0a] transition-colors"
            >
              {t("ЭХЛЭХ", "START")} ↗
            </motion.button>
          </div>

        </div>
      </header>

      {/* ── TICKER ───────────────────────────────────────────── */}
      <div className="border-b border-black/10 bg-[#0a0a0a] overflow-hidden py-2">
        <div className="ticker-inner flex gap-8 items-center">
          {TICKER_ITEMS.map((item, i) => (
            <span key={i} className="font-mono text-[10px] text-[#f9f7f4]/50 tracking-[0.3em] flex-shrink-0">
              {item} <span className="text-[#e8301a] mx-3">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── MAIN ─────────────────────────────────────────────── */}
      <main className="flex-1">
        <AnimatePresence mode="wait">

          {/* HOME */}
          {appState === "home" && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

              {/* Hero — editorial split */}
              <div className="grid md:grid-cols-[1fr_380px] min-h-[70vh] border-b border-black/10">

                {/* Left — huge type */}
                <div className="p-8 md:p-14 flex flex-col justify-between border-r border-black/10">
                  <div>
                    {/* Issue tag */}
                    <div className="inline-flex items-center gap-3 mb-10">
                      <div className="w-2 h-2 rounded-full bg-[#e8301a]" />
                      <span className="font-mono text-[10px] tracking-[0.3em] text-[#9a9490]">
                        {t("МОНГОЛЫН ХАМГИЙН ХӨГЖИЛТЭЙ PHOTO BOOTH", "MONGOLIA'S FUNNIEST PHOTOBOOTH")}
                      </span>
                    </div>

                    {/* Giant headline */}
                    <h1 className="font-display font-900 text-[clamp(64px,12vw,160px)] leading-[0.88] tracking-tighter text-[#0a0a0a]">
                      SKETCH<br />
                      <span className="relative inline-block">
                        BOOTH
                        {/* Red underline slash */}
                        <span className="absolute -bottom-2 left-0 right-0 h-[6px] bg-[#e8301a]" />
                      </span>
                    </h1>

                    <p className="font-sans font-300 text-lg text-[#9a9490] mt-10 max-w-sm leading-relaxed">
                      {t(
                        "4 зураг авч, filter, frame нэмж, найздаа share хий. Хамгийн хурдан, хамгийн хөгжилтэй.",
                        "Capture 4 photos, add filters & frames, share instantly. Fast, funny, free."
                      )}
                    </p>
                  </div>

                  {/* Bottom — features row */}
                  <div className="flex flex-wrap gap-x-8 gap-y-3 mt-12">
                    {[
                      t("↳ 4 автомат зураг", "↳ 4 auto captures"),
                      t("↳ 6 filter", "↳ 6 filters"),
                      t("↳ 20 frame загвар", "↳ 20 frames"),
                      t("↳ PNG татах", "↳ PNG download"),
                      t("↳ Стикер overlay", "↳ Sticker overlay"),
                      t("↳ Үнэгүй", "↳ Free"),
                    ].map(f => (
                      <span key={f} className="font-mono text-[11px] text-[#9a9490]">{f}</span>
                    ))}
                  </div>
                </div>

                {/* Right — CTA panel */}
                <div className="flex flex-col">

                  {/* Big camera emoji area */}
                  <div className="flex-1 bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden">
                    {/* Diagonal stripes */}
                    <div className="absolute inset-0 opacity-[0.04]"
                      style={{ backgroundImage: "repeating-linear-gradient(-45deg, #f9f7f4 0px, #f9f7f4 1px, transparent 1px, transparent 12px)" }}
                    />
                    <motion.div
                      animate={{ scale: [1, 1.06, 1], rotate: [0, 2, -2, 0] }}
                      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                      className="text-[100px] relative z-10 select-none"
                    >
                      📸
                    </motion.div>
                    {/* REC dot */}
                    <div className="absolute top-5 right-5 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#e8301a] animate-pulse" />
                      <span className="font-mono text-[9px] text-white/40 tracking-widest">REC</span>
                    </div>
                    {/* Frame counter */}
                    <div className="absolute bottom-5 left-5">
                      <span className="font-display text-4xl text-white/10 font-900">04</span>
                    </div>
                  </div>

                  {/* CTA button — full width */}
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setAppState("camera")}
                    className="relative overflow-hidden bg-[#e8301a] text-white font-display font-700 text-3xl tracking-[0.1em] py-8 text-center hover:bg-[#0a0a0a] transition-colors duration-300 group"
                  >
                    <motion.div
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12"
                    />
                    {t("ЗУРАГ АВ", "SHOOT NOW")}
                    <span className="ml-3 group-hover:translate-x-1 inline-block transition-transform">→</span>
                  </motion.button>

                  {/* Specs strip */}
                  <div className="bg-[#f0ece4] border-t border-black/10 grid grid-cols-2 divide-x divide-black/10">
                    {[
                      { label: "FRAMES", value: "4×" },
                      { label: "STYLES", value: "20" },
                    ].map(s => (
                      <div key={s.label} className="px-5 py-3">
                        <div className="font-mono text-[9px] text-[#9a9490] tracking-widest">{s.label}</div>
                        <div className="font-display text-2xl font-700 text-[#0a0a0a]">{s.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom strip — rotated label + stats */}
              <div className="grid grid-cols-3 md:grid-cols-6 divide-x divide-black/10 border-b border-black/10">
                {[
                  { n: "500+",   label: t("Арга хэмжээ", "Events") },
                  { n: "50K+",   label: t("Хэвлэгдсэн зураг", "Prints") },
                  { n: "98%",    label: t("Сэтгэл ханамж", "Satisfaction") },
                  { n: "3s",     label: t("Countdown", "Countdown") },
                  { n: "FREE",   label: t("Үнэгүй", "Always free") },
                  { n: "PNG",    label: t("Формат", "Format") },
                ].map(s => (
                  <div key={s.n} className="px-5 py-4 flex flex-col gap-0.5">
                    <div className="font-display text-2xl font-700 text-[#0a0a0a]">{s.n}</div>
                    <div className="font-mono text-[9px] text-[#9a9490] tracking-widest">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* CAMERA */}
          {appState === "camera" && (
            <motion.div key="camera" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center px-4 py-10 min-h-[80vh] justify-center"
            >
              {/* Section label */}
              <div className="w-full max-w-2xl mb-6 flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-[#e8301a] animate-pulse" />
                <span className="font-mono text-[10px] tracking-[0.3em] text-[#9a9490]">
                  {t("ЗУРАГ АВАХ / CAPTURE", "CAPTURE MODE")}
                </span>
                <div className="h-px flex-1 bg-black/10" />
              </div>
              <Camera lang={lang} onComplete={handlePhotosComplete} />
            </motion.div>
          )}

          {/* RESULT */}
          {appState === "result" && (
            <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center px-4 py-10 min-h-[80vh]"
            >
              <div className="w-full max-w-xl mb-6 flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-[#e8301a]" />
                <span className="font-mono text-[10px] tracking-[0.3em] text-[#9a9490]">
                  {t("ТАНЫ STRIP / YOUR STRIP", "YOUR STRIP")}
                </span>
                <div className="h-px flex-1 bg-black/10" />
              </div>
              <ResultScreen photos={capturedPhotos} filterCSS={capturedFilter} lang={lang} onRetake={handleRetake} />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className="border-t border-black/10 bg-[#0a0a0a]">
        <div className="flex items-center justify-between px-8 py-4">
          <div className="font-display text-sm font-700 text-white/20 tracking-tight">SKETCH BOOTH MN</div>
          <div className="font-mono text-[9px] text-white/25 tracking-widest">© 2025</div>
        </div>
      </footer>
    </div>
  );
}
