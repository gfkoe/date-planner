import { NextRequest, NextResponse } from "next/server";
import { sendFriendRequest } from "@/db/db";
import { auth } from "@/auth";

type RouteParams = { params: Promise<{ user: string }> };

export const POST = async (_request: NextRequest, { params }: RouteParams) => {
  const session = await auth();
  const senderId = Number(session?.user?.id);

  if (!senderId) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 },
    );
  }
  // getting the recipient id
  const { user } = await params;
  const userToFriendId = Number(user);

  if (!userToFriendId) {
    return NextResponse.json(
      { error: "No recipient id provided" },
      { status: 404 },
    );
  }

  try {
    await sendFriendRequest(senderId, userToFriendId);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to send friend request" },
      { status: 500 },
    );
  }
};
