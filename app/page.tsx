"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Camera from "@/components/Camera";
import ResultScreen from "@/components/ResultScreen";
import AdBanner from "@/components/AdBanner";

type Page = "home" | "camera" | "result";

export default function Home() {
  const [page, setPage] = useState<Page>("home");
  const [photos, setPhotos] = useState<string[]>([]);
  const [filter, setFilter] = useState("none");

  const onComplete = useCallback((p: string[], f: string) => {
    setPhotos(p); setFilter(f); setPage("result");
  }, []);
  const onRetake = useCallback(() => {
    setPhotos([]); setFilter("none"); setPage("camera");
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#fafaf9", display: "flex", flexDirection: "column", alignItems: "center" }}>

      {/* ── HEADER ─────────────────────────────────────── */}
      <header style={{
        width: "100%",
        borderBottom: "1px solid #e5e5e3",
        position: "sticky", top: 0, zIndex: 50,
        background: "#fafaf9",
      }}>
        <div style={{
          maxWidth: 560,
          margin: "0 auto",
          padding: "0 24px",
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          {/* Nav left */}
          <nav style={{ display: "flex", gap: 20 }}>
            {[{ href: "/faq", label: "FAQ" }, { href: "/contact", label: "Холбоо" }].map(l => (
              <Link key={l.href} href={l.href} style={{
                fontSize: 11, letterSpacing: "0.06em",
                color: "#999", textDecoration: "none",
                transition: "color 0.15s",
              }}
                onMouseEnter={e => (e.currentTarget.style.color = "#1a1a1a")}
                onMouseLeave={e => (e.currentTarget.style.color = "#999")}
              >{l.label}</Link>
            ))}
          </nav>

          {/* Logo — center */}
          <button onClick={() => setPage("home")} style={{
            position: "absolute", left: "50%", transform: "translateX(-50%)",
            background: "none", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 1,
          }}>
            <span style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 20, fontStyle: "italic",
              color: "#1a1a1a", letterSpacing: "0.02em", lineHeight: 1,
            }}>Sketch Booth</span>
            <span style={{ fontSize: 9, letterSpacing: "0.2em", color: "#bbb", lineHeight: 1 }}>MN</span>
          </button>

          {/* Nav right */}
          <Link href="/privacy" style={{
            fontSize: 11, letterSpacing: "0.06em",
            color: "#999", textDecoration: "none", transition: "color 0.15s",
          }}
            onMouseEnter={e => (e.currentTarget.style.color = "#1a1a1a")}
            onMouseLeave={e => (e.currentTarget.style.color = "#999")}
          >Нууцлал</Link>
        </div>
      </header>

      {/* ── CONTENT ────────────────────────────────────── */}
      <main style={{ width: "100%", maxWidth: 560, padding: "0 24px", flex: 1 }}>
        <AnimatePresence mode="wait">

          {/* HOME */}
          {page === "home" && (
            <motion.div key="home"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 32, paddingTop: 64, paddingBottom: 64 }}
            >
              {/* Hero text */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 64 }}>📸</span>
                <h1 style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: 42, fontStyle: "italic",
                  color: "#1a1a1a", lineHeight: 1.1, fontWeight: 400,
                }}>
                  Зурагаа ав,<br />share хий.
                </h1>
                <p style={{ fontSize: 13, color: "#999", letterSpacing: "0.04em", lineHeight: 1.6, maxWidth: 300 }}>
                  4 зураг автоматаар авч, filter, frame нэмж,<br />найздаа хуваалцаарай.
                </p>
              </div>

              {/* Feature row */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
                {["📸 4 зураг", "🎨 6 filter", "🖼️ 20 frame", "🎭 Стикер", "✨ Үнэгүй"].map(f => (
                  <span key={f} style={{
                    fontSize: 11, color: "#666", letterSpacing: "0.04em",
                    border: "1px solid #e5e5e3", borderRadius: 100,
                    padding: "4px 12px", background: "white",
                  }}>{f}</span>
                ))}
              </div>

              {/* Ad — home page, below features */}
              <AdBanner slot="XXXXXXXXXX" format="horizontal" />

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={() => setPage("camera")}
                style={{
                  background: "#1a1a1a", color: "#fafaf9",
                  border: "none", borderRadius: 14,
                  padding: "16px 48px", fontSize: 14,
                  letterSpacing: "0.08em", cursor: "pointer",
                  fontFamily: "'Geist Mono', monospace",
                  width: "100%", maxWidth: 280,
                }}
              >
                Эхлэх →
              </motion.button>

              <span style={{ fontSize: 11, color: "#ccc", letterSpacing: "0.06em" }}>
                Камерын зөвшөөрөл шаардлагатай
              </span>
            </motion.div>
          )}

          {/* CAMERA */}
          {page === "camera" && (
            <motion.div key="camera"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              style={{ paddingTop: 32, paddingBottom: 32 }}
            >
              <button onClick={() => setPage("home")} style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: 12, color: "#999", letterSpacing: "0.06em",
                marginBottom: 24, display: "flex", alignItems: "center", gap: 6,
              }}>← Буцах</button>
              <Camera lang="mn" onComplete={onComplete} />
            </motion.div>
          )}

          {/* RESULT */}
          {page === "result" && (
            <motion.div key="result"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              style={{ paddingTop: 32, paddingBottom: 32 }}
            >
              {/* Ad — result screen */}
              <AdBanner slot="YYYYYYYYYY" format="horizontal" className="mb-5" />
              <ResultScreen photos={photos} filterCSS={filter} lang="mn" onRetake={onRetake} />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* ── FOOTER ─────────────────────────────────────── */}
      <footer style={{
        width: "100%",
        borderTop: "1px solid #e5e5e3",
        marginTop: "auto",
      }}>
        <div style={{
          maxWidth: 560, margin: "0 auto",
          padding: "24px 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <span style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 15, fontStyle: "italic", color: "#bbb",
          }}>Sketch Booth</span>

          <div style={{ display: "flex", gap: 20 }}>
            {[
              { href: "/faq", label: "FAQ" },
              { href: "/contact", label: "Холбоо" },
              { href: "/privacy", label: "Нууцлал" },
            ].map(l => (
              <Link key={l.href} href={l.href} style={{
                fontSize: 11, color: "#bbb", textDecoration: "none",
                letterSpacing: "0.06em", transition: "color 0.15s",
              }}
                onMouseEnter={e => (e.currentTarget.style.color = "#1a1a1a")}
                onMouseLeave={e => (e.currentTarget.style.color = "#bbb")}
              >{l.label}</Link>
            ))}
          </div>

          <span style={{ fontSize: 11, color: "#ddd", letterSpacing: "0.06em" }}>© 2025</span>
        </div>
      </footer>

    </div>
  );
}
