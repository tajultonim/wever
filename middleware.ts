import withAuth, { NextAuthMiddlewareOptions } from "next-auth/middleware";
import { JWTDecodeParams } from "next-auth/jwt";
import { jwtVerify } from "jose";

export default withAuth({
  jwt: {
    async decode(params: JWTDecodeParams) {
      const jwtDecoded = await jwtVerify(
        params.token as string,
        new TextEncoder().encode(params.secret as string)
      );
      return {
        payload: jwtDecoded.payload,
        protectedHeader: jwtDecoded.protectedHeader,
      };
    },
  },
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|signin|icons|manifest.json|img|sw.js|workbox-[a-zA-Z0-9_]+\.js).*)",
  ],
};
