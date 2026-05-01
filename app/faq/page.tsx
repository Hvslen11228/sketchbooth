"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import PageShell from "@/components/PageShell";
const faqs = [
  { q: "Зургийг хаана хадгалдаг вэ?", a: "Зараг нь зөвхөн таны browser дотор боловсруулагдана. Сервер рүү ямар ч зураг илгээгддэггүй." },
  { q: "Камер ажиллахгүй байна, яах вэ?", a: "Browser-ийн тохиргооноос камерын зөвшөөрлийг шалгана уу. Chrome: Settings → Privacy & Security → Camera." },
  { q: "Хэдэн зураг авдаг вэ?", a: "Нэг удаад 4 зураг автоматаар авдаг. Тус бүр нь 3 секундын countdown-тай." },
  { q: "Frame гэж юу вэ?", a: "Strip-ийн хүрээ, өнгө юм. Result дэлгэц дээр 20 өөр frame-с сонгох боломжтой." },
  { q: "Үнэ төлбөртэй юу?", a: "Бүрэн үнэгүй. Зар сурталчилгааны тусламжтайгаар ажилладаг." },
  { q: "Гар утсан дээр ажилладаг уу?", a: "Тийм. iOS Safari болон Android Chrome дэмждэг." },
];
function FaqItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen(!open)} className={`border ${open ? "border-[#e8301a]/30 bg-white" : "border-black/10 bg-[#f0ece4]"} cursor-pointer transition-all`}>
      <div className="flex items-center gap-4 p-5">
        <span className="font-mono text-[10px] text-[#e8301a]/50 w-6 flex-shrink-0">{String(i+1).padStart(2,"0")}</span>
        <p className="font-mono text-xs text-[#0a0a0a] flex-1 leading-relaxed">{q}</p>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-[#9a9490]" />
        </motion.div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.2 }}>
            <p className="px-5 pb-5 pl-14 font-mono text-xs text-[#9a9490] leading-relaxed border-t border-black/5 pt-4">{a}</p>
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
