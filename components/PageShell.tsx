"use client";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PageShellProps {
  title: string;
  emoji: string;
  children: React.ReactNode;
}

export default function PageShell({ title, emoji, children }: PageShellProps) {
  return (
    <div className="min-h-screen bg-[#0d0d0d] flex flex-col">
      {/* Top film rail */}
      <div className="bg-[#1a1a1a] border-b border-[#2a2a2a] h-6" />

      <div className="max-w-2xl mx-auto w-full px-6 py-8 flex-1">
        <Link href="/">
          <motion.div
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 font-mono text-xs text-[#8a8070] hover:text-[#d4a843] transition-colors mb-10 tracking-widest"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            БУЦАХ / BACK
          </motion.div>
        </Link>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-5">
          <div className="border-b border-[#1e1e1e] pb-6">
            <span className="text-4xl">{emoji}</span>
            <h1 className="font-display text-5xl text-[#f5f0e8] mt-3 tracking-wide">{title}</h1>
          </div>
          <div className="flex flex-col gap-3">{children}</div>
        </motion.div>
      </div>

      {/* Bottom film rail */}
      <div className="bg-[#1a1a1a] border-t border-[#2a2a2a] h-6" />
    </div>
  );
}
