"use client";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PageShell({ title, emoji, children }: { title: string; emoji: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0d0d0d] flex flex-col">
      <header className="sticky top-0 z-30 bg-[#0d0d0d] border-b border-[#1e1e1e]">
        <div className="bg-[#1a1a1a] border-b border-[#2a2a2a] h-6" />
        <div className="px-8 py-4 flex items-center justify-between">
          <Link href="/">
            <motion.div whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-[#8a8070] hover:text-[#d4a843] transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> БУЦАХ
            </motion.div>
          </Link>
          <div className="font-display text-xl leading-none text-center">
            <span className="text-[#f5f0e8]">SKETCH </span>
            <span className="text-[#d4a843]">BOOTH</span>
          </div>
          <div className="w-16" />
        </div>
      </header>
      <div className="max-w-2xl mx-auto w-full px-6 py-12 flex-1">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
          <div className="border-b border-[#1e1e1e] pb-8 mb-2">
            <span className="text-5xl">{emoji}</span>
            <h1 className="font-display text-5xl text-[#f5f0e8] mt-4 tracking-wide">{title}</h1>
          </div>
          <div className="flex flex-col gap-3">{children}</div>
        </motion.div>
      </div>
      <div className="bg-[#1a1a1a] border-t border-[#2a2a2a] px-6 py-2 flex justify-between items-center">
        <div className="font-display text-sm text-[#f5f0e8]/20">SKETCH <span className="text-[#d4a843]/40">BOOTH</span></div>
        <div className="font-mono text-[9px] text-[#8a8070]/30">© 2025</div>
      </div>
    </div>
  );
}
