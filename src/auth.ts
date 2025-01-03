import * as NextAuth from "next-auth";
import "next-auth/jwt";

//import Google from "next-auth/providers/google";
import * as CredentialsProvider from "next-auth/providers/credentials";
import { findUserByEmail } from "./db/db.ts";
//@ts-expect-error
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

export const { handlers, auth, signin, signout } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@email.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        try {
          if (!credentials) {
            throw new Error("No credentials to log in as");
          }
          const { email, password } = credentials;
          const users = await findUserByEmail(email);
          const user = users[0];
          const checkPassword = await bcrypt.compare(password, user.password);
          if (!checkPassword) {
            throw new Error("Password is incorrect");
          }
          return user as any;
        } catch (e: any) {
          throw new Error(e.message);
        }
      },
    }),
  ],
  basepath: "/src/auth",
  session: { strategy: "jwt" },

  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname === "./middleware") return !!auth;
      return true;
    },
    jwt({ token, trigger, session, account }) {
      if (trigger === "update") {
        token.name = session.user.name;
      }
      if (account?.provider === "Credentials") {
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
