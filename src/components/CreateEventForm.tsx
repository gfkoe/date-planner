"use client";
import { useEffect, useState } from "react";
import { FaCalendar as CalendarIcon } from "react-icons/fa";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

export default function CreateEventForm() {
  const { data: session } = useSession();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [friendList, setFriendList] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await fetch(`/api/users/${session?.user?.id}/friends`);
        const data = await res.json();
        setFriendList(data);
      } catch (error) {
        setFriendList([]);
      }
    };

    fetchFriends();
  }, [session?.user?.id]);

  return (
    <Card className="w-[350px]">
      <form>
        <CardHeader>
          <CardTitle>Create Event</CardTitle>
          <CardDescription>
            Create a new event to share with your friends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Event Name</Label>
              <Input
                id="name"
                placeholder="Name of your upcoming event"
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="friend">Add a friend to the event</Label>
              <Select required>
                <SelectTrigger id="friend">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {friendList.map((friend) => (
                    <SelectItem
                      key={friend.friendId}
                      value={friend.firstName + " " + friend.lastName}
                    >
                      {friend.firstName} {friend.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="date">Event Date</Label>
              <div className="flex flex-col space-y-1.5">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                    />
                  </PopoverContent>
                </Popover>
                <input
                  type="hidden"
                  value={date ? format(date, "yyyy-MM-dd") : ""}
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between space-y-1.5 w-full">
          <Button>Create</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
