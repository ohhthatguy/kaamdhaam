import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

interface CustomJwtPayload {
  userId: string;
  email: string;
  role: string;
  profileImg: string;
  name: string;
}

export const config = {
  // runtime: "nodejs", //uncommonet this

  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

const ACCESS_SECRET = process.env.ACCESS_SECRET_KEY || "access_secret_key";
const REFRESH_SECRET = process.env.REFRESH_SECRET_KEY || "access_secret_key";

export const proxy = async (req: NextRequest) => {
  console.log("PROXY HIT:", req.nextUrl.pathname);

  const pathname = req.nextUrl.pathname;

  const publicRoutes = [
    "/login",
    "/signup",
    "/verifyEmail",

    "/api/auth/login",
    "/api/auth/refreshToken",
    "/api/auth/signup",
    "/api/cloudinary-sign",
    "/api/verify/email",
    "/api/verify/expired-token",
  ];

  const isPublicRoute =
    pathname === "/" ||
    publicRoutes.some((route) => pathname.startsWith(route));

  if (isPublicRoute) {
    return NextResponse.next();
  }

  try {
    const accessToken = req.cookies.get("access_token")?.value;
    console.log("ACCESS TOKEN:", accessToken);
    const refreshToken = req.cookies.get("refresh_token")?.value;

    console.log("REFRESH TOKEN INSIDE:", refreshToken);

    console.log("TYPE:", typeof accessToken);
    console.log("IS EMPTY:", !accessToken);

    if (!accessToken) {
      console.log("3. NO ACCESS TOKEN, CALLING REFRESH HANDLER");

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

    const pathname = req.nextUrl.pathname;
    if (!decodedUser.role) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (pathname.startsWith("/producer") && decodedUser.role !== "PRODUCER") {
      return NextResponse.redirect(new URL(`/login`, req.url));
    }

    // Consumer protected routes
    if (pathname.startsWith("/consumer") && decodedUser.role !== "CONSUMER") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const res = NextResponse.next();
    res.headers.set("x-user-id", decodedUser.userId);
    res.headers.set("x-user-email", decodedUser.email);
    res.headers.set("x-user-role", decodedUser.role);
    res.headers.set("x-user-profileImg", decodedUser.profileImg);
    res.headers.set("x-user-name", decodedUser.name);

    return res;
  } catch (err) {
    console.log("ERROR AT PROXY: ", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
};

const handleAccessTokenGeneration = async (req: NextRequest) => {
  try {
    console.log("INSIDE handleAccessTokenGeneration");

    const refreshToken = req.cookies.get("refresh_token")?.value;

    console.log("REFRESH TOKEN INSIDE:", refreshToken);

    if (!refreshToken) {
      //  return NextResponse.redirect(new URL("/login", req.url));
      return NextResponse.json(
        { error: "Session expired. No REFRESHTOKEN.  Please log in." },
        { status: 401 },
      );
    }

    const newAccessToken = (await generateAccessToken(refreshToken)) as string;

    if (!newAccessToken) {
      return NextResponse.json(
        { error: "Session expired.  No REFRESHTOKEN. Please log in." },
        { status: 401 },
      );
    }

    const response = NextResponse.next();

    response.cookies.set({
      name: "access_token",
      value: newAccessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 2 * 60,
      path: "/",
    });

    const decodedUser = jwt.verify(
      newAccessToken,
      ACCESS_SECRET,
    ) as CustomJwtPayload;

    const pathname = req.nextUrl.pathname;
    if (!decodedUser.role) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (pathname.startsWith("/producer") && decodedUser.role !== "PRODUCER") {
      return NextResponse.redirect(new URL(`/login`, req.url));
    }

    // Consumer protected routes
    if (pathname.startsWith("/consumer") && decodedUser.role !== "CONSUMER") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    response.headers.set("x-user-id", decodedUser.userId);
    response.headers.set("x-user-role", decodedUser.role);
    response.headers.set("x-user-email", decodedUser.email);
    response.headers.set("x-user-profileImg", decodedUser.profileImg);
    response.headers.set("x-user-name", decodedUser.name);

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Auth Error", err: error },
      { status: 500 },
    );
  }
};

const generateAccessToken = async (refreshToken: string) => {
  try {
    // 1. Verify the refresh token
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET);

    if (!decoded || typeof decoded === "string") {
      return null;
    }
    console.log(decoded);

    const newAccessToken = jwt.sign(
      {
        userId: decoded.userId,
        email: decoded.email,
        role: decoded.role,
        profileImg: decoded.profileImg,
        name: decoded.name,
      },
      ACCESS_SECRET,
      { expiresIn: "2m" },
    );

    return newAccessToken;
  } catch (error) {
    return NextResponse.json(
      { message: "Session expired. Please log in.", data: error },
      { status: 401 },
    );
  }
};
