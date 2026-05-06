"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageShell from "@/components/PageShell";

const faqs = [
  { q: "Зургийг хаана хадгалдаг вэ?",    a: "Зөвхөн таны browser дотор. Сервер рүү ямар ч зураг явдаггүй." },
  { q: "Камер ажиллахгүй байна?",         a: "Browser Settings → Privacy → Camera-с зөвшөөрөл өгнө үү." },
  { q: "Хэдэн зураг авдаг вэ?",           a: "4 зураг. Тус бүр нь 3 секундын countdown-тай автоматаар авна." },
  { q: "Frame гэж юу вэ?",                a: "Strip-ийн хүрээний загвар. 20 өөр хувилбараас сонгоно." },
  { q: "Үнэ төлбөртэй юу?",              a: "Үнэгүй." },
  { q: "Гар утсан дээр ажилладаг уу?",   a: "Тийм. iOS Safari, Android Chrome дэмждэг." },
];

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors">
        <span className="font-medium text-gray-900 text-sm">{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.2 }}>
            <p className="px-4 pb-4 text-sm text-gray-500 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqPage() {
  return (
    <PageShell title="Түгээмэл асуулт" emoji="❓">
      {faqs.map(f => <Item key={f.q} q={f.q} a={f.a} />)}
    </PageShell>
  );
}
