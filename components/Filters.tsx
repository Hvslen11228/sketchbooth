"use client";
import { motion } from "framer-motion";
import { FILTERS, FilterName } from "@/utils/applyFilter";

export default function Filters({ selected, onChange, lang }: { selected: FilterName; onChange: (id: FilterName) => void; lang: "mn"|"en" }) {
  return (
    <div>
      <p className="text-xs text-gray-400 mb-2">{lang === "mn" ? "Шүүлтүүр" : "Filter"}</p>
      <div className="flex gap-2 flex-wrap">
        {FILTERS.map(f => (
          <motion.button key={f.id} whileTap={{ scale: 0.95 }} onClick={() => onChange(f.id)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
              selected === f.id
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {f.emoji} {lang === "mn" ? f.label_mn : f.label_en}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
