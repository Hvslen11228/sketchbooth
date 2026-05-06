import PageShell from "@/components/PageShell";
export const metadata = { title: "Холбоо барих — Sketch Booth" };
export default function ContactPage() {
  return (
    <PageShell title="Холбоо барих" emoji="📬">
      <p className="text-gray-500 text-sm mb-2">Асуулт, санал хүсэлт байвал холбогдоорой.</p>
      {[
        { icon: "✉️", label: "И-мэйл", value: "hvslencoder@gmail.com", href: "mailto:hvslencoder@gmail.com" },
        { icon: "📞", label: "Утас",   value: "8836-3378",              href: "tel:88363378" },
      ].map(c => (
        <a key={c.label} href={c.href}
          className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50 hover:border-gray-300 hover:bg-white transition-all group"
        >
          <span className="text-2xl">{c.icon}</span>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">{c.label}</p>
            <p className="text-gray-900 font-medium group-hover:text-gray-600">{c.value}</p>
          </div>
        </a>
      ))}
    </PageShell>
  );
}
