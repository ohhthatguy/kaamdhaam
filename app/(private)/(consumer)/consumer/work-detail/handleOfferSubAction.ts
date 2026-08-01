import dbConnect from "@/lib/dbConnect";
import OfferModel from "@/lib/model/offer/OfferModel";
import { NextRequest } from "next/server";

const POST = async (req: NextRequest) => {
  try {
    await dbConnect();
    const offerData = await req.json();

    const offerWorker = await OfferModel.create(offerData);

    console.log("offerData clicked: ", offerWorker);
  } catch (err) {
    console.log("Error in handleOfferSubisson(): ", err);
  }
};
