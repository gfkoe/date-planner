import { relations } from "drizzle-orm/relations";
import { users as userSchema } from "./schema";

export const usersRelations = relations(userSchema, ({ one, many }) => ({
  friends: many(userSchema),
  partner: one(userSchema),
}));
