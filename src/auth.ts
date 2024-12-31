import NextAuth from "next-auth";
import "next-auth/jwt";

import Google from "next-auth/providers/google";
import { UnstorageAdapter } from "@auth/unstorage-adapter";

export const { handlers, auth, signin, signout } = NextAuth({
  adapter: UnstorageAdapter(),

  providers: [Google],

  basepath: "/api/auth",
  session: { strategy: "jwt" },

  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname === "/api/auth/signin") {
        return true;
      } else {
        return !!auth;
      }
    },
    jwt({ token, trigger, session, account }) {
      if (account) {
        return { ...token, accessToken: account.accessToken };
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.accessToken) session.accessToken = token.accessToken;

      return session;
    },
  },
});

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}
