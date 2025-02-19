"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDebouncedCallback } from "use-debounce";
import Link from "next/link";

export default function UserSearch() {
  const [foundUsers, setFoundUsers] = useState([]);

  const handleSearch = useDebouncedCallback(async (term: string) => {
    if (!term) {
      setFoundUsers([]);
      return;
    }

    try {
      const res = await fetch(`/api/users?search=${term}`);

      if (!res.ok) {
        throw new Error("Failed to search for users");
      }

      const data = await res.json();

      setFoundUsers(data.users);
    } catch (err) {
      console.log(err);
    }
  }, 500);

  return (
    <Popover open={foundUsers.length > 0}>
      <PopoverTrigger asChild>
        <div className="relative">
          <Input
            type="search"
            placeholder="Search Users"
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-[--radix-popover-trigger-width]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <ul>
          {foundUsers.map((user) => (
            <li key={user.id}>
              <Link href={`/${user.id}`}>
                {user.firstName} {user.lastName}
              </Link>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
