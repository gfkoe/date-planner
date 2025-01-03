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
      //name: "Credentials",
      //credentials: {
      //  email: {
      //    label: "Email",
      //    type: "email",
      //    placeholder: "example@email.com",
      //  },
      //  password: {
      //    label: "Password",
      //    type: "password",
      //    placeholder: "Password",
      //  },
      //},
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await findUserByEmail(email);
          if (!user) {
            return null;
          }
          const checkPassword = await bcrypt.compare(password, user.password);
          if (checkPassword) {
            return { ...user, id: user.id.toString() };
          }
          return null;
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
