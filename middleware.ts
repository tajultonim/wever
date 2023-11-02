import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decode, encode } from "./helper/jwt/crypto";
import { generateSecret } from "jose";

export async function middleware(request: NextRequest) {
  let jwt = request.cookies.get("access-token")?.value;
  if (!jwt) {
    return NextResponse.redirect(
      new URL(
        `/auth/login?callbackUrl=${encodeURIComponent(request.url)}`,
        request.url
      )
    );
  }
  let payload = await decode(jwt, process.env.AUTH_SECRET as string);
  if (!payload) {
    return NextResponse.redirect(
      new URL(
        `/auth/login?callbackUrl=${encodeURIComponent(request.url)}`,
        request.url
      )
    );
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|login|signup|icons|manifest.json|auth|img|sw.js|workbox-[a-zA-Z0-9_]+.js).*)",
  ],
};
