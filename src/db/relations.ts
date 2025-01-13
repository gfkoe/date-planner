import { relations } from "drizzle-orm/relations";
import { users as userSchema } from "./schema";
import { friendships as friendshipSchema } from "./schema";

export const usersRelations = relations(userSchema, ({ one, many }) => ({
  friends: many(friendshipSchema),
  partner: one(userSchema),
}));
