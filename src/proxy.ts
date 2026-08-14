import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, isValidSession } from "@/lib/admin-auth";

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

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/products/:path*", "/api/upload/:path*"],
};
