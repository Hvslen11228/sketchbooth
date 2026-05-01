"use client";
import { useEffect } from "react";

interface AdComponentProps {
  adSlot: string;
  format?: "auto" | "horizontal" | "rectangle";
  className?: string;
}

declare global {
  interface Window { adsbygoogle: unknown[]; }
}

/**
 * Reusable AdSense component.
 * Usage: <AdComponent adSlot="1234567890" format="horizontal" />
 * Replace adSlot values in page.tsx with your actual slot IDs from AdSense dashboard.
 */
export default function AdComponent({ adSlot, format = "auto", className = "" }: AdComponentProps) {
  const PUBLISHER_ID = "ca-pub-XXXXXXXXXXXXXXXX"; // 🔴 Replace with your Publisher ID

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch { /* AdSense not loaded */ }
  }, []);

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <p className="text-center text-[10px] text-white/20 mb-1 tracking-widest uppercase">
        Зар сурталчилгаа
      </p>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={PUBLISHER_ID}
        data-ad-slot={adSlot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
