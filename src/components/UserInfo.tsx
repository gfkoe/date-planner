"use client";

import { User } from "@/app/types";
import { useEffect, useState } from "react";

interface UserInfoProps {
  userData: User;
}

export default function UserInfo({ userData }: UserInfoProps) {
  const [friendList, setFriendList] = useState([]);
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await fetch(`/api/user/${userData.id}/friends`);
        const data = await res.json();
        setFriendList(data);
      } catch (error) {
        setFriendList([]);
      }
    };
    fetchFriends();
  }, [userData.id]);

  return (
    <div className="w-2/5 h-auto">
      <div className="border border-black rounded-lg py-5 px-5">
        <div className="text-3xl">
          {userData.firstName} {userData.lastName}
        </div>
        <hr className="my-2 border-black" />
        <div>
          <div>email: {userData.email}</div>
          <div>number of friends: {friendList.length}</div>
        </div>
      </div>
    </div>
  );
}
