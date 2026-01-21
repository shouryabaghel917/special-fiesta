import { Container } from "./ui/container";

export function About() {
  return (
    <section id="about" className="border-t border-white/10">
      <Container className="py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-2xl font-semibold md:text-3xl">What is Special Fiesta?</h2>
            <p className="mt-4 text-zinc-300 leading-relaxed">
              A delightful starter template for any celebration: birthdays, cultural nights,
              college fests, house parties, meetups—anything.
            </p>
            <p className="mt-4 text-zinc-300 leading-relaxed">
              You can easily customize the palette, sections, and RSVP behavior (swap file storage
              for a real database when you’re ready).
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                ["Theme", "Midnight Neon"],
                ["Stack", "Next.js + TS"],
                ["Styling", "Tailwind CSS"],
                ["Deployment", "Vercel-ready"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-2xl border border-white/10 bg-zinc-950/30 p-4">
                  <p className="text-zinc-400">{k}</p>
                  <p className="mt-1 font-semibold">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
