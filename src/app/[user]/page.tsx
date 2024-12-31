"use client";
import React from "react";

import { useEffect, useState } from "react";
import { User } from "../types.ts";
import Link from "next/link";

type RouteParams = { params: Promise<{ dinosaur: string }> };

export default function User({ params }: RouteParams) {
  const selectedUser = params.then((params) => params.user);

  const [user, setUser] = useState<User>({ firstName: "", lastName: "" });

  useEffect(() => {
    (async () => {
      const resp = await fetch(`/api/users/${await selectedUser}`);
      const u = (await resp.json()) as User;
      setUser(u);
    })();
  }, []);

  return (
    <main>
      <h1>{user.firstName}</h1>
      <Link href="/">Back to all dinosaurs</Link>
    </main>
  );
}
