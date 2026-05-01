import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Funny Photobooth Mongolia 📸",
  description: "Монголын хамгийн хөгжилтэй photo booth! 4 зураг авч, filter нэмж, найздаа share хий!",
  keywords: "photo booth, монгол, зураг, funny, хөгжилтэй, photobooth",
  openGraph: {
    title: "Funny Photobooth Mongolia 📸",
    description: "Монголын хамгийн хөгжилтэй photo booth!",
    type: "website",
  },
};

// 🔴 Replace with your actual AdSense Publisher ID
const ADSENSE_ID = "ca-pub-XXXXXXXXXXXXXXXX";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="mn">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* Google AdSense - replace ADSENSE_ID */}
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </head>
      <body style={{ fontFamily: "'Nunito', system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
