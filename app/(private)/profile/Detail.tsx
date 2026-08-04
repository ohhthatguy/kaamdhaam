import dbConnect from "@/lib/dbConnect";
// import { getCurrentUserData } from "@/lib/hooks/getCurrentUserData";
import OfferModel from "@/lib/model/offer/OfferModel";
import WorkerModel from "@/lib/model/worker/WorkerModel";
import { Star } from "lucide-react";
import Image from "next/image";

export type ReviewDataType = {
  reviewerName: string;
  reviewerProfileImg: string;
  reviewedAt: Date | string;
  stars: number;
  description: string;
};

const Detail = async ({ workerId }: { workerId: string }) => {
  // const user = await getCurrentUserData();
  // console.log(user);
  console.log(workerId);

  const getWorkerData = async () => {
    try {
      await dbConnect();

      await OfferModel;
      const workerData = await WorkerModel.findOne({
        workerUserId: workerId,
      })
        .populate({
          path: "totalApplication",
          select: "postStatus",
        })
        .lean();

      if (!workerData) {
        throw new Error(
          "There is no data of userId in workerModel OR user?.id is null in header x-user-id. chcek getCurrentUserData()",
        );
      }

      const statusCounts: { PENDING: number; ACTIVE: number; ENDED: number } =
        workerData.totalApplication.reduce(
          (
            acc: { PENDING: number; ACTIVE: number; ENDED: number },
            offer: any,
          ) => {
            if (offer.postStatus === "PENDING") acc.PENDING++;
            if (offer.postStatus === "ACTIVE") acc.ACTIVE++;
            if (offer.postStatus === "ENDED") acc.ENDED++;
            return acc;
          },
          { PENDING: 0, ACTIVE: 0, ENDED: 0 },
        );

      console.log("WORKER DATA: ", workerData);
      const totalCount =
        statusCounts.ACTIVE + statusCounts.ENDED + statusCounts.PENDING;
      const totalWorkAssigned =
        totalCount > 0 ? (statusCounts.ACTIVE / totalCount) * 100 : 0;

      const finalData = {
        totalWorkEnded: statusCounts.ENDED,
        totalWorkAssigned,
      };
      return finalData;
    } catch (error) {
      console.log("ERROR IN workerData consumer/profile/Detail: ", error);

      return undefined;
    }
  };
  const final:
    | { totalWorkEnded: number; totalWorkAssigned: number }
    | undefined = await getWorkerData();
  console.log("DAta of workerhistory: ", final);

  const demoReview: ReviewDataType[] = [
    {
      reviewerName: "Sarah Jenkins",
      reviewerProfileImg:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      reviewedAt: "2026-06-15T10:30:00.000Z",
      stars: 5,
      description:
        "Absolute game changer! The quality exceeded all my expectations and delivery was super fast.",
    },
    {
      reviewerName: "Marcus Chen",
      reviewerProfileImg:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      reviewedAt: "2026-06-18T14:20:00.000Z",
      stars: 4,
      description:
        "Very solid performance. Customer support was helpful when I had a question about setup.",
    },
    {
      reviewerName: "Elena Rostova",
      reviewerProfileImg:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      reviewedAt: "2026-06-22T09:15:00.000Z",
      stars: 5,
      description:
        "Incredible attention to detail. It saved me hours of work. Highly recommend to anyone!",
    },
    {
      reviewerName: "David Miller",
      reviewerProfileImg:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      reviewedAt: "2026-07-01T16:45:00.000Z",
      stars: 3,
      description:
        "Good overall, but I ran into a minor bug on mobile view. Hope they patch it soon.",
    },
  ];

  return (
    <section className="flex flex-col gap-8">
      <div className="flex justify-between gap-8">
        <div className="rounded-md flex-1 bg-surface border border-border  p-8">
          <div>logo</div>

          <div>Trade Completed</div>

          <h4 className="text-right">{final?.totalWorkEnded}</h4>
        </div>

        <div className="rounded-md flex-1 bg-surface border border-border  p-8">
          <div>logo</div>
          <div>Stars</div>

          <h4 className="text-right">48</h4>
        </div>

        <div className="rounded-md flex-1 bg-surface border border-border  p-8">
          <div>logo</div>
          <div>Total Work Assigned</div>

          <h4 className="text-right">{final?.totalWorkAssigned}</h4>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h4>Reviews</h4>
          <div>MORE</div>
        </div>
        {/* <div className="flex flex-col  gap-8"> */}
        <div className=" grid grid-cols-2 gap-8">
          {demoReview && demoReview.length > 0 ? (
            demoReview.map((e: ReviewDataType, index: number) => {
              const reviewdDate = new Date(e.reviewedAt)
                .toISOString()
                .split("T")[0];
              return (
                <div
                  key={index}
                  className="flex  gap-4 bg-surface h-52 p-4 rounded-md  "
                >
                  <div className="flex  flex-2 flex-col justify-between ">
                    <div className="flex items-start  gap-4">
                      {/* prfile img  */}
                      <div className="flex  gap-4 items-center ">
                        <div className="relative  h-12 w-12 rounded-full overflow-hidden">
                          <Image
                            src={
                              e.reviewerProfileImg ||
                              "/hero/kaamdhaam_hero.jpeg"
                            }
                            alt={e.reviewerName}
                            fill
                            className="object-cover object-center hover:scale-110 scale-100 transition-all duration-500 "
                          />
                        </div>
                        {/* <div className=" leading-tight">
                          <h4>{e.reviewerName}</h4>
                          <div className="text-sm text-muted-text">
                            {reviewdDate}
                          </div>
                        </div> */}
                      </div>

                      <div className="flex flex-col gap-4 ">
                        <div className="  flex flex-col gap-1">
                          <div className="leading-tight ">
                            <div className="flex justify-between items-center">
                              <h4>{e.reviewerName}</h4>
                              <div className="text-sm text-muted-text">
                                {reviewdDate}
                              </div>
                            </div>

                            <div className="flex items-center gap-1 ">
                              {[0, 1, 2, 3, 4].map(
                                (ele: number, index: number) =>
                                  e.stars > ele && (
                                    <Star fill="yellow" key={index} size={14} />
                                  ),
                              )}{" "}
                            </div>
                          </div>
                        </div>
                        <div className=" line-clamp-3  tracking-tight leading-tight">
                          {e.description}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>No review</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Detail;
