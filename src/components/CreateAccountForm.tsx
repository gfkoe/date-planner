"use client";
import { Icons } from "@/components/icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { createAccount } from "@/lib/actions";

export default function CreateAccountForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    createAccount,
    undefined,
  );

  return (
    <div>
      <form action={formAction}>
        <div>
          <div>
            <Label htmlFor="firstName">First Name</Label>
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

            <Label htmlFor="lastName">Last Name</Label>
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

            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="example@email.com"
              type="email"
              name="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isPending}
            />

            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="password"
              type="password"
              name="password"
              autoCapitalize="none"
              autoComplete="current-password"
              autoCorrect="off"
              disabled={isPending}
            />
          </div>

          <Button disabled={isPending}>
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Create Account
          </Button>
          <div>
            {errorMessage && (
              <>
                <p>{errorMessage}</p>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
