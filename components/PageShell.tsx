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
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #f5f3ff 0%, #ede8ff 40%, #faf8ff 100%)" }}>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Link href="/">
          <motion.div
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-pink-500 mb-8 transition-colors font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Буцах</span>
          </motion.div>
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
          <div>
            <span className="text-5xl">{emoji}</span>
            <h1 className="text-3xl font-black text-gray-800 mt-3">{title}</h1>
          </div>
          <div className="flex flex-col gap-3 text-gray-600 leading-relaxed">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
