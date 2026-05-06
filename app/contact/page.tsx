import PageShell from "@/components/PageShell";
export const metadata = { title: "Холбоо барих — Sketch Booth MN" };
const contacts = [
  { icon: "✉️", label: "И-МЭЙЛ / EMAIL", value: "hvslencoder@gmail.com", href: "mailto:hvslencoder@gmail.com" },
  { icon: "📞", label: "УТАС / PHONE",   value: "8836-3378",              href: "tel:88363378" },
];
export default function ContactPage() {
  return (
    <PageShell title="ХОЛБОО БАРИХ" emoji="📬">
      <p className="font-mono text-xs text-[#8a8070] leading-relaxed">Асуулт, санал, хамтын ажиллагааны талаар холбогдоно уу.</p>
      {contacts.map((c) => (
        <a key={c.label} href={c.href}
          className="flex items-center gap-5 p-5 border border-[#2a2a2a] hover:border-[#d4a843] bg-[#111] hover:bg-[#161208] transition-all group">
          <span className="text-2xl">{c.icon}</span>
          <div>
            <p className="font-mono text-[9px] text-[#8a8070]/60 tracking-widest mb-1">{c.label}</p>
            <p className="font-mono text-sm text-[#f5f0e8] group-hover:text-[#d4a843] transition-colors">{c.value}</p>
          </div>
        </a>
      ))}
      <div className="border border-[#d4a843]/20 bg-[#d4a843]/5 p-5">
        <p className="font-mono text-xs text-[#d4a843]/70 leading-relaxed">⚠ Апп-тай холбоотой асуудал гарвал browser болон алдааны дэлгэрэнгүйг и-мэйлд илгээнэ үү. 24 цагийн дотор хариулна.</p>
      </div>
    </PageShell>
  );
}
