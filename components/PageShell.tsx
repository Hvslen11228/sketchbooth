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
    <div className="gradient-bg min-h-screen relative">
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8">
        <Link href="/">
          <motion.div
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Буцах</span>
          </motion.div>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-6"
        >
          <div>
            <span className="text-5xl">{emoji}</span>
            <h1 className="text-3xl font-black text-white mt-3">{title}</h1>
          </div>
          <div className="flex flex-col gap-4 text-white/70 leading-relaxed">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
