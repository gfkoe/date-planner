import { NextRequest } from "next/server";
import { findUserById } from "../../../../db/db.ts";

export const GET = async (
  request: NextRequest,
  { params }: { params: { user: string } },
) => {
  const awaitedParams = await params;
  const userId = Number(awaitedParams.user);

  if (!userId) {
    return Response.json("No user id provided");
  }

  const user = await findUserById(userId);

  if (!user) {
    return Response.json("No user id provided");
  }

  return Response.json({ user });
};
