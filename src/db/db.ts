import { drizzle } from "drizzle-orm/node-postgres";
import { users as userSchema, dates as dateSchema } from "./schema";
import { usersRelations } from "./relations";
import pg from "pg";
//import { integer } from "drizzle-orm/sqlite-core";
import { eq } from "drizzle-orm/expressions";
import { InsertUser, InsertDate } from "../app/types";

const { Pool } = pg;

export const db = drizzle({
  client: new Pool({
    //connectionString: Deno.env.get("DATABASE_URL"),
    connectionString: process.env.DATABASE_URL,
  }),
  schema: { userSchema, usersRelations, dateSchema },
});

export async function findUserById(userId: number) {
  const foundUsers = await db
    .select()
    .from(userSchema)
    .where(eq(userSchema.id, userId))
    .limit(1);
  return foundUsers[0] || null;
}

export async function findUserByEmail(email: string) {
  const foundUsers = await db
    .select()
    .from(userSchema)
    .where(eq(userSchema.email, email))
    .limit(1);
  return foundUsers[0] || null;
}

export async function insertUser(userObj: InsertUser) {
  return await db.insert(userSchema).values(userObj);
}

export async function insertDate(dateObj: InsertDate) {
  return await db.insert(dateSchema).values(dateObj);
}

export async function deleteUserById(userId: number) {
  return await db.delete(userSchema).where(eq(userSchema.id, userId));
}
