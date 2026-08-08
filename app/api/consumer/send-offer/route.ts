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
    // const offerWorker = await OfferModel.create([offerData], { session }); //for using session, the first arg should be an array and it gives back an array

    console.log("DaTA from fronted: ", offerData);

    const offerWorker = await OfferModel.findOneAndUpdate(
      {
        postId: offerData.postId,
      },
      {
        $addToSet: {
          intrestedWorkers: offerData.intrestedWorkers[0],
        },
        $setOnInsert: {
          jobProviderId: offerData.jobProviderId, //this is only added when nosuch post with postID is found and we get a create() function
        },
      },
      {
        upsert: true,
        returnDocument: "after",
        session,
      },
    );

    console.log("offerData clicked: ", offerWorker);

    // const workerData = {
    //   workerUserId: offerData.intrestedWorkers[0].workerId,
    //   totalApplication: [offerWorker[0]._id],
    // };

    // const newWorkerData = await WorkerModel.create([workerData], { session });

    const newWorkerData = await WorkerModel.findOneAndUpdate(
      {
        workerUserId: offerData.intrestedWorkers[0].workerId,
      },
      {
        $addToSet: {
          totalApplication: offerWorker._id,
        },
        $setOnInsert: {
          workerUserId: offerData.intrestedWorkers[0].workerId,
        },
      },
      {
        upsert: true,
        returnDocument: "after",
        session,
      },
    );

    console.log("workerData clicked: ", newWorkerData);
    await session.commitTransaction();

    const finalData = { offerWorker, newWorkerData };

    return NextResponse.json({
      message: "Successfully send a offer by consumer and created workermodel",
      data: finalData,
    });
  } catch (error) {
    await session.abortTransaction();
    console.log("ERROR IN /consumer/send-offer: ", error);
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
