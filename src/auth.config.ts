import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnHome = nextUrl.pathname.startsWith("/home");
      const isOnLoginPage = nextUrl.pathname.startsWith("/login");
      if (isOnHome) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }
      if (isOnLoginPage) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/home", nextUrl));
        } // Redirect authenticated users to home page
        return true;
      }
      return !isOnHome || isLoggedIn;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = Number(user.id);
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
