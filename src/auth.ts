import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import { findUserByEmail } from "@/db/db";
import bcrypt from "bcrypt";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,

  providers: [
    Credentials({
      async authorize({
        email,
        password,
      }: {
        email: string;
        password: string;
      }) {
        const user = await findUserByEmail(email);
        if (!user) {
          return null;
        }
        const checkPassword = await bcrypt.compare(password, user.password!);

        if (checkPassword) {
          return { ...user, id: user.id.toString() };
        }
      },
    }),
  ],
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
