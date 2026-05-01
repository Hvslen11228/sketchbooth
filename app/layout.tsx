import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sketch Booth — Mongolia's Funniest Photobooth",
  description: "4 зураг авч, strip үүсгэж, найздаа share хий. Монголын хамгийн хөгжилтэй photo booth!",
};

const ADSENSE_ID = "ca-pub-XXXXXXXXXXXXXXXX";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="mn">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@300;400;700;900&family=DM+Mono:ital,wght@0,400;0,500;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400&display=swap" rel="stylesheet" />
        <Script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`} crossOrigin="anonymous" strategy="lazyOnload" />
      </head>
      <body>{children}</body>
    </html>
  );
}
