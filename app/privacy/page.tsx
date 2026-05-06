import PageShell from "@/components/PageShell";
export const metadata = { title: "Нууцлал — Sketch Booth" };
const items = [
  { t: "Мэдээлэл", b: "Таны зураг зөвхөн browser дотор боловсруулагддаг. Сервер рүү ямар ч мэдээлэл илгээгддэггүй." },
  { t: "Камер", b: "Камерын эрхийг зөвхөн зураг авах зорилгоор ашигладаг." },
  { t: "Зар", b: "Google AdSense ашигладаг. Анонимчилсан статистик цуглуулдаг." },
  { t: "Хүүхэд", b: "13-аас доош насны хүүхдэд зориулагдаагүй." },
];
export default function PrivacyPage() {
  return (
    <PageShell title="Нууцлалын бодлого" emoji="🔒">
      {items.map(s => (
        <div key={s.t} style={{ padding: "16px 20px", border: "1px solid #e5e5e3", borderRadius: 12, background: "white" }}>
          <div style={{ fontSize: 10, color: "#bbb", letterSpacing: "0.1em", marginBottom: 6 }}>{s.t.toUpperCase()}</div>
          <p style={{ fontSize: 13, color: "#555", lineHeight: 1.7, letterSpacing: "0.03em" }}>{s.b}</p>
        </div>
      ))}
    </PageShell>
  );
}
