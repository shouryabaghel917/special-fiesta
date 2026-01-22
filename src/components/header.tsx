import { Container } from "./ui/container";
import { getEventConfig } from "@/config/event";

const links = [
  { href: "#about", label: "About" },
  { href: "#schedule", label: "Schedule" },
  { href: "#gallery", label: "Gallery" },
  { href: "#faq", label: "FAQ" }
];

export function Header() {
  const cfg = getEventConfig();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/70 backdrop-blur">
      <Container className="flex items-center justify-between py-4">
        <a href="#" className="font-semibold tracking-tight">
          <span className="text-white">{cfg.brand.name.split(" ")[0]}</span>{" "}
          <span className="text-fuchsia-300">{cfg.brand.accent}</span>
        </a>

        <nav className="hidden gap-6 text-sm text-zinc-200 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-white transition">
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#rsvp"
          className="rounded-full bg-white px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-zinc-100 transition"
        >
          RSVP
        </a>
      </Container>
    </header>
  );
}
