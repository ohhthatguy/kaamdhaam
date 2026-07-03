import dbConnect from "@/lib/dbConnect";
import TokenModel from "@/lib/model/auth/TokenModel";
import UserModel from "@/lib/model/auth/UserModel";
import { sendVerificationEmail } from "@/lib/sendVerificationEmail";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";

export const POST = async (req: NextRequest) => {
  try {
    await dbConnect();
    const token = await req.json();
    if (!token) {
      return NextResponse.json(
        { message: "Token query parameter is missing" },
        { status: 400 },
      );
    }
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const TokenData = await TokenModel.findOne({ token: hashedToken });

    if (!TokenData) {
      return NextResponse.json({
        message: "NO such Token is found in database",
        err: TokenData,
      });
    }

    const userData = await UserModel.findOne({ _id: TokenData.userId });

    if (!userData) {
      return NextResponse.json({
        message: "NO such user with given token's USERID is found in database",
        err: userData,
      });
    }

    const { email } = userData;
    const newToken = nanoid();
    const hashedNewToken = crypto
      .createHash("sha256")
      .update(newToken)
      .digest("hex");
    const updatedTime = new Date(Date.now() + 1000 * 60 * 15);

    const updatedTokenModel = await TokenModel.findByIdAndUpdate(
      TokenData._id,
      { token: hashedNewToken, expiresAt: updatedTime },
      { new: true },
    );

    if (!updatedTokenModel) {
      return NextResponse.json({
        message: "ERROR IN UPDATING THE TOKEN IN THE DATABASE",
        err: updatedTokenModel,
      });
    }

    await sendVerificationEmail(email, newToken);
    return NextResponse.json(
      {
        message:
          "REsend verfication email successful. Please verify your email.",
      },
      { status: 201 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "An internal server error occurred.", data: err },
      { status: 500 },
    );
  }
};
