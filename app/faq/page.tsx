"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import PageShell from "@/components/PageShell";
const faqs = [
  { q: "Зургийг хаана хадгалдаг вэ?",  a: "Зөвхөн таны browser дотор. Сервер рүү явдаггүй." },
  { q: "Камер ажиллахгүй байна?",       a: "Browser Settings → Privacy → Camera-с зөвшөөрөл өгнө үү." },
  { q: "Хэдэн зураг авдаг вэ?",         a: "4 зураг. Тус бүр 3 секундын countdown-тай." },
  { q: "Frame гэж юу вэ?",              a: "Strip-ийн хүрээний загвар. 20 хувилбараас сонгоно." },
  { q: "Үнэ төлбөртэй юу?",            a: "Үнэгүй." },
  { q: "Гар утсан дээр ажилладаг уу?", a: "Тийм. iOS Safari, Android Chrome дэмждэг." },
];
function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: "1px solid #e5e5e3", borderRadius: 12, background: "white", overflow: "hidden" }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 20px", background: "none", border: "none", cursor: "pointer", textAlign: "left",
      }}>
        <span style={{ fontSize: 13, color: "#1a1a1a", letterSpacing: "0.03em" }}>{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={14} color="#bbb" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.2 }}>
            <p style={{ padding: "0 20px 16px", fontSize: 12, color: "#999", lineHeight: 1.7, borderTop: "1px solid #f0f0ee", paddingTop: 12 }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default function FaqPage() {
  return (
    <PageShell title="Асуулт & Хариулт" emoji="❓">
      {faqs.map(f => <Item key={f.q} q={f.q} a={f.a} />)}
    </PageShell>
  );
}
