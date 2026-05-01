import PageShell from "@/components/PageShell";
export const metadata = { title: "Нууцлалын бодлого — Фото Буудал MN" };
const sections = [
  { title: "МЭДЭЭЛЭЛ ЦУГЛУУЛАХ", body: "Бид таны хувийн мэдээллийг цуглуулдаггүй. Камераас авсан зураг нь зөвхөн таны төхөөрөмж дээр боловсруулагддаг." },
  { title: "КАМЕР & ЗУРАГ", body: "Камерын эрхийг зөвхөн зураг авах зорилгоор ашигладаг. Бүх боловсруулалт таны browser дотор явагддаг (client-side only)." },
  { title: "COOKIE & ANALYTICS", body: "Бид Google AdSense ашигладаг бөгөөд энэ нь анонимчилсан статистик мэдээлэл цуглуулдаг." },
  { title: "ХҮҮХДИЙН МЭДЭЭЛЭЛ", body: "Энэ апп нь 13 хүртэлх насны хүүхдэд зориулагдаагүй." },
  { title: "СҮҮЛЧИЙН ШИНЭЧЛЭЛ", body: "2025 оны 5 дугаар сар." },
];
export default function PrivacyPage() {
  return (
    <PageShell title="НУУЦЛАЛЫН БОДЛОГО" emoji="🔒">
      {sections.map((s) => (
        <div key={s.title} className="border border-[#e8e5e0] bg-[#f7f5f2] p-5">
          <h2 className="font-mono text-[9px] text-[#c8913a] tracking-widest mb-2">{s.title}</h2>
          <p className="font-mono text-xs text-[#6b6860] leading-relaxed">{s.body}</p>
        </div>
      ))}
    </PageShell>
  );
}
