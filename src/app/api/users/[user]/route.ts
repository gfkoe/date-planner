import { NextRequest } from "next/server";
import { findUserById } from "@/db/db";

export const GET = async (
  _request: NextRequest,
  { params }: { params: { user: string } },
) => {
  params = await params;
  const userId = Number(params.user);

  if (!userId) {
    return Response.json({ error: "No user id provided" }, { status: 404 });
  }

  const user = await findUserById(userId);

  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  return Response.json(user);
};
