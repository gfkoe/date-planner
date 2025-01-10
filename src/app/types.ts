export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
};

export type Date = {
  id: number;
  description: string;
  location: string;
  date: string;
};

export type InsertUser = Omit<User, "id">;
export type InsertDate = Omit<Date, "id">;

declare module "next-auth" {
  interface User extends Omit<import("./types").User, "password"> {} // Exclude password from User type in the session
  interface Session {
    user?: User; // Use the extended User type in Session
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number | string;
    email: string;
    firstName: string;
    lastName: string;
    role: string; // Include role in JWT
  }
}
