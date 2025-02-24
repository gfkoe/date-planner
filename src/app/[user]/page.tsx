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
          <div className="w-2/5 h-auto">
            <div className="border border-black rounded-lg py-5 px-5">
              <div className="flex flex-wrap justify-between">
                <div className="sm:text-lg md:text-2xl lg:text-2xl truncate">
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              <hr className="my-2 border-black" />
              <div className="truncate text-ellipsis overflow-hidden whitespace-nowrap">
                <Skeleton className="h-4 w-[250px]" />
              </div>
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
