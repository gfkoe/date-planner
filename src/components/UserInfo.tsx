"use client";

import { User } from "@/app/types";

interface UserInfoProps {
  userData: User;
}

export default function UserInfo({ userData }: UserInfoProps) {
  return (
    <div className="w-1/5">
      <div>
        <div className="text-3xl">User Info</div>
        <div className="mt-2">
          <div className="text-2xl">First Name: {userData.firstName}</div>
          <div className="text-2xl">Last Name: {userData.lastName}</div>
        </div>
      </div>
    </div>
  );
}
