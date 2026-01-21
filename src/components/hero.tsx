import { Container } from "./ui/container";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute top-24 right-[-120px] h-[520px] w-[520px] rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] [background-size:28px_28px] opacity-40" />
      </div>

      <Container className="py-20 md:py-28">
        <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
          ✨ New • A gorgeous starter repo
        </p>

        <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl">
          Make your next event feel{" "}
          <span className="text-fuchsia-300">special</span>.
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-300 md:text-lg">
          A modern landing page for celebrations—clean design, responsive sections,
          and a simple RSVP flow to get you shipping fast.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#rsvp"
            className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-zinc-950 hover:bg-zinc-100 transition"
          >
            RSVP now
          </a>
          <a
            href="#about"
            className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
          >
            Explore details
          </a>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            { title: "Polished UI", desc: "Aesthetic sections with a premium feel." },
            { title: "RSVP built-in", desc: "API route + validation, ready to extend." },
            { title: "CI included", desc: "GitHub Actions runs lint + build." },
          ].map((c) => (
            <div key={c.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-zinc-300">{c.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
