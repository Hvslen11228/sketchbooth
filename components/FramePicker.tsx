"use client";
import { motion } from "framer-motion";
import { FRAMES, FrameId } from "@/utils/frames";

export default function FramePicker({ selected, onChange, lang }: { selected: FrameId; onChange: (id: FrameId) => void; lang: "mn"|"en" }) {
  return (
    <div>
      <p className="text-xs text-gray-400 mb-3">{lang === "mn" ? "Хүрээ сонгох" : "Choose frame"}</p>
      <div className="flex gap-2.5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {FRAMES.map(frame => {
          const sel = selected === frame.id;
          return (
            <motion.button key={frame.id} whileTap={{ scale: 0.9 }} whileHover={{ y: -2 }}
              onClick={() => onChange(frame.id)}
              className="flex-shrink-0 flex flex-col items-center gap-1"
            >
              <div className="w-11 h-16 rounded-lg overflow-hidden"
                style={{
                  background: frame.previewCSS,
                  outline: sel ? `2.5px solid ${frame.accentColor}` : "1.5px solid #e5e7eb",
                  outlineOffset: sel ? "1px" : "0",
                }}
              >
                <div className="w-full h-full flex flex-col justify-center gap-0.5 p-1">
                  {[0,1,2,3].map(i => (
                    <div key={i} className="flex-1 rounded-sm"
                      style={{ border: `1px solid ${frame.borderColor === "rainbow" ? ["#ff2d78","#facc15","#06b6d4","#a855f7"][i] : frame.borderColor}`, background: "rgba(255,255,255,0.1)" }}
                    />
                  ))}
                </div>
              </div>
              <span className={`text-[10px] ${sel ? "text-gray-900 font-medium" : "text-gray-400"}`}>{frame.emoji}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
