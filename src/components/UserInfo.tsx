"use client";

import { User } from "@/app/types";

interface UserInfoProps {
  userData: User;
}

export default function UserInfo({ userData }: UserInfoProps) {
  return (
    <div className="w-1/5">
      <div className="border border-black rounded-lg py-5 px-5">
        <div className="text-3xl">Profile Info</div>
        <div className="mt-2">
          <div className="text-xl">
            {userData.firstName} {userData.lastName}
          </div>
        </div>
      </div>
    </div>
  );
}
