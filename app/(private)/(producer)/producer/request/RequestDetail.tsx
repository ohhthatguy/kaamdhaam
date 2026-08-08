import dbConnect from "@/lib/dbConnect";
import { getCurrentUserData } from "@/lib/hooks/getCurrentUserData";
import OfferModel from "@/lib/model/offer/OfferModel";
import Link from "next/link";
import { ImSad } from "react-icons/im";
import type { producerJobManagementDataType } from "./Table/column";
import Rendertable from "./Table/Rendertable";

type intrestedWorkerDataType = {
  workerName: string;
  workerImg: string;
  workerBio?: string;
  workerId: string;
  isWorkAssociated: boolean;
  offerMadeAt?: string;
  dateOfWorkAssociation?: string;
  dateOfWorkDeclined?: string;
  dateOfWorkEnded?: string;
};

type PostDetailDataType = {
  title: string;
  category: { value: string; label: string }[];
  workImg: { imgSrc: string }[];
  status: "ACTIVE" | "PENDING" | "ENDED";
  createdAt: string;
};

type offerDataType = {
  _id: string;
  postId: string | PostDetailDataType;
  jobProviderId: string;
  postStatus: "ACTIVE" | "PENDING" | "ENDED";
  intrestedWorkers: intrestedWorkerDataType[];
};

const RequestDetail = async () => {
  const user = await getCurrentUserData();

  const getDetailOfJobPostedByProvider = async (): Promise<offerDataType[]> => {
    try {
      await dbConnect();
      const data = (await OfferModel.find({
        jobProviderId: user?.id,
      })
        .populate({
          path: "postId",
          select: "title category workImg status createdAt",
        })
        .lean()) as offerDataType[];
      if (!data) {
        console.log("data of getDetailOfJobPostedByProvider: ", data);
        throw new Error("Error happened in getDetailOfJobPostedByProvider() ");
      }

      return data;
    } catch (err) {
      console.log("Error in the request part of producer: ", err);
      return [];
    }
  };

  const getRenderTableData = (data: offerDataType[], postId: string) => {
    const dataForRenderTable: producerJobManagementDataType[] = [];
    console.log("postId: ", postId);
    data.forEach((offer) => {
      if (offer.postId._id.toString() === postId) {
        console.log("map map: ", offer.postId._id.toString());
        offer.intrestedWorkers.forEach((e: intrestedWorkerDataType) => {
          const temp = {
            applicant: e.workerName,
            rating: "99",
            workerId: e.workerId.toString(),
            status: e.isWorkAssociated,
            dateApplied: e.offerMadeAt ? e.offerMadeAt : "undefineD",
            dateOfWorkEnded: e.dateOfWorkEnded
              ? e.dateOfWorkEnded
              : "undefineD",
          };

          dataForRenderTable.push(temp);
        });
      }

      console.log("data to give to rendertable: ", dataForRenderTable);
    });
    return dataForRenderTable;
  };

  const getTotalWorkerCount = (data: offerDataType[]) => {
    let count = 0;
    data.map((e: offerDataType) => {
      count = count + e.intrestedWorkers.length;
    });

    return count;
  };

  const getTotalWorkAssignedCount = (data: offerDataType[]) => {
    let count = 0;
    data.map((e: offerDataType) => {
      if (e.postStatus === "ACTIVE") count++;
    });

    return count;
  };

  const getTotalOngoingWorkCount = (data: offerDataType[]) => {
    let count = 0;
    data.map((e: offerDataType) => {
      if (e.postStatus === "ACTIVE" || e.postStatus === "PENDING") count++;
    });

    return count;
  };

  const data = await getDetailOfJobPostedByProvider();
  console.log("FINAL DATA: ", data);

  return (
    <section>
      <section className="   flex gap-4 justify-between ">
        <div className="flex-1 rounded-md bg-surface border border-border  p-8">
          <div>Total Ongoing Work: </div>
          <h4 className="text-right">{getTotalOngoingWorkCount(data)}</h4>
        </div>

        <div className="flex-1 rounded-md bg-surface border border-border  p-8">
          <div>Total Applications: </div>
          <h4 className="text-right">{getTotalWorkerCount(data)}</h4>
        </div>

        <div className="flex-1 rounded-md bg-surface border border-border  p-8">
          <div>Total Work Assigned </div>
          <h4 className="text-right">{getTotalWorkAssignedCount(data)}</h4>
        </div>
      </section>

      <section className="mt-4 flex flex-col gap-4">
        {data && data.length > 0 ? (
          data.map((e: offerDataType, index: number) => {
            const createdAtDate = new Date(e.postId.createdAt)
              .toISOString()
              .split("T")[0];

            const statusData = {
              PENDING: "bg-yellow-400 p-1 rounded-md text-center",
              ACTIVE: "bg-green-400 p-1 rounded-md text-center",
              ENDED: "bg-red-400 p-1 rounded-md text-center",
            };
            return (
              <div
                className="rounded-md flex flex-col p-4 bg-surface  gap-2 "
                key={index}
              >
                <div className="flex gap-4">
                  <div className="">
                    {" "}
                    <ImSad size={72} className="text-gray-400/75" />
                  </div>

                  <div className="flex justify-between items-center w-full">
                    <div className="tracking-tight leading-tight ">
                      <Link
                        className="hover:underline hover:cursor-pointer text-xl"
                        href={`/producer/work-detail?workPostId=${e.postId._id.toString()}`}
                      >
                        {e.postId.title}
                      </Link>
                      <p>posted on {createdAtDate}</p>
                    </div>

                    <div className="flex gap-2 items-center">
                      <div
                        className={`${statusData[e.postId.status as "ACTIVE" | "PENDING" | "ENDED"]}`}
                      >
                        {e.postId.status}
                      </div>
                      {/* <Link
                       
                        className=" hover:cursor-pointer text-center"
                      >
                        <EyeIcon size={22} className="hover:fill-green-500" />
                      </Link> */}
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <Rendertable
                    data={getRenderTableData(data, e.postId._id.toString())}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div className="h-92 bg-surface flex flex-col gap-4 justify-center items-center">
            <ImSad size={72} className="text-gray-400/75" />

            <div className="text-md px-4 line-clamp-4">
              You Are Yet To Post A Job Offering!
            </div>
          </div>
        )}
      </section>
    </section>
  );
};

export default RequestDetail;
