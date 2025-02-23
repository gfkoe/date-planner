"use client";
import React from "react";

import { useEffect, useState, use } from "react";
import { User } from "@/app/types";
import UserInfo from "@/components/UserInfo";
import { Skeleton } from "@/components/ui/skeleton";

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
      <div className="flex flex-col justify-center min-h-full">
        <div className="flex flex-auto justify-center items-center">
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </div>
      </div>
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
