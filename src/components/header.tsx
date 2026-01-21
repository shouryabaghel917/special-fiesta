import { Container } from "./ui/container";

const links = [
  { href: "#about", label: "About" },
  { href: "#schedule", label: "Schedule" },
  { href: "#gallery", label: "Gallery" },
  { href: "#faq", label: "FAQ" },
  { href: "#rsvp", label: "RSVP" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/70 backdrop-blur">
      <Container className="flex items-center justify-between py-4">
        <a href="#" className="font-semibold tracking-tight">
          <span className="text-white">Special</span>{" "}
          <span className="text-fuchsia-300">Fiesta</span>
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
          Join the Fiesta
        </a>
      </Container>
    </header>
  );
}
