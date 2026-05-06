import PageShell from "@/components/PageShell";
export const metadata = { title: "Нууцлалын бодлого — Sketch Booth MN" };
const sections = [
  { title: "МЭДЭЭЛЭЛ ЦУГЛУУЛАХ", body: "Бид таны хувийн мэдээллийг цуглуулдаггүй. Зураг нь зөвхөн таны browser дотор боловсруулагддаг." },
  { title: "КАМЕР & ЗУРАГ", body: "Камерын эрхийг зөвхөн зураг авах зорилгоор ашигладаг. Бүх боловсруулалт client-side явагддаг." },
  { title: "COOKIE & ANALYTICS", body: "Google AdSense ашигладаг бөгөөд анонимчилсан статистик мэдээлэл цуглуулдаг." },
  { title: "ХҮҮХДИЙН МЭДЭЭЛЭЛ", body: "Энэ апп нь 13-аас доош насны хүүхдэд зориулагдаагүй." },
  { title: "ШИНЭЧЛЭЛ", body: "2025 оны 5-р сар." },
];
export default function PrivacyPage() {
  return (
    <PageShell title="НУУЦЛАЛЫН БОДЛОГО" emoji="🔒">
      {sections.map((s) => (
        <div key={s.title} className="border border-[#2a2a2a] bg-[#111] p-5">
          <h2 className="font-mono text-[9px] text-[#d4a843] tracking-widest mb-2">{s.title}</h2>
          <p className="font-mono text-xs text-[#8a8070] leading-relaxed">{s.body}</p>
        </div>
      ))}
    </PageShell>
  );
}
