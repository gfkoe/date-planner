import { pgTable, serial, text, unique } from "drizzle-orm/pg-core";
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

export type User = InferSelectModel<typeof users>;
export type Date = InferSelectModel<typeof dates>;
