"use client";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PageShell({ title, emoji, children }: { title: string; emoji: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="sticky top-0 z-30 bg-white border-b border-[#e8e5e0]">
        <div className="bg-[#f7f5f2] border-b border-[#e8e5e0] h-7" />
        <div className="px-8 py-4 flex items-center justify-between">
          <Link href="/">
            <motion.div whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-[#9a9490] hover:text-[#111110] transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> БУЦАХ
            </motion.div>
          </Link>
          <div className="font-display text-xl text-[#111110] leading-none">
            SKETCH <span className="text-[#c8913a]">BOOTH</span>
          </div>
          <div className="w-16" />
        </div>
      </header>
      <div className="max-w-2xl mx-auto w-full px-6 py-12 flex-1">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
          <div className="border-b border-[#e8e5e0] pb-8 mb-2">
            <span className="text-5xl">{emoji}</span>
            <h1 className="font-display text-5xl text-[#111110] mt-4 tracking-wide leading-tight">{title}</h1>
          </div>
          <div className="flex flex-col gap-3">{children}</div>
        </motion.div>
      </div>
      <footer className="border-t border-[#e8e5e0] bg-[#f7f5f2] px-8 py-3 flex justify-between">
        <div className="font-display text-sm text-[#9a9490]">SKETCH <span className="text-[#c8913a]">BOOTH</span></div>
        <div className="font-mono text-[9px] text-[#c8c4be]">© 2025</div>
      </footer>
    </div>
  );
}
