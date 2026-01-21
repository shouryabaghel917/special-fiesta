import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

type RSVP = {
  name: string;
  email: string;
  guests: number;
  note?: string;
  createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "rsvps.json");

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      name?: string;
      email?: string;
      guests?: number;
      note?: string;
    };

    const name = (body.name || "").trim();
    const email = (body.email || "").trim();
    const guests = Number.isFinite(body.guests) ? Number(body.guests) : 1;

    if (!name || !email) {
      return NextResponse.json({ ok: false, error: "Name and email are required." }, { status: 400 });
    }
    if (guests < 1 || guests > 10) {
      return NextResponse.json({ ok: false, error: "Guests must be between 1 and 10." }, { status: 400 });
    }

    const entry: RSVP = {
      name,
      email,
      guests,
      note: (body.note || "").trim() || undefined,
      createdAt: new Date().toISOString(),
    };

    await fs.mkdir(DATA_DIR, { recursive: true });

    let existing: RSVP[] = [];
    try {
      const raw = await fs.readFile(DATA_FILE, "utf8");
      existing = JSON.parse(raw) as RSVP[];
      if (!Array.isArray(existing)) existing = [];
    } catch {
      // file doesn't exist yet
    }

    existing.unshift(entry);
    await fs.writeFile(DATA_FILE, JSON.stringify(existing, null, 2), "utf8");

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Something went wrong." }, { status: 500 });
  }
}
