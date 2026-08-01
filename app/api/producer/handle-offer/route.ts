import dbConnect from "@/lib/dbConnect";
import OfferModel from "@/lib/model/offer/OfferModel";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest) => {
  try {
    await dbConnect();
    const data = await req.json();
    const res = await OfferModel.findOneAndUpdate(
      {
        postId: data.postId,
        "intrestedWorkers.workerId": data.workerId,
      },
      {
        $set: {
          postStatus: "ACTIVE",
          "intrestedWorkers.$.isWorkAssociated": true,
          "intrestedWorkers.$.dateOfWorkAssociation": new Date(),
        },
      },
      { returnDocument: "after" },
    );

    console.log("Offer Associated: ", res);

    if (!res) {
      throw new Error("res is empty: ");
    }

    return NextResponse.json({
      message: "Successfully associated offer to a consumer by producer",
      data: res,
    });
  } catch (err) {
    console.log("ERROR AT /api/producer/handle-offer", err);
    return NextResponse.json(
      {
        message: "ERROR AT /api/producer/handle-offer",
        data: err,
      },
      { status: 500 },
    );
  }
};
