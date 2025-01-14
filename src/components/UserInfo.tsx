"use client";

import { User } from "@/app/types";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

interface UserInfoProps {
  userData: User;
}

export default function UserInfo({ userData }: UserInfoProps) {
  const { data: session } = useSession();
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);
  const [friendList, setFriendList] = useState([]);
  useEffect(() => {
    if (Number(session?.user?.id) === userData.id) {
      setIsLoggedInUser(true);
    } else {
      setIsLoggedInUser(false);
    }
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

  const sendFriendRequest = async () => {
    try {
      const res = await fetch(`/api/users/${userData.id}/friends/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      //console.log(data);
    } catch (error) {
      //console.error(error);
    }
  };

  return (
    <div className="w-1/5 h-auto">
      <div className="border border-black rounded-lg py-5 px-5">
        <div className="flex justify-between">
          <div className="text-3xl">
            {userData.firstName} {userData.lastName}
          </div>
          <div>
            {!isLoggedInUser && (
              <Button
                onClick={() => {
                  sendFriendRequest();
                }}
              >
                Send Friend Request
              </Button>
            )}
          </div>
        </div>
        <hr className="my-2 border-black" />
        <div>
          <div>number of friends: {friendList.length}</div>
        </div>
      </div>
    </div>
  );
}
