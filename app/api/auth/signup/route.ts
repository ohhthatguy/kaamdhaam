import dbConnect from "@/lib/dbConnect";
import TokenModel from "@/lib/model/auth/TokenModel";
import UserModel from "@/lib/model/auth/UserModel";
import { sendVerificationEmail } from "@/lib/sendVerificationEmail";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";

export const POST = async (req: NextRequest) => {
  try {
    await dbConnect();

    const data = await req.json();
    console.log("Data: ", data);

    //check if similar user exists first
    const hasExisitingUser = await UserModel.findOne({ email: data.email });

    if (hasExisitingUser) {
      return NextResponse.json(
        {
          message: "Similar Email already exists!",
        },
        { status: 409 },
      );
    }

    //save user with hashedPassword
    const hashedPswd = await bcrypt.hash(data.password, 10);
    const userWithHashedPswd = { ...data, password: hashedPswd };
    console.log("userWithHashedPswd: ", userWithHashedPswd);
    console.log(
      UserModel.schema.path("skills").schema.path("rateType").enumValues,
    );
    const newUser = await UserModel.create(userWithHashedPswd);
    console.log("newUser: ", newUser);

    //geenrate Token. hash and save it
    const token = nanoid();

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    await TokenModel.create({
      userId: newUser._id,
      token: hashedToken,
      expiresAt: new Date(Date.now() + 1000 * 60 * 15), //15min
    });

    //send Verification
    await sendVerificationEmail(data.email, token);

    return NextResponse.json(
      {
        message: "Signup successful. Please verify your email.",
      },
      { status: 201 },
    );
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      {
        message: "Something went wrong in /api/auth/signup",
        data: err,
      },
      { status: 500 },
    );
  }
};
