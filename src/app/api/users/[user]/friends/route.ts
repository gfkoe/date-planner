import { NextRequest, NextResponse } from "next/server";
import { getFriends } from "@/db/db";

type RouteParams = { params: Promise<{ user: string }> };

export const GET = async (_request: NextRequest, { params }: RouteParams) => {
  const { user } = await params;
  const userId = Number(user);

  if (!userId) {
    return NextResponse.json({ error: "No user id provided" }, { status: 404 });
  }

  const friendData = await getFriends(userId);

  return NextResponse.json(friendData);
};
