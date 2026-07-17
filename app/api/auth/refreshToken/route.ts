// import dbConnect from "@/lib/dbConnect";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const ACCESS_SECRET = process.env.ACCESS_SECRET_KEY || "access_secret_key";
const REFRESH_SECRET = process.env.REFRESH_SECRET_KEY || "refresh_secret_key";

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get("refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { error: "Refresh token missing" },
      { status: 401 },
    );
  }

  try {
    // await dbConnect();
    // 1. Verify the refresh token
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET);

    if (!decoded || typeof decoded === "string") {
      return NextResponse.json(
        {
          message: "REFERSH TOKEN ITSELF IS FINISHED. PLEASE LOGIN",
          data: decoded,
        },
        { status: 404 },
      );
    }
    console.log(decoded);

    const newAccessToken = jwt.sign(
      {
        userId: decoded.userId,
        email: decoded.email,
        role: decoded.role,
        profileImg: decoded.profileImg,
      },
      ACCESS_SECRET,
      { expiresIn: "2m" },
    );

    const response = NextResponse.json({ success: true });

    // 4. Overwrite the old access token cookie
    response.cookies.set({
      name: "access_token",
      value: newAccessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 2 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Session expired. Please log in.", data: error },
      { status: 401 },
    );
  }
}
