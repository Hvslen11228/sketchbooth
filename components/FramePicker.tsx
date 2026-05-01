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
      <p className="font-mono text-[9px] text-[#6b6860] tracking-widest mb-3 text-center">
        {lang === "mn" ? "ХҮРЭЭНИЙ ЗАГВАР / FRAME" : "FRAME STYLE"}
      </p>
      <div className="flex gap-3 overflow-x-auto pb-2 px-1" style={{ scrollbarWidth: "none" }}>
        {FRAMES.map((frame) => {
          const isSelected = selected === frame.id;
          return (
            <motion.button
              key={frame.id}
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.06, y: -2 }}
              onClick={() => onChange(frame.id)}
              className="flex-shrink-0 flex flex-col items-center gap-1.5 group"
            >
              <div
                className="relative w-12 h-16 overflow-hidden transition-all duration-200"
                style={{
                  background: frame.previewCSS,
                  outline: isSelected ? `2px solid ${frame.accentColor}` : "1px solid #2a2a2a",
                  outlineOffset: isSelected ? "1px" : "0px",
                }}
              >
                <div className="absolute inset-0 flex flex-col justify-center gap-1 px-1 py-1.5">
                  {[0,1,2,3].map((i) => (
                    <div key={i} className="flex-1 rounded-none"
                      style={{
                        background: frame.id === "minimal" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.10)",
                        border: `1px solid ${frame.borderColor === "rainbow" ? ["#ff2d78","#facc15","#06b6d4","#a855f7"][i] : frame.borderColor}`,
                      }}
                    />
                  ))}
                </div>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1 right-1 w-3 h-3 flex items-center justify-center"
                    style={{ background: frame.accentColor }}
                  >
                    <svg width="7" height="7" viewBox="0 0 7 7">
                      <path d="M1 3.5l2 2 3-3" stroke="#000" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                    </svg>
                  </motion.div>
                )}
              </div>
              <span className={`font-mono text-[9px] tracking-wide transition-colors whitespace-nowrap ${isSelected ? "text-[#c8913a]" : "text-[#6b6860]/60 group-hover:text-[#6b6860]"}`}>
                {frame.emoji}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
