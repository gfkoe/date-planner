"use client";
import React from "react";

import { useEffect, useState, use } from "react";
import { User } from "../types.ts";
import { Link } from "@next";

export default function UserPage({ params }: { params: { user: string } }) {
  const { user } = use(params);
  const [userData, setUserData] = useState<User | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/users/${user}`);
      const data = await response.json();
      setUserData(data);
    };

    fetchUser();
  }, [user]);
  if (!userData) {
    return <main>Loading...</main>;
  }
  return (
    <main>
      <h1>User id is equal to: {userData.id}</h1>
      <Link href="/">Back to Home</Link>
    </main>
  );
}
