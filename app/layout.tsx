import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sketch Booth — Монголын хамгийн хөгжилтэй photo booth",
  description: "4 зураг авч, strip үүсгэж, найздаа share хий!",
};

const ADSENSE_ID = "ca-pub-XXXXXXXXXXXXXXXX";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="mn">
      <head>
        <Script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`} crossOrigin="anonymous" strategy="lazyOnload" />
      </head>
      <body>{children}</body>
    </html>
  );
}
