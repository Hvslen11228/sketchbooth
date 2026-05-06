"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PageShell({ title, emoji, children }: { title: string; emoji: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-gray-100 sticky top-0 bg-white z-20">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" /> Буцах
          </Link>
          <span className="font-bold text-gray-900">Sketch Booth</span>
          <div className="w-16" />
        </div>
      </header>
      <div className="max-w-2xl mx-auto w-full px-4 py-10 flex-1">
        <div className="mb-8">
          <span className="text-4xl">{emoji}</span>
          <h1 className="text-3xl font-bold text-gray-900 mt-3">{title}</h1>
        </div>
        <div className="flex flex-col gap-3">{children}</div>
      </div>
      <footer className="border-t border-gray-100 py-4 text-center text-sm text-gray-300">© 2025 Sketch Booth</footer>
    </div>
  );
}
