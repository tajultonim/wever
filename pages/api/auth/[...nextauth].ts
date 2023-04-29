import NextAuth from "next-auth";
import { SupabaseAdapter } from "@next-auth/supabase-adapter";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  session: {
    strategy: "jwt",
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
      console.log(p.email_verified && p.email.endsWith("@gmail.com"));
      if (account?.provider === "google") {
        return p.email_verified && p.email.endsWith("@gmail.com");
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
  },
});
