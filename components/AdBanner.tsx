"use client";
import { useEffect, useRef } from "react";

interface AdBannerProps {
  slot: string;           // Ad slot ID from AdSense dashboard
  format?: "auto" | "horizontal" | "rectangle";
  className?: string;
}

declare global {
  interface Window { adsbygoogle: unknown[]; }
}

// 🔴 Replace with your Publisher ID
const PUBLISHER_ID = "ca-pub-1030710005529345";

export default function AdBanner({ slot, format = "auto", className = "" }: AdBannerProps) {
  const ref = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      pushed.current = true;
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch { /* AdSense not loaded */ }
  }, []);

  return (
    <div className={className} style={{ width: "100%", overflow: "hidden", textAlign: "center" }}>
      <p style={{ fontSize: 9, color: "#ccc", letterSpacing: "0.15em", marginBottom: 4 }}>
        ЗАРАА
      </p>
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={PUBLISHER_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
