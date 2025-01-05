import {
  findUserByEmail,
  insertAndCreateUser,
  deleteUserById,
} from "./db/db.ts";

await deleteUserById(1);

await insertAndCreateUser({
  firstName: "Alice",
  lastName: "Doe",
  email: "test@email.com",
  password: "pass",
  role: "user",
});
const res = await findUserByEmail("email@email.com");
console.log(res);

//const newUser = {
//  id: res.id,
//  firstname: "Gabriel",
//  lastName: "Koeb",
//  email: "test@test.com",
//  pass: "pass",
//};
