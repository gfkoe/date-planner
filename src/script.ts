import { findUserByEmail, insertUser, deleteUserById } from "./db/db.ts";

await deleteUserById(1);

await insertUser({
  firstName: "Alice",
  lastName: "Doe",
  email: "email@email.com",
  password: "pass",
});
const res = await findUserByEmail("email@email.com");

const newUser = {
id: res.id,
firstname: "Gabriel",
lastName: "Koeb",
email: "test@test.com"
pass:"pass"
}
