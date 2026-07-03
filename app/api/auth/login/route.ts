import dbConnect from "@/lib/dbConnect";
import UserModel from "@/lib/model/auth/UserModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const ACCESS_SECRET = process.env.ACCESS_SECRET_KEY || "access_secret_key";
const REFRESH_SECRET = process.env.REFRESH_SECRET_KEY || "refresh_secret_key";

export const GET = async (req: NextRequest) => {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);

    const email = searchParams.get("email");
    const password = searchParams.get("password");

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing email or password parameters in URL" },
        { status: 400 },
      );
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "NO SUCH USER EXISTS" },
        { status: 404 },
      );
    }

    const isPaswdCorrect = await bcrypt.compare(password, user.password);
    console.log(isPaswdCorrect);
    if (!isPaswdCorrect) {
      return NextResponse.json({ error: "Incorrect Pswd" }, { status: 404 });
    }

    const accessToken = jwt.sign(
      {
        email: user.email,
        role: user.role,
        profileImg: user.profileImg,

        userId: user._id,
      },
      ACCESS_SECRET,
      { expiresIn: "2m" },
    );

    const refreshToken = jwt.sign(
      {
        email: user.email,
        userId: user._id,
      },
      REFRESH_SECRET,
      { expiresIn: "30m" },
    );
    const response = NextResponse.json({
      message: "Logged in successfully!",
      data: user,
    });

    response.cookies.set({
      name: "access_token",
      value: accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 2 * 60, // 2 minutes in seconds
      path: "/",
    });

    // 4. Set Refresh Token Cookie (pointing strictly to the refresh endpoint path)
    response.cookies.set({
      name: "refresh_token",
      value: refreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 60, // 30 minutes in seconds
      path: "/api/auth/refreshToken", // Only sent to the token-renewal endpoint!
    });

    return response;
  } catch (err) {
    return NextResponse.json(
      {
        message: "Error occured in /api/auth/login",
        data: err,
      },
      { status: 500 },
    );
  }
};
