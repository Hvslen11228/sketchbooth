import PageShell from "@/components/PageShell";
export const metadata = { title: "Холбоо барих — Фото Буудал MN" };
const contacts = [
  { icon: "✉️", label: "И-МЭЙЛ / EMAIL", value: "hvslencoder@gmail.com", href: "mailto:hvslencoder@gmail.com" },
  { icon: "📞", label: "УТАС / PHONE",   value: "8836-3378",              href: "tel:88363378" },
];
export default function ContactPage() {
  return (
    <PageShell title="ХОЛБОО БАРИХ" emoji="📬">
      <p className="font-mono text-xs text-[#6b6860] leading-relaxed">Асуулт, санал хүсэлт, хамтын ажиллагааны талаар холбогдоно уу.</p>
      {contacts.map((c) => (
        <a key={c.label} href={c.href} className="flex items-center gap-5 p-5 border border-[#e8e5e0] hover:border-[#c8913a] bg-[#f7f5f2] hover:bg-white transition-all group">
          <span className="text-2xl">{c.icon}</span>
          <div>
            <p className="font-mono text-[9px] text-[#b0a898] tracking-widest mb-1">{c.label}</p>
            <p className="font-mono text-sm text-[#111110] group-hover:text-[#c8913a] transition-colors">{c.value}</p>
          </div>
        </a>
      ))}
      <div className="border border-[#c8913a]/30 bg-[#c8913a]/5 p-5">
        <p className="font-mono text-xs text-[#c8913a]/80 leading-relaxed">⚠ Апп-тай холбоотой асуудал гарвал browser-ийн нэр болон алдааны дэлгэрэнгүйг и-мэйлд оруулж илгээнэ үү. 24 цагийн дотор хариулна.</p>
      </div>
    </PageShell>
  );
}
