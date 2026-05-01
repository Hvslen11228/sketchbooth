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
      <p className="font-mono text-[9px] text-[#9a9490] tracking-[0.25em] mb-3">
        {lang === "mn" ? "ШҮҮЛТҮҮР / FILTER" : "FILTER"}
      </p>
      <div className="flex gap-2 flex-wrap">
        {FILTERS.map((f) => (
          <motion.button
            key={f.id}
            whileTap={{ scale: 0.94 }}
            onClick={() => onChange(f.id)}
            className={`px-3 py-2 font-mono text-[10px] tracking-wider transition-all border ${
              selected === f.id
                ? "bg-[#0a0a0a] text-[#f9f7f4] border-[#0a0a0a]"
                : "bg-[#f0ece4] text-[#9a9490] border-black/10 hover:border-black/30 hover:text-[#0a0a0a]"
            }`}
          >
            {f.emoji} {lang === "mn" ? f.label_mn : f.label_en}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
