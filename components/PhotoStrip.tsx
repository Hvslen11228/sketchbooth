"use client";
import { motion } from "framer-motion";

interface PhotoStripProps {
  photos: string[];
  stripUrl: string | null;
  lang: "mn" | "en";
}

export default function PhotoStrip({ photos, stripUrl, lang }: PhotoStripProps) {
  if (stripUrl) {
    // Show the generated strip
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="flex flex-col items-center gap-3"
      >
        <p className="text-white/50 text-xs tracking-widest uppercase">
          {lang === "mn" ? "Таны зургийн хэсэг" : "Your photostrip"}
        </p>
        <motion.img
          src={stripUrl}
          alt="Photostrip"
          className="rounded-2xl shadow-2xl shadow-purple-900/60 max-h-[70vh] object-contain border border-purple-500/30"
          whileHover={{ scale: 1.02 }}
        />
      </motion.div>
    );
  }

  // Show individual thumbnails while strip is generating
  return (
    <div className="grid grid-cols-2 gap-3">
      {photos.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1, type: "spring" }}
          className="relative aspect-video rounded-xl overflow-hidden border-2 border-white/20"
        >
          <img src={p} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" style={{ transform: "scaleX(-1)" }} />
          <div className="absolute top-2 left-2 w-7 h-7 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-black">
            {i + 1}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
