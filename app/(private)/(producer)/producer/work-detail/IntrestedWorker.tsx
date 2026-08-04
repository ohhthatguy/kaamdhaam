import dbConnect from "@/lib/dbConnect";

import OfferModel from "@/lib/model/offer/OfferModel";
import Image from "next/image";
import Link from "next/link";
import DecisionBtn from "./DecisionBtn";

type workerDataType = {
  workerName: string;
  workerImg: string;
  workerBio?: string;
  workerId: string;
  isWorkAssociated: boolean;
  offerMadeAt?: Date;
  _id: string;
};

type offerModelDataType = {
  postId: string;
  intrestedWorkers: workerDataType[];
  postStatus: "ACTIVE" | "PENDING" | "ENDED";
};

const IntrestedWorker = async ({ workPostId }: { workPostId: string }) => {
  const getWorkPostDetail = async () => {
    try {
      await dbConnect();
      const postDetail = await OfferModel.findOne({ postId: workPostId });

      if (postDetail.postStatus === "ACTIVE") {
        const assignedWorkerData: offerModelDataType = {
          ...postDetail,
          intrestedWorkers: postDetail.intrestedWorkers.filter(
            (e: workerDataType) => e.isWorkAssociated === true,
          ),
        };

        return assignedWorkerData;
      } else {
        return postDetail;
      }
    } catch (error) {
      console.log("Error in getPostedWorks(): ", error);
    }
  };

  const workers: offerModelDataType = await getWorkPostDetail();

  console.log("asd");
  console.log(workers);
  console.log("asd");

  return (
    <div className="border flex flex-col gap-8 p-4">
      <h4>Applicant [{workers && workers.intrestedWorkers.length}]</h4>

      {workers && workers.intrestedWorkers.length > 0 ? (
        workers.intrestedWorkers.map((e: workerDataType, index: number) => (
          <div
            key={index}
            className="flex flex-col justify-around h-48 p-2  border border-border rounded-md  bg-light"
          >
            <div className="flex gap-4 items-center">
              <div className="relative h-18 w-18   overflow-hidden rounded-md">
                <Image
                  src={e.workerImg}
                  alt="worker img"
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div>
                <p>{e.workerName}</p>
                <div>3 star </div>
              </div>
            </div>
            <div className="leading-tight tracking-tight line-clamp-3">
              this is the part of the bio{" "}
            </div>
            <div className="flex gap-8 justify-around">
              <Link
                href={`/profile?workerId=${e.workerId}`}
                className={`border border-border px-4 py-2 rounded-md  `}
              >
                View Profile
              </Link>
              <DecisionBtn
                isWorkAssociated={e.isWorkAssociated}
                id={workPostId}
                workerId={e.workerId.toString()}
              />
            </div>
          </div>
        ))
      ) : (
        <div className=" flex flex-col justify-center items-center">
          <div>img</div>
          <div>No OFFERS YET!</div>
        </div>
      )}
    </div>
  );
};

export default IntrestedWorker;
