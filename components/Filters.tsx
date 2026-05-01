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
      <p className="text-gray-400 text-xs text-center mb-2 tracking-widest uppercase">
        {lang === "mn" ? "Шүүлтүүр" : "Filter"}
      </p>
      <div className="flex gap-2 overflow-x-auto pb-1 justify-center flex-wrap">
        {FILTERS.map((f) => (
          <motion.button
            key={f.id}
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => onChange(f.id)}
            className={`flex-shrink-0 px-3 py-2 rounded-xl text-sm font-bold transition-all border-2 ${
              selected === f.id
                ? "bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-500/40"
                : "bg-white border-gray-200 text-gray-600 hover:border-purple-300"
            }`}
          >
            <span className="mr-1">{f.emoji}</span>
            {lang === "mn" ? f.label_mn : f.label_en}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
