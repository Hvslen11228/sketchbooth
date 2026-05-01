"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Camera from "@/components/Camera";
import ResultScreen from "@/components/ResultScreen";

type AppState = "home" | "camera" | "result";

function FilmRail() {
  return (
    <div className="flex items-center gap-2.5">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="sprocket" />
      ))}
    </div>
  );
}

export default function Home() {
  const [appState, setAppState] = useState<AppState>("home");
  const [lang, setLang] = useState<"mn" | "en">("mn");
  const [photos, setPhotos] = useState<string[]>([]);
  const [filter, setFilter] = useState<string>("none");

  const t = (mn: string, en: string) => lang === "mn" ? mn : en;

  const onComplete = useCallback((p: string[], f: string) => {
    setPhotos(p); setFilter(f); setAppState("result");
  }, []);

  const onRetake = useCallback(() => {
    setPhotos([]); setFilter("none"); setAppState("camera");
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* ── NAVBAR ─────────────────────────────────────────────
          Film rail top → Logo center → Nav links → Lang toggle
      ─────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 bg-white border-b border-[#e8e5e0]">

        {/* Top film rail */}
        <div className="bg-[#f7f5f2] border-b border-[#e8e5e0] px-6 py-2 flex items-center justify-between">
          <FilmRail />
          <span className="font-mono text-[9px] text-[#c8c4be] tracking-[0.35em]">SKETCH BOOTH MN</span>
          <FilmRail />
        </div>

        {/* Main nav — 3 column: links | logo | lang+cta */}
        <div className="grid grid-cols-3 items-center px-6 py-0 h-16">

          {/* Left — nav links */}
          <nav className="flex items-center gap-0">
            {[
              { href: "/faq",     mn: "АСУУЛТ",  en: "FAQ" },
              { href: "/contact", mn: "ХОЛБОО",  en: "CONTACT" },
              { href: "/privacy", mn: "НУУЦЛАЛ", en: "PRIVACY" },
            ].map((l, i) => (
              <span key={l.href} className="flex items-center">
                <Link
                  href={l.href}
                  className="font-mono text-[10px] tracking-[0.18em] text-[#9a9490] hover:text-[#111110] transition-colors px-3 py-1.5 hover:bg-[#f7f5f2] rounded-sm"
                >
                  {lang === "mn" ? l.mn : l.en}
                </Link>
                {i < 2 && <span className="text-[#e8e5e0] text-xs select-none">·</span>}
              </span>
            ))}
          </nav>

          {/* Center — logo */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setAppState("home")}
            className="flex flex-col items-center justify-center"
          >
            <div className="font-display leading-none text-center">
              {/* Big logo — 2 lines */}
              <div className="text-[32px] md:text-[40px] text-[#111110] leading-[0.9]">SKETCH</div>
              <div className="text-[32px] md:text-[40px] text-[#c8913a] leading-[0.9]">BOOTH</div>
            </div>
          </motion.button>

          {/* Right — lang + start */}
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => setLang(l => l === "mn" ? "en" : "mn")}
              className="font-mono text-[10px] tracking-widest text-[#9a9490] hover:text-[#111110] border border-[#e8e5e0] hover:border-[#111110] px-3 py-1.5 transition-all rounded-sm"
            >
              {lang === "mn" ? "EN" : "МН"}
            </button>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => setAppState("camera")}
              className="font-mono text-[10px] tracking-[0.18em] bg-[#111110] text-white px-4 py-2 hover:bg-[#c8913a] transition-colors rounded-sm"
            >
              {t("ЭХЛЭХ ↗", "START ↗")}
            </motion.button>
          </div>
        </div>
      </header>

      {/* ── MAIN ─────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">

          {/* HOME */}
          {appState === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1"
            >
              {/* Hero — split grid */}
              <div className="grid md:grid-cols-[1fr_360px] min-h-[calc(100vh-120px)] border-b border-[#e8e5e0]">

                {/* Left — text */}
                <div className="p-10 md:p-16 flex flex-col justify-between border-r border-[#e8e5e0]">
                  <div>
                    {/* Tag */}
                    <div className="inline-flex items-center gap-2.5 mb-10 border border-[#e8e5e0] px-3 py-1.5 rounded-full">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#c8913a] animate-pulse" />
                      <span className="font-mono text-[9px] text-[#9a9490] tracking-[0.25em]">
                        ISO 400 · FREE · MONGOLIA 🇲🇳
                      </span>
                    </div>

                    {/* Giant headline */}
                    <h1 className="font-display leading-[0.88] tracking-wide text-[#111110]"
                        style={{ fontSize: "clamp(72px, 14vw, 180px)" }}>
                      SKETCH<br />
                      <span className="text-[#c8913a]">BOOTH</span>
                    </h1>

                    <p className="font-sans font-light text-lg text-[#9a9490] mt-8 max-w-sm leading-relaxed">
                      {t(
                        "4 зураг авч, filter, frame нэмж, найздаа share хий.",
                        "Capture 4 photos, add filters & frames, share instantly."
                      )}
                    </p>

                    {/* Feature list */}
                    <div className="mt-10 space-y-3">
                      {[
                        { n: "01", txt: t("3 секундын countdown · 4 автомат зураг", "3s countdown · 4 auto captures") },
                        { n: "02", txt: t("6 filter · 20 frame загвар", "6 filters · 20 frame styles") },
                        { n: "03", txt: t("Emoji стикер · PNG татах · Share", "Emoji stickers · PNG download · Share") },
                      ].map(f => (
                        <div key={f.n} className="flex items-center gap-4 group">
                          <span className="font-mono text-[10px] text-[#c8913a]/60 w-6">{f.n}</span>
                          <div className="h-px w-5 bg-[#e8e5e0] group-hover:w-8 group-hover:bg-[#c8913a]/40 transition-all duration-300" />
                          <span className="font-mono text-[11px] text-[#9a9490] group-hover:text-[#111110] transition-colors">{f.txt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Exposure bar */}
                  <div className="mt-12">
                    <p className="font-mono text-[9px] text-[#c8c4be] tracking-widest mb-2">EXPOSURE</p>
                    <div className="flex gap-px h-4">
                      {Array.from({ length: 28 }).map((_, i) => (
                        <div key={i} className="flex-1 rounded-[1px]"
                          style={{ background: `rgba(200,145,58,${(i / 28) * 0.85})` }} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right — dark panel */}
                <div className="flex flex-col">
                  {/* Camera visual */}
                  <div className="flex-1 bg-[#111110] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.04]"
                      style={{ backgroundImage: "repeating-linear-gradient(-45deg,#fff 0,#fff 1px,transparent 1px,transparent 14px)" }} />
                    <motion.div
                      animate={{ scale: [1, 1.06, 1], rotate: [0, 2, -2, 0] }}
                      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                      className="text-[90px] select-none relative z-10"
                    >📸</motion.div>
                    {/* REC */}
                    <div className="absolute top-5 right-5 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="font-mono text-[9px] text-white/30 tracking-widest">REC</span>
                    </div>
                    {/* Ghost counter */}
                    <div className="absolute bottom-4 left-5">
                      <span className="font-display text-[56px] text-white/[0.06] leading-none">04</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setAppState("camera")}
                    className="relative overflow-hidden bg-[#c8913a] text-white font-display text-4xl tracking-wider py-8 text-center hover:bg-[#111110] transition-colors duration-300 group"
                  >
                    <motion.div
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    />
                    {t("ЭХЛЭХ", "START")}
                    <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">→</span>
                  </motion.button>

                  {/* Stats */}
                  <div className="grid grid-cols-2 divide-x divide-[#e8e5e0] border-t border-[#e8e5e0] bg-[#f7f5f2]">
                    {[{ v: "20", l: "FRAMES" }, { v: "4×", l: "SHOTS" }].map(s => (
                      <div key={s.l} className="px-6 py-4">
                        <div className="font-display text-3xl text-[#111110] leading-none">{s.v}</div>
                        <div className="font-mono text-[9px] text-[#9a9490] tracking-widest mt-1">{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* CAMERA */}
          {appState === "camera" && (
            <motion.div key="camera" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center px-4 py-10"
            >
              <div className="w-full max-w-2xl mb-5 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#c8913a] animate-pulse" />
                <span className="font-mono text-[9px] tracking-[0.3em] text-[#9a9490]">{t("ЗУРАГ АВАХ", "CAPTURE MODE")}</span>
                <div className="h-px flex-1 bg-[#e8e5e0]" />
              </div>
              <Camera lang={lang} onComplete={onComplete} />
            </motion.div>
          )}

          {/* RESULT */}
          {appState === "result" && (
            <motion.div key="result" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center px-4 py-10"
            >
              <div className="w-full max-w-xl mb-5 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#c8913a]" />
                <span className="font-mono text-[9px] tracking-[0.3em] text-[#9a9490]">{t("ТАНЫ STRIP", "YOUR STRIP")}</span>
                <div className="h-px flex-1 bg-[#e8e5e0]" />
              </div>
              <ResultScreen photos={photos} filterCSS={filter} lang={lang} onRetake={onRetake} />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* ── BOTTOM FILM RAIL ─────────────────────────────────── */}
      <footer className="border-t border-[#e8e5e0] bg-[#f7f5f2] px-6 py-2 flex items-center justify-between">
        <FilmRail />
        <span className="font-mono text-[9px] text-[#c8c4be] tracking-[0.3em]">© 2025 SKETCH BOOTH MN</span>
        <FilmRail />
      </footer>
    </div>
  );
}
