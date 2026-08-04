import dbConnect from "@/lib/dbConnect";
import OfferModel from "@/lib/model/offer/OfferModel";
import WorkPostModel from "@/lib/model/work/WorkPostModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest) => {
  const session = await mongoose.startSession();
  session.startTransaction();
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
      { returnDocument: "after", session },
    );

    const res2 = await WorkPostModel.findOneAndUpdate(
      {
        _id: data.postId,
      },
      {
        $set: {
          status: "ACTIVE",
        },
      },
      { returnDocument: "after", session },
    );
    await session.commitTransaction();
    console.log("Offer Associated: ", res);
    console.log("Updated workpostmodel: ", res2);

    if (!res) {
      throw new Error("res is empty: ");
    }

    return NextResponse.json({
      message:
        "Successfully associated offer to a consumer by producer and status in workpostmodel also updated to active",
      data: res,
    });
  } catch (err) {
    await session.abortTransaction();
    console.log("ERROR AT /api/producer/handle-offer", err);
    return NextResponse.json(
      {
        message: "ERROR AT /api/producer/handle-offer",
        data: err,
      },
      { status: 500 },
    );
  } finally {
    // 4. Always end the session
    session.endSession();
  }
};
