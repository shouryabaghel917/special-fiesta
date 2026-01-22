import { Container } from "./ui/container";
import { getEventConfig } from "@/config/event";

export function Footer() {
  const cfg = getEventConfig();

  return (
    <footer className="border-t border-white/10">
      <Container className="py-10 text-sm text-zinc-400 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {cfg.brand.name}. {cfg.footer.line1}
        </p>
        <p className="text-zinc-500">{cfg.footer.line2}</p>
      </Container>
    </footer>
  );
}
