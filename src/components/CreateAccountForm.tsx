"use client";
import { Icons } from "@/components/icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { createAccount } from "@/lib/actions";
import Link from "next/link";

export default function CreateAccountForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    createAccount,
    undefined,
  );

  return (
    <div className="w-1/5">
      <form action={formAction}>
        <div>
          <div>
            {errorMessage && (
              <>
                <p className="text-center text-red-500">{errorMessage}</p>
              </>
            )}
          </div>
          <div className="text-3xl">Create Account Below</div>
          <div className="mt-2">
            <Label className="text-2xl" htmlFor="firstName">
              First Name
            </Label>
            <Input
              id="firstName"
              placeholder="John"
              type="text"
              name="firstName"
              autoCapitalize="none"
              autoComplete="firstName"
              autoCorrect="off"
              disabled={isPending}
            />

            <Label className="text-2xl" htmlFor="lastName">
              Last Name
            </Label>
            <Input
              id="lastName"
              placeholder="Doe"
              type="text"
              name="lastName"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isPending}
            />

            <Label className="text-2xl" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Example@email.com"
              type="email"
              name="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isPending}
            />

            <Label className="text-2xl" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              name="password"
              autoCapitalize="none"
              autoComplete="current-password"
              autoCorrect="off"
              disabled={isPending}
            />
          </div>

          <div className="w-full mt-2">
            <Button className="w-full" disabled={isPending}>
              {isPending && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create Account
            </Button>
          </div>
          <div className="w-full mt-2 text-center">
            <div>
              {"Already a member? "}
              <Link href="/login">
                <Button variant="link">Sign In</Button>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
