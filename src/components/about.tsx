import { Container } from "./ui/container";
import { getEventConfig } from "@/config/event";

export function About() {
  const cfg = getEventConfig();

  return (
    <section id="about" className="border-t border-white/10">
      <Container className="py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-2xl font-semibold md:text-3xl">{cfg.about.title}</h2>
            <p className="mt-4 text-zinc-300 leading-relaxed">{cfg.about.p1}</p>
            <p className="mt-4 text-zinc-300 leading-relaxed">{cfg.about.p2}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              {cfg.about.facts.map(([k, v]) => (
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
