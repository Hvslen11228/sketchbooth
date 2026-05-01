"use client";
import { motion } from "framer-motion";
import { SCENES, SceneId } from "@/utils/scenes";

interface ScenePickerProps {
  selected: SceneId;
  onChange: (id: SceneId) => void;
  lang: "mn" | "en";
}

export default function ScenePicker({ selected, onChange, lang }: ScenePickerProps) {
  return (
    <div className="w-full">
      <p className="text-white/40 text-[10px] text-center mb-3 tracking-widest uppercase">
        {lang === "mn" ? "Арын дэвсгэр" : "Background"}
      </p>
      <div
        className="flex gap-3 overflow-x-auto pb-2 px-1"
        style={{ scrollbarWidth: "none" }}
      >
        {SCENES.map((scene) => {
          const isSelected = selected === scene.id;
          return (
            <motion.button
              key={scene.id}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.08, y: -3 }}
              onClick={() => onChange(scene.id)}
              className="flex-shrink-0 flex flex-col items-center gap-1.5 group"
            >
              {/* Scene thumbnail */}
              <div
                className="relative w-14 h-14 rounded-2xl overflow-hidden transition-all duration-200"
                style={{
                  background: scene.bodyCSS,
                  boxShadow: isSelected
                    ? `0 0 0 2px white, 0 0 16px rgba(255,255,255,0.3)`
                    : `0 0 0 1px rgba(255,255,255,0.1)`,
                }}
              >
                {/* Overlay glow */}
                <div
                  className="absolute inset-0"
                  style={{ background: scene.overlayCSS, opacity: 1.5 }}
                />
                {/* Emoji centered */}
                <div className="absolute inset-0 flex items-center justify-center text-2xl">
                  {scene.emoji}
                </div>
                {/* Selected ring */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow"
                  >
                    <svg width="8" height="8" viewBox="0 0 8 8">
                      <path d="M1.5 4l2 2 3-3" stroke="#000" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    </svg>
                  </motion.div>
                )}
              </div>
              {/* Label */}
              <span
                className={`text-[10px] font-semibold whitespace-nowrap transition-colors ${
                  isSelected ? "text-white" : "text-white/35 group-hover:text-white/60"
                }`}
              >
                {lang === "mn" ? scene.label_mn : scene.label_en}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
