"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PageShell({ title, emoji, children }: { title: string; emoji: string; children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "#fafaf9", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Header */}
      <header style={{ width: "100%", borderBottom: "1px solid #e5e5e3", position: "sticky", top: 0, zIndex: 50, background: "#fafaf9" }}>
        <div style={{ maxWidth: 560, margin: "0 auto", padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#999", textDecoration: "none", letterSpacing: "0.06em" }}>
            <ArrowLeft size={13} /> Буцах
          </Link>
          <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 18, fontStyle: "italic", color: "#1a1a1a" }}>Sketch Booth</span>
          <div style={{ width: 48 }} />
        </div>
      </header>

      {/* Content */}
      <main style={{ width: "100%", maxWidth: 560, padding: "48px 24px 64px", flex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ marginBottom: 36 }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>{emoji}</div>
            <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 32, fontStyle: "italic", color: "#1a1a1a", fontWeight: 400 }}>{title}</h1>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>{children}</div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer style={{ width: "100%", borderTop: "1px solid #e5e5e3" }}>
        <div style={{ maxWidth: 560, margin: "0 auto", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 14, fontStyle: "italic", color: "#bbb" }}>Sketch Booth</span>
          <span style={{ fontSize: 11, color: "#ddd", letterSpacing: "0.06em" }}>© 2025</span>
        </div>
      </footer>
    </div>
  );
}
