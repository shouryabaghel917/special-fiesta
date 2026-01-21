import { Container } from "./ui/container";

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <Container className="py-10 text-sm text-zinc-400 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Special Fiesta. All rights reserved.</p>
        <p className="text-zinc-500">
          Built with Next.js • Tailwind • Good vibes
        </p>
      </Container>
    </footer>
  );
}
