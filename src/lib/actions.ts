"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { getUser, insertAndCreateUser } from "@/db/db";
import { redirect } from "next/navigation";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
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
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = "user";
  const user = await getUser(email);
  if (user.length > 0) {
    return "User already exists";
  } else {
    await insertAndCreateUser({ firstName, lastName, email, password, role });
    redirect("/login");
  }
}
