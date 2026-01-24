import { NextResponse } from "next/server";
import { signAdminSession } from "@/lib/adminAuth";

const COOKIE_NAME = "sf_admin";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

export async function POST(req: Request) {
  const adminSecret = process.env.ADMIN_SECRET;
  const cookieSecret = process.env.ADMIN_COOKIE_SECRET;

  if (!adminSecret || !cookieSecret) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  const form = await req.formData();
  const password = String(form.get("password") || "");

  if (password !== adminSecret) {
    // Redirect back to login (avoid leaking info)
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  const token = signAdminSession(cookieSecret, { iat: Math.floor(Date.now() / 1000) });

  const res = NextResponse.redirect(new URL("/admin", req.url));
  res.cookies.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: MAX_AGE_SECONDS
  });

  return res;
}
