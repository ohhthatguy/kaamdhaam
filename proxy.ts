import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

interface CustomJwtPayload {
  userId: string;
  email: string;
  role: string;
  profileImg: string;
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
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (pathname.startsWith("/producer") && decodedUser.role !== "PRODUCER") {
      return NextResponse.redirect(new URL("/consumer/home", req.url));
    }

    // Consumer protected routes
    if (pathname.startsWith("/consumer") && decodedUser.role !== "CONSUMER") {
      return NextResponse.redirect(new URL("/producer/dashboard", req.url));
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
    console.log("INSIDE handleAccessTokenGeneration");

    const refreshToken = req.cookies.get("refresh_token")?.value;

    console.log("REFRESH TOKEN INSIDE:", refreshToken);

    if (!refreshToken) {
      return NextResponse.json(
        { error: "Session expired. No REFRESHTOKEN.  Please log in." },
        { status: 401 },
      );
    }

    const refreshResponse = await fetch(
      new URL("/api/auth/refreshToken", req.url),
      {
        method: "POST",
        headers: {
          cookie: req.headers.get("cookie") ?? "",
        },
      },
    );

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

      const pathname = req.nextUrl.pathname;

      if (!decoded.role) {
        return NextResponse.redirect(new URL("/login", req.url));
      }

      if (pathname.startsWith("/producer") && decoded.role !== "PRODUCER") {
        return NextResponse.redirect(new URL("/consumer/home", req.url));
      }

      // Consumer protected routes
      if (pathname.startsWith("/consumer") && decoded.role !== "CONSUMER") {
        return NextResponse.redirect(new URL("/producer/dashboard", req.url));
      }

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
