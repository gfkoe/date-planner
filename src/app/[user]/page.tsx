"use client";
import React from "react";

import { useEffect, useState } from "react";
import { User } from "../types.ts";
import Link from "next/link";

type RouteParams = { params: Promise<{ user: string }> };

export default function User({ params }: RouteParams) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const resp = await fetch(`/api/users/${userId}`);
      const userData = await resp.json();
      setUser(userData);
    })();
  }, []);

  return (
    <main>
      <h1>{user.firstName}</h1>
      <Link href="/">Back to all dinosaurs</Link>
    </main>
  );
}
