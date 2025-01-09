import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

export default NextAuth(authConfig).auth;

//const { auth } = NextAuth(authConfig);
//export default auth((req) => {
//  const { nextUrl } = req;
//  const isLoggedIn = !!req.auth?.user;
//
//});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
