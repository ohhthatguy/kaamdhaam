import dbConnect from "@/lib/dbConnect";
import OfferModel from "@/lib/model/offer/OfferModel";
import WorkerModel from "@/lib/model/worker/WorkerModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await dbConnect();
    const offerData = await req.json();
    const offerWorker = await OfferModel.create([offerData], { session }); //for using session, the first arg should be an array and it gives back an array

    console.log("offerData clicked: ", offerWorker);

    const workerData = {
      workerUserId: offerData.intrestedWorkers[0].workerId,
      totalApplication: [offerWorker[0]._id],
    };

    const newWorkerData = await WorkerModel.create([workerData], { session });
    console.log("offerData clicked: ", newWorkerData);
    await session.commitTransaction();

    const finalData = { offerWorker, newWorkerData };

    return NextResponse.json({
      message: "Successfully send a offer by consumer and created workermodel",
      data: finalData,
    });
  } catch (error) {
    await session.abortTransaction();
    console.log("ERROR IN /consumer/send-offer");
    return NextResponse.json(
      {
        message: "ERROR IN /consumer/send-offer",
        data: error,
      },
      { status: 500 },
    );
  } finally {
    session.endSession();
  }
};
