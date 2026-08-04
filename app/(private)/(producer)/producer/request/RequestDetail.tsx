import dbConnect from "@/lib/dbConnect";
import { getCurrentUserData } from "@/lib/hooks/getCurrentUserData";
import OfferModel from "@/lib/model/offer/OfferModel";

type intrestedWorkerDataType = {
  workerName: string;
  workerImg: string;
  workerBio?: string;
  workerId: string;
  isWorkAssociated: boolean;
  offerMadeAt?: string;
  dateOfWorkAssociation?: string;
  dateOfWorkDeclined?: string;
};

type offerDataType = {
  _id: string;
  postId: string;
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
      }).lean()) as offerDataType[];
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

  const data = await getDetailOfJobPostedByProvider();
  console.log("FINAL DATA: ", data);

  return (
    <section>
      <section className="   flex gap-4 justify-between ">
        <div className="flex-1 rounded-md bg-surface border border-border  p-8">
          <div>Total Job Post Made: </div>
          <h4 className="text-right">{data.length}</h4>
        </div>

        <div className="flex-1 rounded-md bg-surface border border-border  p-8">
          <div>Total Applicants: </div>
          <h4 className="text-right">{getTotalWorkerCount(data)}</h4>
        </div>

        <div className="flex-1 rounded-md bg-surface border border-border  p-8">
          <div>Total Work Assigned </div>
          <h4 className="text-right">{getTotalWorkAssignedCount(data)}</h4>
        </div>
      </section>

      <section>{/* //table here */}</section>
    </section>
  );
};

export default RequestDetail;
