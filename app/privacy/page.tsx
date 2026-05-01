import PageShell from "@/components/PageShell";

export const metadata = { title: "Нууцлалын бодлого — Funny Photobooth MN" };

const sections = [
  {
    title: "Мэдээлэл цуглуулах",
    body: "Бид таны хувийн мэдээллийг цуглуулдаггүй. Камераас авсан зураг нь зөвхөн таны төхөөрөмж дээр боловсруулагддаг бөгөөд манай сервер рүү илгээгддэггүй.",
  },
  {
    title: "Камер & Зураг",
    body: "Камерын эрхийг зөвхөн зураг авах зорилгоор ашигладаг. Зургийг хадгалах, дамжуулах, гуравдагч талд өгөхгүй. Бүх боловсруулалт таны browser дотор явагддаг (client-side only).",
  },
  {
    title: "Cookie & Analytics",
    body: "Бид Google Analytics болон Google AdSense ашигладаг бөгөөд эдгээр нь хэрэглэгчийн зан төлөвийн анонимчилсан статистик мэдээлэл цуглуулдаг. Cookie-г browser-ийнхаа тохиргооноос хаах боломжтой.",
  },
  {
    title: "Гуравдагч тал",
    body: "Google AdSense нь зар сурталчилгааг харуулахдаа cookie ашигладаг. Google-ийн нууцлалын бодлого: policies.google.com/privacy",
  },
  {
    title: "Хүүхдийн мэдээлэл",
    body: "Энэ апп нь 13 хүртэлх насны хүүхдэд зориулагдаагүй. Хэрэв та 13-аас доош настай бол эцэг эхийн зөвшөөрөлтэйгөөр ашиглана уу.",
  },
  {
    title: "Өөрчлөлт",
    body: "Нууцлалын бодлогод өөрчлөлт орвол энэ хуудсан дээр шинэчлэгдэнэ. Сүүлчийн шинэчлэл: 2025 оны 5 дугаар сар.",
  },
];

export default function PrivacyPage() {
  return (
    <PageShell title="Нууцлалын бодлого" emoji="🔒">
      {sections.map((s) => (
        <div key={s.title} className="rounded-2xl p-5 border border-white/10 bg-white/3">
          <h2 className="text-white font-bold text-lg mb-2">{s.title}</h2>
          <p className="text-white/60 text-sm leading-relaxed">{s.body}</p>
        </div>
      ))}
    </PageShell>
  );
}
