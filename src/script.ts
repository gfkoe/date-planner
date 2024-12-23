import { findUserById, insertUser } from "./db/db.ts";

await insertUser({
  id: 1,
  name: "Alice",
  email: "email@email.com",
  password: "pass",
});
const res = await findUserById(1);
