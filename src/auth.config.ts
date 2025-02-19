import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLoginPage = nextUrl.pathname.startsWith("/login");
      const isOnHome = nextUrl.pathname.startsWith("/home");
      const availPages = ["/login", "/about"];
      if (
        availPages.some((page) => nextUrl.pathname.startsWith(page)) &&
        !isLoggedIn
      ) {
        return true;
      }
      if (isOnLoginPage && isLoggedIn) {
        return Response.redirect(new URL("/home", nextUrl));
      }
      return !isOnHome || isLoggedIn; // Redirect unauthenticated users to login page
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
