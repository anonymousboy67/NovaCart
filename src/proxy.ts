import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, isValidSession } from "@/lib/admin-auth";

const COMING_SOON_BYPASS_COOKIE = "pm_dev_access";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const authed = await isValidSession(req.cookies.get(ADMIN_COOKIE)?.value);

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!authed) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  if (
    (pathname.startsWith("/api/products") || pathname.startsWith("/api/upload")) &&
    req.method !== "GET" &&
    !authed
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Visiting /dashboard unlocks the real site for this browser, then sends
  // you to the homepage (which will now render normally instead of Coming Soon).
  if (pathname === "/dashboard") {
    const res = NextResponse.redirect(new URL("/", req.url));
    res.cookies.set(COMING_SOON_BYPASS_COOKIE, "1", {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    return res;
  }

  // Already unlocked (dev/team member) -> show the real site.
  if (req.cookies.get(COMING_SOON_BYPASS_COOKIE)?.value === "1") {
    return NextResponse.next();
  }

  // Coming Soon mode off -> show the real site to everyone.
  if (process.env.COMING_SOON !== "true") {
    return NextResponse.next();
  }

  // Never mask admin or API routes behind Coming Soon.
  if (pathname.startsWith("/admin") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  return NextResponse.rewrite(new URL("/coming-soon", req.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|coming-soon).*)"],
};
