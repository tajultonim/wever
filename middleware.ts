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


export const config={
  matcher:["/","/instamatch"]
}