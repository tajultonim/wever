import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decode, encode } from "./helper/jwt/crypto";

export async function middleware(request: NextRequest) {
  let jwt = request.cookies.get("access-token")?.value;
  let cbUrl = request.nextUrl.searchParams.get("callbackUrl");
  let isrefresh = request.nextUrl.pathname.endsWith("/token-refresh");
  let payload = await decode(jwt);


  if (!payload && !isrefresh) {
    return NextResponse.redirect(
      new URL(
        `/token-refresh?callbackUrl=${encodeURIComponent(request.url)}`,
        request.url
      )
    );
  }

  if (isrefresh && !payload) {
    let refresh_token = request.cookies.get("refresh-token")?.value;
    if (!refresh_token) {
      return NextResponse.redirect(
        new URL(
          `/auth/login?callbackUrl=${encodeURIComponent(cbUrl ? cbUrl : "/")}`,
          request.url
        )
      );
    }
    let rjwt = await decode(refresh_token);
    if (rjwt && rjwt.type == "refresh-token" && rjwt.context) {
      let ajwt = await encode("access-token", rjwt.context);
      let response = NextResponse.redirect(
        new URL(cbUrl ? cbUrl : "/", request.url)
      );
      response.cookies.set({
        name: "access-token",
        value: ajwt,
        maxAge: 2 * 60,
      });

      return response;
    } else {
      return NextResponse.redirect(
        new URL(
          `/auth/login?callbackUrl=${encodeURIComponent(cbUrl ? cbUrl : "/")}`,
          request.url
        )
      );
    }
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|login|signup|icons|manifest.json|auth|img|sw.js|workbox-[a-zA-Z0-9_]+.js).*)",
  ],
};
