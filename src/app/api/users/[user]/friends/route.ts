import { NextRequest, NextResponse } from "next/server";
import { getFriends, findUserById, sendFriendRequest } from "@/db/db";
import nodemailer from "nodemailer";
import { auth } from "@/auth";

type RouteParams = { params: Promise<{ user: string }> };

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_NODEMAILER_EMAIL,
    pass: process.env.GMAIL_NODEMAILER_PASSWORD,
  },
});

export const GET = async (_request: NextRequest, { params }: RouteParams) => {
  const { user } = await params;
  const userId = Number(user);

  if (!userId) {
    return NextResponse.json({ error: "No user id provided" }, { status: 404 });
  }

  const friendData = await getFriends(userId);

  return NextResponse.json(friendData);
};

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
    const userToFriendObj = await findUserById(userToFriendId);

    const mailOptions = {
      from: process.env.GMAIL_NODEMAILER_EMAIL,
      to: userToFriendObj.email,
      subject: "New friend request on Date Planner!",
      text: `You have a new friend request from ${session.user.firstName} ${session.user.lastName}!`,
    };
    transporter.sendMail(mailOptions);

    await sendFriendRequest(senderId, userToFriendId);
    return NextResponse.json(
      { message: "Friend request sent" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Database error: ", error);
    return NextResponse.json(
      { error: "Failed to send friend request" },
      { status: 500 },
    );
  }
};

export const PUT = async (_request: NextRequest, { params }: RouteParams) => {
  const session = await auth();
  const userId = Number(session?.user?.id);

  //user who sent req
  const { user } = await params;
};
