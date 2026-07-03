import dbConnect from "@/lib/dbConnect";
import TokenModel from "@/lib/model/auth/TokenModel";
import UserModel from "@/lib/model/auth/UserModel";
import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";

export const POST = async (req: NextRequest) => {
  try {
    await dbConnect();
    const token = await req.json();
    console.log(token);

    if (!token) {
      return NextResponse.json(
        {
          message: {
            heading: "Empty Token",
            label:
              "There is no token available. Please Click to resend new Token",
            btn: "RESEND",
          },
        },
        { status: 400 },
      );
    }
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const verification = await TokenModel.findOne({
      token: hashedToken,
    });

    if (!verification) {
      return NextResponse.json(
        {
          message: {
            heading: "Invalid or expired token.",
            label:
              "Provided Token in the system are expired. Please Click to resend new Token",
            btn: "RESEND",
          },
        },
        { status: 400 },
      );
    }

    await UserModel.findByIdAndUpdate(verification.userId, {
      isVerified: true,
    });

    await TokenModel.deleteOne({
      _id: verification._id,
    });

    return NextResponse.json({
      message: {
        heading: "Email verified successfully.",
        label: "You now have a valid profile. Please click to login page",
        btn: "LOGIN",
      },
    });
  } catch (err) {
    return NextResponse.json(
      {
        message: {
          heading: "Something is wrong in Email Verification",
          label:
            "an error occured while verifying your email. We are working on this issue.",
          btn: "RESEND",
        },
        data: err,
      },
      { status: 500 },
    );
  }
};
