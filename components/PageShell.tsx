"use client";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PageShell({ title, emoji, children }: { title: string; emoji: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="bg-[#f7f5f2] border-b border-[#e8e5e0] px-6 py-1.5" />
      <div className="max-w-2xl mx-auto w-full px-6 py-8 flex-1">
        <Link href="/">
          <motion.div whileTap={{ scale: 0.95 }} className="inline-flex items-center gap-2 font-mono text-[10px] text-[#6b6860] hover:text-[#c8913a] transition-colors mb-10 tracking-widest">
            <ArrowLeft className="w-3.5 h-3.5" />БУЦАХ / BACK
          </motion.div>
        </Link>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
          <div className="border-b border-[#e8e5e0] pb-6">
            <span className="text-4xl">{emoji}</span>
            <h1 className="font-display text-5xl text-[#111110] mt-3 tracking-wide">{title}</h1>
          </div>
          <div className="flex flex-col gap-3">{children}</div>
        </motion.div>
      </div>
      <div className="border-t border-[#e8e5e0] bg-[#f7f5f2] h-8" />
    </div>
  );
}
