import { drizzle } from "drizzle-orm/node-postgres";
import { users as userSchema, dates as dateSchema } from "./schema.ts";
import { usersRelations } from "./relations.ts";
import pg from "pg";
import { integer } from "drizzle-orm/sqlite-core";
import { eq } from "drizzle-orm/expressions";

const { Pool } = pg;

export const db = drizzle({
  client: new Pool({
    connectionString: Deno.env.get("DATABASE_URL"),
  }),
  schema: { userSchema, usersRelations, dateSchema },
});

export async function insertUser(userObj: typeof userSchema) {
  return await db.insert(userSchema).values(userObj);
}

export async function findUserById(userId: typeof integer) {
  return await db.select().from(userSchema).where(eq(userSchema.id, userId));
}

export async function findUserByEmail(email: string) {
  return await db.select().from(userSchema).where(eq(userSchema.email, email));
}

export async function findUserByFirstName(firstName: string) {
  return await db
    .select()
    .from(userSchema)
    .where(eq(userSchema.firstName, firstName));
}

export async function findUserByLastName(lastName: string) {
  return await db
    .select()
    .from(userSchema)
    .where(eq(userSchema.lastName, lastName));
}

export async function deleteUserById(userId: typeof integer) {
  return await db.delete(userSchema).where(eq(userSchema.id, userId));
}

export async function updateUserId(
  userId: typeof integer,
  userObj: typeof userSchema,
) {
  return await db
    .update(userSchema)
    .set(userObj)
    .where(eq(userSchema.id, userId));
}

export async function insertDate(dateObj: typeof dateSchema) {
  return await db.insert(dateSchema).values(dateObj);
}
