import PageShell from "@/components/PageShell";
export const metadata = { title: "Нууцлал — Sketch Booth" };
const items = [
  { t: "Мэдээлэл цуглуулах", b: "Бид таны хувийн мэдээллийг цуглуулдаггүй. Зураг нь зөвхөн таны browser дотор боловсруулагддаг." },
  { t: "Камер", b: "Камерын эрхийг зөвхөн зураг авах зорилгоор ашигладаг. Бүх боловсруулалт client-side явагддаг." },
  { t: "Зар сурталчилгаа", b: "Google AdSense ашигладаг. Энэ нь анонимчилсан статистик мэдээлэл цуглуулдаг." },
  { t: "Хүүхэд", b: "13-аас доош насны хүүхдэд зориулагдаагүй." },
];
export default function PrivacyPage() {
  return (
    <PageShell title="Нууцлалын бодлого" emoji="🔒">
      {items.map(s => (
        <div key={s.t} className="p-4 rounded-xl border border-gray-100 bg-gray-50">
          <h2 className="font-semibold text-gray-900 mb-1">{s.t}</h2>
          <p className="text-sm text-gray-500 leading-relaxed">{s.b}</p>
        </div>
      ))}
    </PageShell>
  );
}
