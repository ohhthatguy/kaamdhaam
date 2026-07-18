import dbConnect from "@/lib/dbConnect";
import WorkPostModel from "@/lib/model/work/WorkPostModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await dbConnect();
    const data = await req.json();

    const newWorkPost = WorkPostModel.create(data);
    console.log("newWorkPost created: ", newWorkPost);

    return NextResponse.json({
      message: "Successfully created a new work-post-create",
      data: newWorkPost,
    });
  } catch (error) {
    console.log("ERROR IN /producer/work-create");
    return NextResponse.json({
      message: "ERROR IN /producer/work-create",
      data: error,
    });
  }
};
