"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import PageShell from "@/components/PageShell";

const faqs = [
  { q: "Зургийг хаана хадгалдаг вэ?", a: "Зураг нь зөвхөн таны browser дотор боловсруулагдана. Манай сервер рүү ямар ч зураг илгээгддэггүй." },
  { q: "Камер ажиллахгүй байна, яах вэ?", a: "Browser-ийн тохиргооноос камерын зөвшөөрлийг шалгана уу. Chrome: Settings → Privacy & Security → Camera." },
  { q: "Хэдэн зураг авдаг вэ?", a: "Нэг удаад 4 зураг автоматаар авдаг. Тус бүр нь 3 секундын countdown-тай." },
  { q: "Filter-ийг хэрхэн сонгох вэ?", a: "Камер нээгдсэний дараа доод хэсэгт filter-үүдийг харна. Дурссан filter дарж real-time preview-г харна уу." },
  { q: "Frame гэж юу вэ?", a: "Зургийн strip-ийн хүрээ, өнгө юм. Result дэлгэц дээр 10 өөр frame-с сонгох боломжтой." },
  { q: "Хуваалцах товч яаж ажилладаг вэ?", a: "iOS Safari, Android Chrome дэмждэг бол шууд share хийнэ. Үгүй бол зургийг татаж, текстийг clipboard-д хуулна." },
  { q: "Үнэ төлбөртэй юу?", a: "Үгүй, бүрэн үнэгүй! Зар сурталчилгааны тусламжтайгаар ажилладаг." },
  { q: "Гар утсан дээр ажилладаг уу?", a: "Тийм! Mobile-first дизайнтай тул iOS Safari болон Android Chrome дэмждэг." },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl border-2 border-purple-100 bg-white overflow-hidden cursor-pointer hover:border-purple-200 transition-colors"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between p-5">
        <p className="text-gray-800 font-semibold text-sm pr-4">{q}</p>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-purple-400 flex-shrink-0" />
        </motion.div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.2 }}>
            <p className="px-5 pb-5 text-gray-500 text-sm leading-relaxed border-t border-purple-50 pt-4">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqPage() {
  return (
    <PageShell title="Түгээмэл асуултууд" emoji="❓">
      {faqs.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}
    </PageShell>
  );
}
