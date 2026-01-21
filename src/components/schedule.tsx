import { Container } from "./ui/container";

const items = [
  { time: "6:00 PM", title: "Welcome & Check-in", desc: "Grab your badge, music starts." },
  { time: "7:00 PM", title: "Food Opens", desc: "Street-style bites + mocktails." },
  { time: "8:30 PM", title: "Games & Challenges", desc: "Teams, prizes, chaos (good kind)." },
  { time: "10:00 PM", title: "Finale", desc: "Photos, shoutouts, last dance." },
];

export function Schedule() {
  return (
    <section id="schedule" className="border-t border-white/10">
      <Container className="py-16 md:py-20">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold md:text-3xl">Schedule</h2>
            <p className="mt-2 text-zinc-300">A simple flow you can tweak anytime.</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4">
          {items.map((it) => (
            <div
              key={it.time}
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
