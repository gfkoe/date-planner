import { NextRequest, NextResponse } from "next/server";
import { findUserById, sendFriendRequest } from "@/db/db";
import { auth } from "@/auth";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_NODEMAILER_EMAIL,
    pass: process.env.GMAIL_NODEMAILER_PASSWORD,
  },
});

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
