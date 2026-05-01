"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import PageShell from "@/components/PageShell";

const faqs = [
  {
    q: "Зургийг хаана хадгалдаг вэ?",
    a: "Зураг нь зөвхөн таны browser дотор боловсруулагдана. Манай сервер рүү ямар ч зураг илгээгддэггүй. Татаж авсны дараа зөвхөн таны төхөөрөмжид байна.",
  },
  {
    q: "Камер ажиллахгүй байна, яах вэ?",
    a: "Browser-ийн тохиргооноос камерын зөвшөөрлийг шалгана уу. Chrome дээр: Settings → Privacy & Security → Camera. Firefox дээр: хаягийн мөрний 🔒 товчийг дарна уу.",
  },
  {
    q: "Хэдэн зураг авдаг вэ?",
    a: "Нэг удаад 4 зураг автоматаар авдаг. Тус бүр нь 3 секундын countdown-тай.",
  },
  {
    q: "Filter-ийг хэрхэн сонгох вэ?",
    a: "Камер нээгдсэний дараа доод хэсэгт filter-үүдийг харах болно. Дурссан filter дарж real-time preview-г харна уу.",
  },
  {
    q: "Frame гэж юу вэ?",
    a: "Зургийн хэсгийн хүрээ, өнгө, арын зураг юм. Result screen дээр 10 өөр frame-с сонгох боломжтой.",
  },
  {
    q: "Стикер гэж юу вэ?",
    a: "Зургийн хэсэгт нэмэгдэх emoji overlay юм. Result screen дээр toggle хийж асааж/унтраах боломжтой.",
  },
  {
    q: "Хуваалцах товч яаж ажилладаг вэ?",
    a: "Хэрэв таны төхөөрөмж Web Share API дэмждэг бол (iOS Safari, Android Chrome) шууд share хийнэ. Үгүй бол зургийг татаж, текстийг clipboard-д хуулна.",
  },
  {
    q: "Монгол хэлнээс гадна өөр хэл байна уу?",
    a: "Одоогоор Монгол (MN) болон Англи (EN) хэл дэмждэг. Header дэх 🌐 товчоор солих боломжтой.",
  },
  {
    q: "Үнэ төлбөртэй юу?",
    a: "Үгүй, бүрэн үнэгүй! Зар сурталчилгааны тусламжтайгаар ажилладаг.",
  },
  {
    q: "Гар утсан дээр ажилладаг уу?",
    a: "Тийм! Mobile-first дизайнтай тул iOS Safari болон Android Chrome дэмждэг. Хамгийн сайн туршлага авахын тулд шинэ browser ашиглана уу.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className="rounded-2xl border border-white/10 bg-white/3 overflow-hidden cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between p-5">
        <p className="text-white font-semibold text-sm pr-4">{q}</p>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-white/40 flex-shrink-0" />
        </motion.div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <p className="px-5 pb-5 text-white/55 text-sm leading-relaxed border-t border-white/5 pt-4">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FaqPage() {
  return (
    <PageShell title="Түгээмэл асуултууд" emoji="❓">
      {faqs.map((f) => (
        <FaqItem key={f.q} q={f.q} a={f.a} />
      ))}
    </PageShell>
  );
}
