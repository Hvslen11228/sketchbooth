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
  { q: "Үнэ төлбөртэй юу?", a: "Үгүй, бүрэн үнэгүй. Зар сурталчилгааны тусламжтайгаар ажилладаг." },
  { q: "Гар утсан дээр ажилладаг уу?", a: "Тийм. Mobile-first дизайнтай тул iOS Safari болон Android Chrome дэмждэг." },
];

function FaqItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border border-[#2a2a2a] ${open ? "border-[#d4a843]/40 bg-[#120f00]" : "bg-[#111]"} transition-colors cursor-pointer`} onClick={() => setOpen(!open)}>
      <div className="flex items-center gap-4 p-5">
        <span className="font-mono text-[10px] text-[#d4a843]/50 flex-shrink-0 w-5">{String(i+1).padStart(2,"0")}</span>
        <p className="font-mono text-xs text-[#f5f0e8] flex-1 leading-relaxed">{q}</p>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-[#8a8070] flex-shrink-0" />
        </motion.div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.2 }}>
            <p className="px-5 pb-5 pl-14 font-mono text-xs text-[#8a8070] leading-relaxed border-t border-[#1e1e1e] pt-4">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqPage() {
  return (
    <PageShell title="АСУУЛТ & ХАРИУЛТ" emoji="❓">
      {faqs.map((f, i) => <FaqItem key={f.q} q={f.q} a={f.a} i={i} />)}
    </PageShell>
  );
}
