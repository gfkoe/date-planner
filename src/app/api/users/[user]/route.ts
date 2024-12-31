import { NextRequest } from "next/server";
import { findUserById } from "../../../../db/db.ts";

type RouteParams = { params: Promise<{ user: string }> };

export const GET = async (request: NextRequest, { params }: RouteParams) => {
  const { user } = await params;

  if (!user) {
    return Response.json("No user id provided");
  }

  const dinosaurData = data.find(
    (item) => item.name.toLowerCase() === dinosaur.toLowerCase(),
  );
  const userData = await findUserById(user);

  return Response.json(userData ? userData : "No user found");
};
