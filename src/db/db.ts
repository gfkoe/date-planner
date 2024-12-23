import { drizzle } from "drizzle-orm/node-postgres";
import { users as userSchema } from "./schema.ts";
import { usersRelations } from "./relations.ts";
import pg from "pg";
import { integer } from "drizzle-orm/sqlite-core";
import { eq } from "drizzle-orm/expressions";

const { Pool } = pg;

export const db = drizzle({
  client: new Pool({
    connectionString: Deno.env.get("DATABASE_URL"),
  }),
  schema: { userSchema, usersRelations },
});

export async function insertUser(userObj: typeof userSchema) {
  return await db.insert(userSchema).values(userObj);
}

export async function findUserById(userId: typeof integer) {
  return await db.select().from(userSchema).where(eq(userSchema.id, userId));
}
