"use client";

import { useEffect, useState, use } from "react";
import { User } from "../types";
//import { Link } from "@next";
import Link from "next/link";

type RouteParams = { params: Promise<{ user: string }> };

export default function UserPage({ params }: RouteParams) {
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
