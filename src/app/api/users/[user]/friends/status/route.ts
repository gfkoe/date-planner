import { NextRequest, NextResponse } from "next/server";
import { getFriendshipStatus } from "@/db/db";
import { auth } from "@/auth";

type RouteParams = { params: Promise<{ user: string }> };

export const GET = async (_request: NextRequest, { params }: RouteParams) => {
  //this is the user that is logged in
  const session = await auth();
  const senderId = Number(session?.user?.id);
  if (!senderId) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 },
    );
  }

  //this is the user that we are checking the status of
  const { user } = await params;
  const userId = Number(user);

  if (!userId) {
    return NextResponse.json({ error: "No user id provided" }, { status: 404 });
  }

  try {
    const status = await getFriendshipStatus(senderId, userId);
    return NextResponse.json({ status });
  } catch (error) {
    console.error("Database error: ", error);
    return NextResponse.json(
      { error: "Failed to get friendship status" },
      { status: 500 },
    );
  }
};
