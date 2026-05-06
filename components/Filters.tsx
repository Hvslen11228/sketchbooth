"use client";
import { motion } from "framer-motion";
import { FILTERS, FilterName } from "@/utils/applyFilter";

interface FiltersProps {
  selected: FilterName;
  onChange: (id: FilterName) => void;
  lang: "mn" | "en";
}

export default function Filters({ selected, onChange, lang }: FiltersProps) {
  return (
    <div className="w-full">
      <p className="font-mono text-[9px] text-[#8a8070] tracking-widest mb-3 text-center">
        {lang === "mn" ? "ШҮҮЛТҮҮР / FILTER" : "FILTER"}
      </p>
      <div className="flex gap-2 overflow-x-auto pb-1 justify-center flex-wrap" style={{ scrollbarWidth: "none" }}>
        {FILTERS.map((f) => (
          <motion.button
            key={f.id}
            whileTap={{ scale: 0.92 }}
            onClick={() => onChange(f.id)}
            className={`flex-shrink-0 px-3 py-2 text-xs font-mono tracking-wider transition-all border ${
              selected === f.id
                ? "bg-[#d4a843] text-[#0d0d0d] border-[#d4a843]"
                : "bg-[#111] text-[#8a8070] border-[#2a2a2a] hover:border-[#8a8070] hover:text-[#f5f0e8]"
            }`}
          >
            {f.emoji} {lang === "mn" ? f.label_mn : f.label_en}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
