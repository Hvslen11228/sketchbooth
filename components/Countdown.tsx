"use client";
import { motion, AnimatePresence } from "framer-motion";

interface CountdownProps {
  count: number | null;
  photoIndex: number;
  total: number;
  lang: "mn" | "en";
}

export default function Countdown({ count, photoIndex, total, lang }: CountdownProps) {
  if (count === null) return null;

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none">
      {/* Pulsing ring backdrop */}
      <div className="absolute w-48 h-48 rounded-full border-4 border-pink-500/50 pulse-ring" />

      {/* Count number */}
      <AnimatePresence mode="wait">
        <motion.div
          key={count}
          initial={{ scale: 2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
          className="text-9xl font-black text-glow-pink select-none"
          style={{ color: "#ff2d78", fontFamily: "'Nunito', sans-serif" }}
        >
          {count}
        </motion.div>
      </AnimatePresence>

      {/* Progress label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 px-4 py-1.5 bg-black/60 rounded-full text-white/80 text-sm font-bold backdrop-blur"
      >
        {lang === "mn" ? `${photoIndex + 1}/${total} зураг` : `Photo ${photoIndex + 1}/${total}`}
      </motion.div>
    </div>
  );
}
