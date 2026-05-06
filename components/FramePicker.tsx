"use client";
import { motion } from "framer-motion";
import { FRAMES, FrameId } from "@/utils/frames";
export default function FramePicker({ selected, onChange, lang }: { selected: FrameId; onChange: (id: FrameId) => void; lang: "mn"|"en" }) {
  return (
    <div>
      <p style={{ fontSize: 10, color: "#bbb", letterSpacing: "0.15em", marginBottom: 10 }}>ХҮРЭЭ</p>
      <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4, scrollbarWidth: "none" }}>
        {FRAMES.map(frame => {
          const sel = selected === frame.id;
          return (
            <motion.button key={frame.id} whileTap={{ scale: 0.92 }} whileHover={{ y: -2 }}
              onClick={() => onChange(frame.id)}
              style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer" }}
            >
              <div style={{
                width: 44, height: 62, borderRadius: 8,
                background: frame.previewCSS,
                outline: sel ? `2px solid ${frame.accentColor}` : "1.5px solid #e5e5e3",
                outlineOffset: sel ? 2 : 0,
                overflow: "hidden",
                display: "flex", flexDirection: "column", justifyContent: "center", gap: 2, padding: 4,
              }}>
                {[0,1,2,3].map(i => (
                  <div key={i} style={{
                    flex: 1, borderRadius: 3,
                    border: `1px solid ${frame.borderColor === "rainbow" ? ["#ff2d78","#facc15","#06b6d4","#a855f7"][i] : frame.borderColor}`,
                    background: "rgba(255,255,255,0.1)",
                  }} />
                ))}
              </div>
              <span style={{ fontSize: 10, color: sel ? "#1a1a1a" : "#bbb" }}>{frame.emoji}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
