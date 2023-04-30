import NextAuth from "next-auth";
import { SupabaseAdapter } from "@next-auth/supabase-adapter";
import GoogleProvider from "next-auth/providers/google";
import { SignJWT, jwtVerify } from "jose";
import { JWTDecodeParams, JWTEncodeParams } from "next-auth/jwt";

export default NextAuth({
  session: {
    strategy: "jwt",
  },

  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: false,
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
  },

  jwt: {
    maxAge: 60 * 60 * 24 * 30,
    async encode(params: JWTEncodeParams) {
      let jwt = await new SignJWT(params.token || {})
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("30d")
        .sign(new TextEncoder().encode(params.secret as string));
      return jwt;
    },
    async decode(params: JWTDecodeParams) {
      const jwtDecoded = await jwtVerify(
        params.token as string,
        new TextEncoder().encode(params.secret as string)
      );
      return jwtDecoded.payload;
    },
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH2_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH2_CLIENT_SECRET || "",
    }),
  ],

  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_DB_URL || "",
    secret: process.env.DB_SECRET || "",
  }),
  callbacks: {
    async signIn({ account, profile }) {
      let p: any = profile;
      if (account?.provider === "google") {
        return p.email_verified && p.email.endsWith("@gmail.com");
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
  },
});
