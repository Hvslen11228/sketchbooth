"use client";
import { useEffect, useRef, useState } from "react";

interface AdBannerProps {
  slot: string;
  format?: "auto" | "horizontal" | "rectangle";
  className?: string;
}

declare global {
  interface Window { adsbygoogle: unknown[]; }
}

const PUBLISHER_ID = "ca-pub-1030710005529345";

export default function AdBanner({ slot, format = "auto", className = "" }: AdBannerProps) {
  const ref = useRef<HTMLModElement>(null);
  const pushed = useRef(false);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      pushed.current = true;
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch { /* not loaded yet */ }

    // Check if ad rendered after 2s, if not show placeholder
    const timer = setTimeout(() => {
      if (ref.current) {
        const h = ref.current.offsetHeight;
        if (!h || h < 10) setEmpty(true);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={className} style={{ width: "100%", overflow: "hidden" }}>
      {empty ? (
        // Subtle placeholder when ad hasn't loaded
        <div style={{
          width: "100%", height: 80,
          background: "#f5f5f5",
          border: "1px dashed #e0e0e0",
          borderRadius: 8,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ fontSize: 10, color: "#ccc", letterSpacing: "0.15em" }}>ЗАРАА</span>
        </div>
      ) : (
        <div>
          <p style={{ fontSize: 9, color: "#ccc", letterSpacing: "0.15em", marginBottom: 4, textAlign: "center" }}>
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
      )}
    </div>
  );
}
