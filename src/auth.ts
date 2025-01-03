import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import "next-auth/jwt";
import { z } from "zod";
import Credentials from "next-auth/providers/credentials";
import { findUserByEmail } from "@/db/db";
import bcrypt from "bcrypt";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,

  providers: [
    Credentials({
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
          const user = await findUserByEmail(email);
          const checkPassword = password === user.password;
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
