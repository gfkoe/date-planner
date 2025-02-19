"use client";
import React from "react";

import { useEffect, useState, use } from "react";
import { User } from "@/app/types";
import UserInfo from "@/components/UserInfo";

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
    return (
      <main>
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <div className="flex flex-col justify-center min-h-full">
      <div className="flex flex-auto justify-center items-center">
        <UserInfo userData={userData} />
      </div>
    </div>
  );
}
