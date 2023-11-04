import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { decode, encode } from "./helper/jwt/crypto";
import client from "./helper/apollo/serverinit";
import { gql } from "@apollo/client";

export async function middleware(request: NextRequest) {
  let jwt = request.cookies.get("access-token")?.value;
  let cbUrl = request.nextUrl.searchParams.get("callbackUrl");
  let isrefresh = request.nextUrl.pathname.endsWith("/token-refresh");
  let payload = await decode(jwt);

  if (request.nextUrl.pathname.endsWith("/a/logout")) {
    let response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.set("refresh-token", "", { path: "/token-refresh" });
    response.cookies.set("access-token", "", { path: "/" });
    return response;
  }

  if (!payload && !isrefresh) {
    return NextResponse.redirect(
      new URL(
        `/token-refresh?callbackUrl=${encodeURIComponent(request.url)}`,
        request.url
      )
    );
  }

  if (isrefresh) {
    let refresh_token = request.cookies.get("refresh-token")?.value;
    if (!refresh_token) {
      if (request.nextUrl.searchParams.get("json")) {
        return NextResponse.json({
          "access-token": "",
        });
      }
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

      if (request.nextUrl.searchParams.get("json")) {
        return NextResponse.json({
          "access-token": ajwt,
        });
      }

      return response;
    } else {
      if (request.nextUrl.searchParams.get("json")) {
        return NextResponse.json({
          "access-token": "",
        });
      }
      return NextResponse.redirect(
        new URL(
          `/auth/login?callbackUrl=${encodeURIComponent(cbUrl ? cbUrl : "/")}`,
          request.url
        )
      );
    }
  }

  if (payload && !payload?.context?.roles.includes("user")) {
    return NextResponse.redirect(
      new URL(
        `/auth/disabled?callbackUrl=${encodeURIComponent(cbUrl ? cbUrl : "/")}`,
        request.url
      )
    );
  }

  if (payload && !payload?.context?.roles.includes("email_verified")) {

    if (!payload.context) {
      return;
    }
    try {
      let q = gql`
        query Query($input: IDorEmail) {
          get_verification_sent(input: $input)
        }
      `;
      let sentcode = await client.query({
        query: q,
        variables: {
          input: {
            id: payload.context.user.id,
          },
        },
      });

      if (!sentcode.data.get_verification_sent) {
        let q = gql`
          mutation Send_verification_request($input: IDorEmail!) {
            send_verification_request(input: $input)
          }
        `;
        let res = await client.mutate({
          mutation: q,
          variables: {
            input: {
              id: payload.context.user.id,
            },
          },
        });
      }
      return NextResponse.redirect(
        new URL(
          `/auth/verify-email?callbackUrl=${encodeURIComponent(
            cbUrl ? cbUrl : "/"
          )}`,
          request.url
        )
      );
    } catch (error) {
      console.log(error);

      return NextResponse.redirect(
        new URL(
          `/auth/verify-email?callbackUrl=${encodeURIComponent(
            cbUrl ? cbUrl : "/"
          )}`,
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
