import { drizzle } from "drizzle-orm/node-postgres";
import { users as userSchema, dates as dateSchema } from "./schema";
import { usersRelations } from "./relations";
import pg from "pg";
import { integer } from "drizzle-orm/sqlite-core";
import { eq } from "drizzle-orm/expressions";

const { Pool } = pg;

export const db = drizzle({
  client: new Pool({
    //connectionString: Deno.env.get("DATABASE_URL"),
    connectionString: process.env.DATABASE_URL,
  }),
  schema: { userSchema, usersRelations, dateSchema },
});

//export async function insertUser(userObj: typeof userSchema) {
//  //no something different
//  // i need copilot to give me something different and help me with this please
//  return await db.insert(userSchema).values(userObj);
//}

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

// this does not work i dont know what i was thinking because obviously
// people can have the same first name or the same last name.
// I'm looking at you David Smith
//
//export async function findUserByFirstName(firstName: string) {
//  return await db
//    .select()
//    .from(userSchema)
//    .where(eq(userSchema.firstName, firstName));
//}
//
//export async function findUserByLastName(lastName: string) {
//  return await db
//    .select()
//    .from(userSchema)
//    .where(eq(userSchema.lastName, lastName));
//}

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
