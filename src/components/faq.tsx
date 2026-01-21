import { Container } from "./ui/container";

const faqs = [
  { q: "Can I use this for any event?", a: "Yes—rename, edit sections, ship." },
  { q: "Does RSVP save to a database?", a: "By default it stores JSON locally (dev). You can replace with DB easily." },
  { q: "Is it mobile-friendly?", a: "Fully responsive, built with Tailwind." },
];

export function FAQ() {
  return (
    <section id="faq" className="border-t border-white/10">
      <Container className="py-16 md:py-20">
        <h2 className="text-2xl font-semibold md:text-3xl">FAQ</h2>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {faqs.map((f) => (
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
