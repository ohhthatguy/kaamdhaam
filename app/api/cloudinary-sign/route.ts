import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);

    // Formulate parameters you want to lock down
    const paramsToSign = {
      timestamp: timestamp,

      invalidate: true, // Tells Cloudinary to clear CDN cache on overwrite
    };

    // Generate the secure signature
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET!,
    );

    return NextResponse.json({
      signature,
      timestamp,
      apiKey: process.env.CLOUDINARY_API_KEY,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to sign" }, { status: 500 });
  }
}
