import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  const { public_id } = await req.json();

  await cloudinary.uploader.destroy(public_id);

  return NextResponse.json({
    success: true,
    message: "successfully deleted the picture",
  });
}
