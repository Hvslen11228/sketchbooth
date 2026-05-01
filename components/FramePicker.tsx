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
      <p className="text-white/50 text-xs text-center mb-3 tracking-widest uppercase">
        {lang === "mn" ? "Хүрээ сонгох" : "Choose Frame"}
      </p>

      <div className="flex gap-3 overflow-x-auto pb-2 px-1 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none" }}>
        {FRAMES.map((frame) => {
          const isSelected = selected === frame.id;
          return (
            <motion.button
              key={frame.id}
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.06, y: -2 }}
              onClick={() => onChange(frame.id)}
              className="flex-shrink-0 snap-center flex flex-col items-center gap-1.5 group"
            >
              {/* Frame preview thumbnail */}
              <div
                className={`relative w-14 h-20 rounded-xl overflow-hidden transition-all duration-200 ${
                  isSelected
                    ? "ring-2 ring-offset-2 ring-offset-black scale-105"
                    : "ring-1 ring-white/10 hover:ring-white/30"
                }`}
                style={{
                  background: frame.previewCSS,
                  boxShadow: isSelected
                    ? `0 0 16px ${frame.accentColor}80, 0 0 32px ${frame.accentColor}40`
                    : undefined,
                }}
              >
                {/* Mini strip lines to simulate photos */}
                <div className="absolute inset-0 flex flex-col justify-center gap-1 px-1.5 py-2">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="rounded-sm flex-1"
                      style={{
                        background: frame.id === "minimal"
                          ? "rgba(0,0,0,0.08)"
                          : "rgba(255,255,255,0.12)",
                        border: `1px solid ${frame.borderColor === "rainbow"
                          ? ["#ff2d78","#facc15","#06b6d4","#a855f7"][i]
                          : frame.borderColor}`,
                      }}
                    />
                  ))}
                </div>

                {/* Selected checkmark */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1 right-1 w-4 h-4 rounded-full bg-white flex items-center justify-center"
                    style={{ boxShadow: `0 0 6px ${frame.accentColor}` }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10">
                      <path d="M2 5l2.5 2.5L8 3" stroke={frame.accentColor} strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    </svg>
                  </motion.div>
                )}

                {/* Pattern overlay hint */}
                {frame.pattern === "stars" && (
                  <div className="absolute inset-0 opacity-20 text-[8px] leading-3 overflow-hidden select-none pointer-events-none" style={{ color: frame.accentColor }}>
                    {"✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ".repeat(3)}
                  </div>
                )}
                {frame.pattern === "hearts" && (
                  <div className="absolute inset-0 opacity-15 text-[8px] leading-3 overflow-hidden select-none pointer-events-none" style={{ color: frame.accentColor }}>
                    {"♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ".repeat(3)}
                  </div>
                )}
              </div>

              {/* Label */}
              <span
                className={`text-[10px] font-bold transition-colors whitespace-nowrap ${
                  isSelected ? "text-white" : "text-white/40 group-hover:text-white/70"
                }`}
              >
                {frame.emoji} {lang === "mn" ? frame.label_mn : frame.label_en}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
