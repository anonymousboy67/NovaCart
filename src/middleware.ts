import { NextResponse, type NextRequest } from "next/server";

const BYPASS_COOKIE = "pm_dev_access";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Visiting /dashboard unlocks the real site for this browser, then sends
  // you to the homepage (which will now render normally instead of Coming Soon).
  if (pathname === "/dashboard") {
    const res = NextResponse.redirect(new URL("/", req.url));
    res.cookies.set(BYPASS_COOKIE, "1", {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    return res;
  }

  // Already unlocked (dev/team member) -> show the real site.
  if (req.cookies.get(BYPASS_COOKIE)?.value === "1") {
    return NextResponse.next();
  }

  // Coming Soon mode off -> show the real site to everyone.
  if (process.env.COMING_SOON !== "true") {
    return NextResponse.next();
  }

  return NextResponse.rewrite(new URL("/coming-soon", req.url));
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api|coming-soon).*)",
  ],
};
