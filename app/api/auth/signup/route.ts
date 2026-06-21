import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const data = await req.json();
  console.log("Data: ", data);
};
