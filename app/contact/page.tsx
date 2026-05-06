"use client";
import PageShell from "@/components/PageShell";
const contacts = [
  { icon: "✉️", label: "И-мэйл", value: "hvslencoder@gmail.com", href: "mailto:hvslencoder@gmail.com" },
  { icon: "📞", label: "Утас",   value: "8836-3378",              href: "tel:88363378" },
];
export default function ContactPage() {
  return (
    <PageShell title="Холбоо барих" emoji="✉️">
      <p style={{ fontSize: 13, color: "#999", letterSpacing: "0.04em", lineHeight: 1.8 }}>
        Асуулт, санал хүсэлт байвал холбогдоорой.
      </p>
      {contacts.map(c => (
        <a key={c.label} href={c.href} style={{
          display: "flex", alignItems: "center", gap: 16,
          padding: "16px 20px", border: "1px solid #e5e5e3",
          borderRadius: 12, background: "white", textDecoration: "none",
        }}>
          <span style={{ fontSize: 20 }}>{c.icon}</span>
          <div>
            <div style={{ fontSize: 10, color: "#bbb", letterSpacing: "0.1em", marginBottom: 2 }}>{c.label.toUpperCase()}</div>
            <div style={{ fontSize: 13, color: "#1a1a1a", letterSpacing: "0.04em" }}>{c.value}</div>
          </div>
        </a>
      ))}
    </PageShell>
  );
}
