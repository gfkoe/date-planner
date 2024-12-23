import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial().primaryKey().notNull(),
  name: text(),
  email: text().unique().notNull(),
  password: text().notNull(),
});
