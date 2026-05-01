"use client";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PageShell({ title, emoji, children }: { title: string; emoji: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f9f7f4] flex flex-col">
      <header className="border-b border-black/10 px-8 py-4 flex items-center justify-between bg-[#f9f7f4]/95 backdrop-blur-sm sticky top-0">
        <Link href="/">
          <motion.div whileTap={{ scale: 0.95 }} className="flex items-center gap-3 font-mono text-[10px] tracking-[0.2em] text-[#9a9490] hover:text-[#0a0a0a] transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> БУЦАХ
          </motion.div>
        </Link>
        <div className="font-display text-sm font-700 text-[#0a0a0a] tracking-tight">SKETCH BOOTH MN</div>
      </header>

      <div className="max-w-2xl mx-auto w-full px-6 py-12 flex-1">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-5">
          <div className="border-b border-black/10 pb-8 mb-2">
            <span className="text-5xl">{emoji}</span>
            <h1 className="font-display font-900 text-5xl text-[#0a0a0a] mt-4 tracking-tight leading-tight">{title}</h1>
          </div>
          <div className="flex flex-col gap-3">{children}</div>
        </motion.div>
      </div>

      <footer className="border-t border-black/10 bg-[#0a0a0a] px-8 py-3 flex justify-between items-center">
        <div className="font-display text-xs font-700 text-white/20">SKETCH BOOTH MN</div>
        <div className="font-mono text-[9px] text-white/20">© 2025</div>
      </footer>
    </div>
  );
}
