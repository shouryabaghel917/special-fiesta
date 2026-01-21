"use client";

import { useMemo, useState } from "react";
import { Container } from "./ui/container";

type Status = "idle" | "loading" | "success" | "error";

export function RSVP() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [guests, setGuests] = useState(1);
  const [note, setNote] = useState("");

  const disabled = useMemo(() => status === "loading", [status]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, guests, note }),
      });

      const data = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.error || "Could not submit RSVP.");
        return;
      }

      setStatus("success");
      setMessage("RSVP received! See you at the fiesta ✨");
      setName("");
      setEmail("");
      setGuests(1);
      setNote("");
    } catch {
      setStatus("error");
      setMessage("Network error. Try again.");
    }
  }

  return (
    <section id="rsvp" className="border-t border-white/10">
      <Container className="py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-2xl font-semibold md:text-3xl">RSVP</h2>
            <p className="mt-2 text-zinc-300 leading-relaxed">
              Reserve your spot. This uses a simple API route you can extend into a real backend later.
            </p>
          </div>

          <form
            onSubmit={submit}
            className="rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <div className="grid gap-4">
              <label className="grid gap-2 text-sm">
                <span className="text-zinc-200">Name</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-2xl border border-white/10 bg-zinc-950/50 px-4 py-3 text-zinc-50 outline-none focus:border-fuchsia-300/60"
                  placeholder="Your name"
                  required
                  disabled={disabled}
                />
              </label>

              <label className="grid gap-2 text-sm">
                <span className="text-zinc-200">Email</span>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="rounded-2xl border border-white/10 bg-zinc-950/50 px-4 py-3 text-zinc-50 outline-none focus:border-fuchsia-300/60"
                  placeholder="you@example.com"
                  required
                  disabled={disabled}
                />
              </label>

              <label className="grid gap-2 text-sm">
                <span className="text-zinc-200">Guests</span>
                <input
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  type="number"
                  min={1}
                  max={10}
                  className="rounded-2xl border border-white/10 bg-zinc-950/50 px-4 py-3 text-zinc-50 outline-none focus:border-fuchsia-300/60"
                  disabled={disabled}
                />
              </label>

              <label className="grid gap-2 text-sm">
                <span className="text-zinc-200">Note (optional)</span>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="min-h-[96px] rounded-2xl border border-white/10 bg-zinc-950/50 px-4 py-3 text-zinc-50 outline-none focus:border-fuchsia-300/60"
                  placeholder="Dietary preferences, song requests…"
                  disabled={disabled}
                />
              </label>

              <button
                type="submit"
                disabled={disabled}
                className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-zinc-950 hover:bg-zinc-100 disabled:opacity-60 transition"
              >
                {status === "loading" ? "Submitting..." : "Submit RSVP"}
              </button>

              {message ? (
                <p
                  className={[
                    "text-sm",
                    status === "success" ? "text-emerald-300" : "",
                    status === "error" ? "text-rose-300" : "",
                  ].join(" ")}
                >
                  {message}
                </p>
              ) : null}
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}
