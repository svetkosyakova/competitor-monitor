import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/dashboard", "/monitoring"];

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const subscription = req.cookies.get("subscription")?.value;

  if (protectedPaths.some((path) => url.pathname.startsWith(path))) {
    if (subscription !== "active") {
      url.pathname = "/pricing";
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/monitoring/:path*"],
};