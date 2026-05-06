"use client";
import { motion } from "framer-motion";
import { FILTERS, FilterName } from "@/utils/applyFilter";
export default function Filters({ selected, onChange, lang }: { selected: FilterName; onChange: (id: FilterName) => void; lang: "mn"|"en" }) {
  return (
    <div>
      <p style={{ fontSize: 10, color: "#bbb", letterSpacing: "0.15em", marginBottom: 10 }}>ШҮҮЛТҮҮР</p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {FILTERS.map(f => (
          <motion.button key={f.id} whileTap={{ scale: 0.95 }} onClick={() => onChange(f.id)} style={{
            padding: "6px 14px", borderRadius: 100, fontSize: 12, cursor: "pointer",
            border: selected === f.id ? "1.5px solid #1a1a1a" : "1.5px solid #e5e5e3",
            background: selected === f.id ? "#1a1a1a" : "white",
            color: selected === f.id ? "white" : "#666",
            letterSpacing: "0.03em", transition: "all 0.15s",
          }}>
            {f.emoji} {lang === "mn" ? f.label_mn : f.label_en}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
