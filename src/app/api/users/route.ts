import { searchForUsers } from "@/db/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("search");
  if (!query) {
    return NextResponse.json({ users: [] });
  }

  try {
    const users = await searchForUsers(query);

    return NextResponse.json({ users });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to search for users" },
      { status: 500 },
    );
  }
};
