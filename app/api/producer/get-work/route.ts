import dbConnect from "@/lib/dbConnect";
import WorkPostModel from "@/lib/model/work/WorkPostModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    await dbConnect();
    const data = await req.json();

    const workData = await WorkPostModel.find({ createdBy: data.createdBy });

    console.log("WORKDATA: ", workData);

    return NextResponse.json({
      message: "successfully get workdata",
      data: workData,
    });
  } catch (error) {
    console.log("ERROR IN /api/producer/get-work", error);
    NextResponse.json({
      message: "ERROR IN /api/producer/get-work",
      data: error,
    });
  }
};
