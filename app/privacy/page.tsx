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
        <div key={s.title} className="p-6 border border-black/10 bg-[#f0ece4]">
          <h2 className="font-mono text-[9px] text-[#e8301a] tracking-widest mb-3">{s.title}</h2>
          <p className="font-mono text-xs text-[#9a9490] leading-relaxed">{s.body}</p>
        </div>
      ))}
    </PageShell>
  );
}
