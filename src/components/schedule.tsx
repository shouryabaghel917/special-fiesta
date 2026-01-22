import { Container } from "./ui/container";
import { getEventConfig } from "@/config/event";

export function Schedule() {
  const cfg = getEventConfig();

  return (
    <section id="schedule" className="border-t border-white/10">
      <Container className="py-16 md:py-20">
        <h2 className="text-2xl font-semibold md:text-3xl">{cfg.schedule.title}</h2>
        <p className="mt-2 text-zinc-300">{cfg.schedule.subtitle}</p>

        <div className="mt-8 grid gap-4">
          {cfg.schedule.items.map((it) => (
            <div
              key={it.time + it.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 md:flex md:items-center md:gap-8"
            >
              <div className="w-28 shrink-0 font-semibold text-fuchsia-300">{it.time}</div>
              <div>
                <div className="font-semibold">{it.title}</div>
                <div className="mt-1 text-sm text-zinc-300">{it.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
