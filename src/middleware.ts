import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/adminAuth";

const COOKIE_NAME = "sf_admin";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect /admin routes except /admin/login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const cookieSecret = process.env.ADMIN_COOKIE_SECRET;
    if (!cookieSecret) {
      // Fail closed in production; in dev, still block
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    const token = req.cookies.get(COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    const v = verifyAdminSession(cookieSecret, token, MAX_AGE_SECONDS);
    if (!v.ok) {
      const res = NextResponse.redirect(new URL("/admin/login", req.url));
      res.cookies.delete(COOKIE_NAME);
      return res;
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};
