import PageShell from "@/components/PageShell";
export const metadata = { title: "Холбоо барих — Sketch Booth MN" };
const contacts = [
  { icon: "✉️", label: "И-МЭЙЛ / EMAIL", value: "hvslencoder@gmail.com", href: "mailto:hvslencoder@gmail.com" },
  { icon: "📞", label: "УТАС / PHONE",   value: "8836-3378",              href: "tel:88363378" },
];
export default function ContactPage() {
  return (
    <PageShell title="ХОЛБОО БАРИХ" emoji="📬">
      <p className="font-mono text-xs text-[#9a9490] leading-relaxed">Асуулт, санал, хамтын ажиллагааны талаар холбогдоно уу.</p>
      {contacts.map((c) => (
        <a key={c.label} href={c.href}
          className="flex items-center gap-5 p-6 border border-black/10 hover:border-[#e8301a] bg-[#f0ece4] hover:bg-white transition-all group"
        >
          <span className="text-2xl">{c.icon}</span>
          <div>
            <p className="font-mono text-[9px] text-[#9a9490] tracking-widest mb-1">{c.label}</p>
            <p className="font-mono text-sm text-[#0a0a0a] group-hover:text-[#e8301a] transition-colors">{c.value}</p>
          </div>
        </a>
      ))}
      <div className="border-l-4 border-[#e8301a] pl-5 py-4 bg-[#e8301a]/5">
        <p className="font-mono text-xs text-[#9a9490] leading-relaxed">⚠ Апп-тай холбоотой асуудал гарвал browser болон алдааны дэлгэрэнгүйг и-мэйлд илгээнэ үү. 24 цагийн дотор хариулна.</p>
      </div>
    </PageShell>
  );
}
