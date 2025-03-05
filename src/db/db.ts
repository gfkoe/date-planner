import { drizzle } from "drizzle-orm/node-postgres";
import {
  users as userSchema,
  dates as dateSchema,
  friendships as friendshipSchema,
} from "./schema";
import { usersRelations } from "./relations";
import pg from "pg";
//import { integer } from "drizzle-orm/sqlite-core";
import { eq, and, or, ilike } from "drizzle-orm/expressions";
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

//user is the person who is logged in
export async function sendFriendRequest(userId: number, friendId: number) {
  return await db.insert(friendshipSchema).values({
    userId,
    friendId,
    status: "pending",
  });
}

//user is the person who is logged in
export async function acceptFriendRequest(userId: number, friendId: number) {
  const updatedRows = await db
    .update(friendshipSchema)
    .set({ status: "accepted" })
    .where(
      and(
        eq(friendshipSchema.userId, userId), // Request sender
        eq(friendshipSchema.friendId, friendId), // Request recipient
        eq(friendshipSchema.status, "pending"),
      ),
    );

  if (updatedRows.rowCount === 0) {
    throw new Error("Friend request not found or already accepted.");
  }

  // Add reciprocal friendship
  await db.insert(friendshipSchema).values({
    userId: friendId,
    friendId: userId,
    status: "accepted",
  });
}
//user is the person who is logged in
export async function getFriendshipStatus(userId: number, friendId: number) {
  const [friendship] = await db
    .select()
    .from(friendshipSchema)
    .where(
      or(
        and(
          eq(friendshipSchema.userId, userId),
          eq(friendshipSchema.friendId, friendId),
        ),
        and(
          eq(friendshipSchema.userId, friendId),
          eq(friendshipSchema.friendId, userId),
        ),
      ),
    );

  return friendship ? friendship.status : "none";
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

export async function searchForUsers(searchQuery: string) {
  const searchTerms = searchQuery.split(" ").map((term) => term.toLowerCase());

  if (searchTerms.length === 0) {
    return [];
  }

  const searchClause = searchTerms.map((term) => {
    const pattern = `%${term}%`;
    return or(
      ilike(userSchema.firstName, pattern),
      ilike(userSchema.lastName, pattern),
    );
  });

  const foundUsers = await db
    .select()
    .from(userSchema)
    .where(and(...searchClause));

  return foundUsers || [];
}
