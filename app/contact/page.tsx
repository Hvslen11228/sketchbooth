import PageShell from "@/components/PageShell";

export const metadata = { title: "Холбоо барих — Funny Photobooth MN" };

const contacts = [
  { icon: "✉️", label: "И-мэйл", value: "hvslencoder@gmail.com", href: "mailto:hvslencoder@gmail.com" },
  { icon: "📞", label: "Утас", value: "8836-3378", href: "tel:88363378" },
  { icon: "📸", label: "Instagram", value: "@funnybooth.mn", href: "https://instagram.com/funnybooth.mn" },
  { icon: "👤", label: "Facebook", value: "Funny Photobooth Mongolia", href: "https://facebook.com/funnyphotobooth.mn" },
];

export default function ContactPage() {
  return (
    <PageShell title="Холбоо барих" emoji="📬">
      <p className="text-gray-500 text-sm">
        Асуулт, санал хүсэлт, хамтын ажиллагааны талаар доорх сувгуудаар холбогдоно уу.
      </p>

      {contacts.map((c) => (
        <a
          key={c.label}
          href={c.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 rounded-2xl p-5 border-2 border-purple-100 bg-white hover:border-pink-300 hover:shadow-md transition-all group"
        >
          <span className="text-3xl">{c.icon}</span>
          <div>
            <p className="text-gray-400 text-xs mb-0.5">{c.label}</p>
            <p className="text-gray-800 font-bold group-hover:text-pink-500 transition-colors">{c.value}</p>
          </div>
        </a>
      ))}

      <div className="rounded-2xl p-5 border-2 border-yellow-200 bg-yellow-50 mt-2">
        <p className="text-yellow-700 text-sm leading-relaxed">
          💡 Апп-тай холбоотой асуудал гарвал browser-ийн нэр болон алдааны дэлгэрэнгүйг и-мэйлд оруулж илгээнэ үү. Ажлын өдрүүдэд 24 цагийн дотор хариулна.
        </p>
      </div>
    </PageShell>
  );
}
