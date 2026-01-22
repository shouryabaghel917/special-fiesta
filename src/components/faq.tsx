import { Container } from "./ui/container";
import { getEventConfig } from "@/config/event";

export function FAQ() {
  const cfg = getEventConfig();

  return (
    <section id="faq" className="border-t border-white/10">
      <Container className="py-16 md:py-20">
        <h2 className="text-2xl font-semibold md:text-3xl">{cfg.faq.title}</h2>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {cfg.faq.items.map((f) => (
            <div key={f.q} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="font-semibold">{f.q}</div>
              <p className="mt-2 text-sm text-zinc-300 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
