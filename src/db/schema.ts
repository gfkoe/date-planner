import { pgTable, serial, text, date } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey().notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text().unique().notNull(),
  password: text().notNull(),
});

export const dates = pgTable("dates", {
  id: serial().primaryKey().notNull(),
  description: text(),
  location: text(),
  date: date().notNull(),
});
