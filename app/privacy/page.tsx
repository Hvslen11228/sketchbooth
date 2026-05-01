import PageShell from "@/components/PageShell";

export const metadata = { title: "Нууцлалын бодлого — Фото Буудал MN" };

const sections = [
  { title: "МЭДЭЭЛЭЛ ЦУГЛУУЛАХ", body: "Бид таны хувийн мэдээллийг цуглуулдаггүй. Камераас авсан зураг нь зөвхөн таны төхөөрөмж дээр боловсруулагддаг бөгөөд манай сервер рүү илгээгддэггүй." },
  { title: "КАМЕР & ЗУРАГ", body: "Камерын эрхийг зөвхөн зураг авах зорилгоор ашигладаг. Бүх боловсруулалт таны browser дотор явагддаг (client-side only)." },
  { title: "COOKIE & ANALYTICS", body: "Бид Google AdSense ашигладаг бөгөөд энэ нь хэрэглэгчийн анонимчилсан статистик мэдээлэл цуглуулдаг. Cookie-г browser-ийн тохиргооноос хаах боломжтой." },
  { title: "ХҮҮХДИЙН МЭДЭЭЛЭЛ", body: "Энэ апп нь 13 хүртэлх насны хүүхдэд зориулагдаагүй." },
  { title: "СҮҮЛЧИЙН ШИНЭЧЛЭЛ", body: "2025 оны 5 дугаар сар." },
];

export default function PrivacyPage() {
  return (
    <PageShell title="НУУЦЛАЛЫН БОДЛОГО" emoji="🔒">
      {sections.map((s) => (
        <div key={s.title} className="border border-[#2a2a2a] bg-[#111] p-5">
          <h2 className="font-mono text-[10px] text-[#d4a843] tracking-widest mb-3">{s.title}</h2>
          <p className="font-mono text-xs text-[#8a8070] leading-relaxed">{s.body}</p>
        </div>
      ))}
    </PageShell>
  );
}
