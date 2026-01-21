import { Container } from "./ui/container";

const tiles = Array.from({ length: 8 }).map((_, i) => i + 1);

export function Gallery() {
  return (
    <section id="gallery" className="border-t border-white/10">
      <Container className="py-16 md:py-20">
        <h2 className="text-2xl font-semibold md:text-3xl">Gallery</h2>
        <p className="mt-2 text-zinc-300">Placeholder tiles—swap with real photos later.</p>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {tiles.map((n) => (
            <div
              key={n}
              className="group relative aspect-square overflow-hidden rounded-3xl border border-white/10 bg-white/5"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/20 via-transparent to-cyan-400/10" />
              <div className="absolute bottom-3 left-3 text-xs text-zinc-200 opacity-80">
                Moment {n}
              </div>
              <div className="absolute inset-0 scale-100 transition group-hover:scale-105" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
