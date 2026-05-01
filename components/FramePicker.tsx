"use client";
import { motion } from "framer-motion";
import { FRAMES, FrameId } from "@/utils/frames";

interface FramePickerProps {
  selected: FrameId;
  onChange: (id: FrameId) => void;
  lang: "mn" | "en";
}

export default function FramePicker({ selected, onChange, lang }: FramePickerProps) {
  return (
    <div className="w-full">
      <p className="font-mono text-[9px] text-[#9a9490] tracking-[0.25em] mb-3">
        {lang === "mn" ? "ХҮРЭЭНИЙ ЗАГВАР / FRAME" : "FRAME STYLE"}
      </p>
      <div className="flex gap-2.5 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
        {FRAMES.map((frame) => {
          const isSelected = selected === frame.id;
          return (
            <motion.button
              key={frame.id}
              whileTap={{ scale: 0.9 }}
              whileHover={{ y: -3 }}
              onClick={() => onChange(frame.id)}
              className="flex-shrink-0 flex flex-col items-center gap-1.5 group"
            >
              <div
                className="relative w-11 h-16 transition-all duration-150"
                style={{
                  background: frame.previewCSS,
                  outline: isSelected ? `2px solid ${frame.accentColor}` : "1.5px solid rgba(10,10,10,0.12)",
                  outlineOffset: isSelected ? "2px" : "0",
                }}
              >
                <div className="absolute inset-0 flex flex-col justify-center gap-0.5 px-1 py-1">
                  {[0,1,2,3].map((i) => (
                    <div key={i} className="flex-1"
                      style={{
                        border: `1px solid ${frame.borderColor === "rainbow" ? ["#ff2d78","#facc15","#06b6d4","#a855f7"][i] : frame.borderColor}`,
                        background: "rgba(255,255,255,0.08)",
                      }}
                    />
                  ))}
                </div>
                {isSelected && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-3.5 h-3.5 flex items-center justify-center"
                    style={{ background: frame.accentColor }}
                  >
                    <svg width="7" height="7" viewBox="0 0 7 7">
                      <path d="M1 3.5l2 2 3-3" stroke="#fff" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                    </svg>
                  </motion.div>
                )}
              </div>
              <span className={`font-mono text-[9px] transition-colors ${isSelected ? "text-[#0a0a0a]" : "text-[#9a9490] group-hover:text-[#0a0a0a]"}`}>
                {frame.emoji}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
