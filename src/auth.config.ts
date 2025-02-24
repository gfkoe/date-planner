import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLoginPage = nextUrl.pathname.startsWith("/login");
      const availPages = ["/login", "/register", "/about"];

      if (isOnLoginPage && isLoggedIn) {
        return Response.redirect(new URL("/home", nextUrl));
      }
      if (
        !isLoggedIn &&
        !availPages.some((page) => nextUrl.pathname.startsWith(page))
      ) {
        // Redirect unauthenticated users to login page
        return Response.redirect(new URL("/login", nextUrl));
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id.toString();
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id.toString(),
          email: token.email,
          emailVerified: new Date(),
          firstName: token.firstName,
          lastName: token.lastName,
          role: token.role,
        };
      }
      return session;
    },
  },

  providers: [],
} satisfies NextAuthConfig;
