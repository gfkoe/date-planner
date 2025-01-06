"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { getUser, insertAndCreateUser } from "@/db/db";
import { redirect } from "next/navigation";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  console.log(formData);
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid Credentials";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function createAccount(
  prevState: string | undefined,
  formData: FormData,
) {
  let firstName = formData.get("firstName") as string;
  let lastName = formData.get("lastName") as string;
  let email = formData.get("email") as string;
  let password = formData.get("password") as string;
  let role = "user";
  console.log(firstName, lastName, email, password, role);
  const user = await getUser(email);
  if (user.length > 0) {
    return "User already exists";
  } else {
    await insertAndCreateUser({ firstName, lastName, email, password, role });
    redirect("/login");
  }
}
