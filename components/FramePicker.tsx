"use client";
import { motion } from "framer-motion";
import { FRAMES, FrameId } from "@/utils/frames";

const MN_FRAME_IDS = ["mongol_uguljee","mongol_els","mongol_flag","mongol_naran","mongol_nomad"];

export default function FramePicker({ selected, onChange, lang }: { selected: FrameId; onChange: (id: FrameId) => void; lang: "mn"|"en" }) {
  const mnFrames = FRAMES.filter(f => MN_FRAME_IDS.includes(f.id));
  const otherFrames = FRAMES.filter(f => !MN_FRAME_IDS.includes(f.id));

  const renderFrame = (frame: typeof FRAMES[0]) => {
    const sel = selected === frame.id;
    return (
      <motion.button key={frame.id} whileTap={{ scale: 0.92 }} whileHover={{ y: -2 }}
        onClick={() => onChange(frame.id)}
        style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 5, background: "none", border: "none", cursor: "pointer" }}
        title={lang === "mn" ? frame.label_mn : frame.label_en}
      >
        <div style={{
          width: 44, height: 62, borderRadius: 8,
          background: frame.previewCSS,
          outline: sel ? `2.5px solid ${frame.accentColor}` : "1.5px solid #e5e5e3",
          outlineOffset: sel ? 2 : 0,
          overflow: "hidden",
          display: "flex", flexDirection: "column", justifyContent: "center", gap: 2, padding: 4,
          transition: "outline 0.15s",
        }}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{
              flex: 1, borderRadius: 3,
              border: `1px solid ${frame.borderColor === "rainbow" ? ["#ff2d78","#facc15","#06b6d4","#a855f7"][i] : frame.borderColor}`,
              background: "rgba(255,255,255,0.1)",
            }} />
          ))}
        </div>
        <span style={{ fontSize: 9, color: sel ? "#1a1a1a" : "#bbb", letterSpacing: "0.02em", maxWidth: 44, textAlign: "center", lineHeight: 1.2 }}>
          {frame.emoji}
        </span>
      </motion.button>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Mongolian frames — featured section */}
      <div>
        <p style={{ fontSize: 10, color: "#c8781a", letterSpacing: "0.15em", marginBottom: 8, fontWeight: 500 }}>
          🇲🇳 МОНГОЛ ДҮРСТ FRAME
        </p>
        <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4, scrollbarWidth: "none" }}>
          {mnFrames.map(renderFrame)}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "#f0f0ee" }} />

      {/* Other frames */}
      <div>
        <p style={{ fontSize: 10, color: "#bbb", letterSpacing: "0.15em", marginBottom: 8 }}>
          {lang === "mn" ? "БУСАД FRAME" : "OTHER FRAMES"}
        </p>
        <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4, scrollbarWidth: "none" }}>
          {otherFrames.map(renderFrame)}
        </div>
      </div>
    </div>
  );
}
