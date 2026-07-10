import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

interface CustomJwtPayload {
  userId: string;
  email: string;
  role: string;
  profileImg: string;
}

export const config = {
  // runtime: "nodejs",  uncommonet this

  matcher: ['/api/((?!auth).*)"'],
};

const ACCESS_SECRET = process.env.ACCESS_SECRET_KEY || "access_secret_key";
const REFRESH_SECRET = process.env.REFRESH_SECRET_KEY || "access_secret_key";

export const proxy = async (req: NextRequest) => {
  try {
    const accessToken = req.cookies.get("access_token")?.value;

    if (!accessToken) {
      return handleAccessTokenGeneration(req);
    }

    const decodedUser = jwt.verify(
      accessToken,
      ACCESS_SECRET,
    ) as CustomJwtPayload;

    if (!decodedUser) {
      return NextResponse.json(
        {
          message: "INCORRECT ACCESSTOKEN || ACCESS_SECKET_KEY",
          data: decodedUser,
        },
        { status: 500 },
      );
    }

    const res = NextResponse.next();

    res.headers.set("x-user-id", decodedUser.userId);
    res.headers.set("x-user-email", decodedUser.email);
    res.headers.set("x-user-role", decodedUser.role);
    res.headers.set("x-user-profileImg", decodedUser.profileImg);

    return res;
  } catch (err) {
    console.log("ERROR AT PROXY: ", err);
  }
};

const handleAccessTokenGeneration = async (req: NextRequest) => {
  try {
    const refreshToken = req.cookies.get("refresh_token")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { error: "Session expired. No REFRESHTOKEN.  Please log in." },
        { status: 401 },
      );
    }

    const refreshResponse = await fetch(new URL("/api/auth/refresh", req.url), {
      method: "POST",
      headers: {
        Cookie: `refresh_token=${refreshToken}`,
      },
    });

    if (!refreshResponse.ok) {
      return NextResponse.json(
        { error: "Session expired.  No REFRESHTOKEN. Please log in." },
        { status: 401 },
      );
    }

    const response = NextResponse.next(); // next() to forward the request from middleware to other. We add data to this before returning

    // get the data from /auth/refresh saved in cokkie
    const newAccessTokenInHeader = refreshResponse.headers.get("set-cookie");

    //various data is saved but we need the geenrated accessTOken. it is in form of acesToken=asda;httpOnly;expiresIn=2m;
    //so we first split by ; and then = to get accessToken
    const newAccessCookie = newAccessTokenInHeader?.split(";")[0].split("=")[1];

    if (newAccessCookie) {
      const decoded = jwt.decode(newAccessCookie) as CustomJwtPayload;
      response.headers.set("x-user-id", decoded.userId);
      response.headers.set("x-user-email", decoded.email);
      response.headers.set("x-user-role", decoded.role);
      response.headers.set("x-user-profileImg", decoded.profileImg);
    }
    console.log("proxy seamlessly reused /api/auth/refresh endpoint!");
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Auth Error", err: error },
      { status: 500 },
    );
  }
};
