import {
  pgTable,
  serial,
  integer,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";
import { InferSelectModel } from "drizzle-orm";

export const dates = pgTable("dates", {
  id: serial().primaryKey().notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  date: text().notNull(),
});

export const users = pgTable(
  "users",
  {
    id: serial().primaryKey().notNull(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: text().notNull(),
    password: text().notNull(),
    role: text().notNull(),
  },
  (table) => [unique("users_email_unique").on(table.email)],
);

export const friendships = pgTable(
  "friendships",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    friendId: integer("friend_id")
      .notNull()
      .references(() => users.id),
    status: text("status").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    unique("friendships_user_id_friend_id_unique").on(
      table.userId,
      table.friendId,
    ),
  ],
);

export type User = InferSelectModel<typeof users>;
export type Date = InferSelectModel<typeof dates>;
