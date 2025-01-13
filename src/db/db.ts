import { drizzle } from "drizzle-orm/node-postgres";
import {
  users as userSchema,
  dates as dateSchema,
  friendships as friendshipSchema,
} from "./schema";
import { usersRelations } from "./relations";
import pg from "pg";
//import { integer } from "drizzle-orm/sqlite-core";
import { eq, and } from "drizzle-orm/expressions";
import { InsertUser, InsertDate } from "../app/types";
import { genSalt, hash } from "bcrypt";

const { Pool } = pg;

export const db = drizzle({
  client: new Pool({
    //connectionString: Deno.env.get("DATABASE_URL"),
    connectionString: process.env.DATABASE_URL,
  }),
  schema: { userSchema, usersRelations, dateSchema },
});

//gets list of users
export async function getUser(email: string) {
  return await db.select().from(userSchema).where(eq(userSchema.email, email));
}

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

export async function insertAndCreateUser(userObj: InsertUser) {
  const salt = await genSalt(10);
  const hashedPassword = await hash(userObj.password, salt);
  const userToInsert = {
    ...userObj,
    password: hashedPassword,
    role: "user",
  };

  return await db.insert(userSchema).values(userToInsert);
}

export async function insertDate(dateObj: InsertDate) {
  return await db.insert(dateSchema).values(dateObj);
}

export async function deleteUserById(userId: number) {
  return await db.delete(userSchema).where(eq(userSchema.id, userId));
}

export async function sendFriendRequest(userId: number, friendId: number) {
  return await db.insert(friendshipSchema).values({
    userId,
    friendId,
    status: "pending",
  });
}

export async function acceptFriendRequest(userId: number, friendId: number) {
  await db
    .update(friendshipSchema)
    .set({ status: "accepted" })
    .where(
      and(
        eq(friendshipSchema.userId, friendId),
        eq(friendshipSchema.friendId, userId),
      ),
    );

  await db.insert(friendshipSchema).values({
    userId,
    friendId,
    status: "accepted",
  });
}

export async function getFriends(userId: number) {
  const friends = await db
    .select({
      friendId: friendshipSchema.friendId,
      firstName: userSchema.firstName,
      lastName: userSchema.lastName,
      email: userSchema.email,
    })
    .from(friendshipSchema)
    .innerJoin(userSchema, eq(friendshipSchema.friendId, userSchema.id))
    .where(
      and(
        eq(friendshipSchema.userId, userId),
        eq(friendshipSchema.status, "accepted"),
      ),
    );

  return friends || [];
}
