import dbConnect from "@/lib/dbConnect";
import OfferModel from "@/lib/model/offer/OfferModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await dbConnect();
    const offerData = await req.json();
    const offerWorker = await OfferModel.create(offerData);

    console.log("offerData clicked: ", offerWorker);

    return NextResponse.json({
      message: "Successfully send a offer by consumer",
      data: offerWorker,
    });
  } catch (error) {
    console.log("ERROR IN /consumer/send-offer");
    return NextResponse.json({
      message: "ERROR IN /consumer/send-offer",
      data: error,
    });
  }
};
