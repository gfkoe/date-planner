"use client";

import { User } from "@/app/types";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { FaRegClock } from "react-icons/fa";

interface UserInfoProps {
  userData: User;
}

export default function UserInfo({ userData }: UserInfoProps) {
  const { data: session } = useSession();
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);
  const [friendList, setFriendList] = useState([]);
  const [friendshipStatus, setFriendshipStatus] = useState("");
  useEffect(() => {
    if (Number(session?.user?.id) === userData.id) {
      setIsLoggedInUser(true);
    } else {
      setIsLoggedInUser(false);
    }
    const fetchFriendshipStatus = async () => {
      try {
        const res = await fetch(`/api/users/${userData.id}/friends/status`);
        const data = await res.json();
        setFriendshipStatus(data.status);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchFriends = async () => {
      try {
        const res = await fetch(`/api/users/${userData.id}/friends`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setFriendList(data);
      } catch (error) {
        setFriendList([]);
        console.error(error);
      }
    };

    fetchFriendshipStatus();
    fetchFriends();
  }, [userData.id, session?.user?.id]);

  const sendFriendRequest = async () => {
    try {
      await fetch(`/api/users/${userData.id}/friends`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setFriendshipStatus("pending");
    } catch (error) {
      console.error(error);
    }
  };

  const acceptFriendRequest = async () => {
    try {
      await fetch(`/api/users/${userData.id}/friends`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-2/5 h-auto">
      <div className="border border-black rounded-lg py-5 px-5">
        <div className="flex flex-wrap justify-between">
          <div className="sm:text-lg md:text-2xl lg:text-2xl truncate">
            {userData.firstName} {userData.lastName}
          </div>
          {!isLoggedInUser && friendshipStatus !== "accepted" && (
            <Button
              variant="outline"
              disabled={friendshipStatus === "pending"}
              className="w-auto px-0 sm:w-1/3 md:w-1/2 max-w-full flex-shrink truncate text-ellipsis overflow-hidden whitespace-nowrap"
              onClick={() => {
                sendFriendRequest();
              }}
            >
              {friendshipStatus === "pending" && (
                <div className="flex justify-between text-sm">
                  <FaRegClock className="mr-2" />
                  Friend Request Sent
                </div>
              )}
              {friendshipStatus === "none" && <div>Send Friend Request</div>}
            </Button>
          )}
          {friendshipStatus === "pending" &&
            userData.id === Number(session?.user?.id) && (
              <Button
                onClick={acceptFriendRequest}
                disabled={friendshipStatus !== "pending"}
              >
                Accept Friend Request
              </Button>
            )}
        </div>
        <hr className="my-2 border-black" />
        <div className="truncate text-ellipsis overflow-hidden whitespace-nowrap">
          <div>number of friends: {friendList.length}</div>
        </div>
      </div>
    </div>
  );
}
