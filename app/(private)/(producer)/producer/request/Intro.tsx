// import dbConnect from "@/lib/dbConnect";
import { getCurrentUserData } from "@/lib/hooks/getCurrentUserData";
// import WorkerModel from "@/lib/model/worker/WorkerModel";

const Intro = async () => {
  const user = await getCurrentUserData();

  //   const getWorkerData = async () => {
  //     try {
  //       await dbConnect();

  //       const workerData = await WorkerModel.findOne({
  //         workerUserId: user?.id,
  //       })
  //         .populate({
  //           path: "totalApplication",
  //           select: "postStatus",
  //         })
  //         .lean();

  //       if (!workerData) {
  //         throw new Error(
  //           "There is no data of userId in workerModel OR user?.id is null in header x-user-id. chcek getCurrentUserData()",
  //         );
  //       }

  //       const statusCounts = workerData.totalApplication.reduce(
  //         (
  //           acc: { PENDING: number; ACTIVE: number; ENDED: number },
  //           offer: any,
  //         ) => {
  //           if (offer.postStatus === "PENDING") acc.PENDING++;
  //           if (offer.postStatus === "ACTIVE") acc.ACTIVE++;
  //           if (offer.postStatus === "ENDED") acc.ENDED++;
  //           return acc;
  //         },
  //         { PENDING: 0, ACTIVE: 0, ENDED: 0 },
  //       );

  //       console.log("WORKER DATA: ", workerData);
  //       return statusCounts;
  //     } catch (error) {
  //       console.log("ERROR IN workerData consumer/application/intro: ", error);

  //       return undefined;
  //     }
  //   };

  //   const data: { PENDING: number; ACTIVE: number; ENDED: number } | undefined =
  //     await getWorkerData();
  //   console.log("DAta of workerhistory: ", data);
  return (
    <section className="flex flex-col gap-8">
      <section className="  h-[20vh] flex items-end  ">
        <div className=" text-4xl capitalize font-semibold text-gray-800">
          {user?.name} Requests!
        </div>
        <div className=" bg-gray-300/20 flex-1 border-b-4 border-border"></div>
      </section>

      {/* <section className="   flex justify-around ">
        <div className="rounded-md bg-surface border border-border  p-8">
          <div>Total Application Sent: </div>
          <h4 className="text-right">
            {data ? data.PENDING + data.ACTIVE + data.ENDED : undefined}
          </h4>
        </div>

        <div className="rounded-md bg-surface border border-border  p-8">
          <div>Total PENDING: </div>
          <h4 className="text-right">{data ? data.PENDING : undefined}</h4>
        </div>

        <div className="rounded-md bg-surface border border-border  p-8">
          <div>Total ACTIVE </div>
          <h4 className="text-right">{data ? data.ACTIVE : undefined}</h4>
        </div>

        <div className="rounded-md bg-surface border border-border  p-8">
          <div>Total ENDED: </div>
          <h4 className="text-right">{data ? data.ENDED : undefined}</h4>
        </div>
      </section> */}
    </section>
  );
};

export default Intro;
