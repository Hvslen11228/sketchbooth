import PageShell from "@/components/PageShell";


export const metadata = { title: "Холбоо барих — Funny Photobooth MN" };

const contacts = [
  {
    icon: "✉️",
    label: "И-мэйл",
    value: "hello@funnyphotobooth.mn",
    href: "mailto:hello@funnyphotobooth.mn",
  },
  {
    icon: "📸",
    label: "Instagram",
    value: "@funnybooth.mn",
    href: "https://instagram.com/funnybooth.mn",
  },
  {
    icon: "👤",
    label: "Facebook",
    value: "Funny Photobooth Mongolia",
    href: "https://facebook.com/funnyphotobooth.mn",
  },
  {
    icon: "💬",
    label: "Messenger",
    value: "m.me/funnyphotobooth.mn",
    href: "https://m.me/funnyphotobooth.mn",
  },
];

export default function ContactPage() {
  return (
    <PageShell title="Холбоо барих" emoji="📬">
      <p className="text-white/50 text-sm">
        Асуулт, санал хүсэлт, хамтын ажиллагааны талаар доорх сувгуудаар холбогдоно уу.
      </p>

      {contacts.map((c) => (
        <a
          key={c.label}
          href={c.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 rounded-2xl p-5 border border-white/10 bg-white/3 hover:border-white/30 hover:bg-white/6 transition-all group"
        >
          <span className="text-3xl">{c.icon}</span>
          <div>
            <p className="text-white/40 text-xs mb-0.5">{c.label}</p>
            <p className="text-white font-semibold group-hover:text-pink-400 transition-colors">
              {c.value}
            </p>
          </div>
        </a>
      ))}

      <div className="rounded-2xl p-5 border border-yellow-400/20 bg-yellow-400/5 mt-2">
        <p className="text-yellow-300/80 text-sm leading-relaxed">
          💡 Хэрэв апп-тай холбоотой алдаа гарвал browser-ийн нэр, хувилбар болон алдааны дэлгэрэнгүйг и-мэйлд оруулж илгээнэ үү. Ажлын өдрүүдэд 24 цагийн дотор хариулна.
        </p>
      </div>
    </PageShell>
  );
}
