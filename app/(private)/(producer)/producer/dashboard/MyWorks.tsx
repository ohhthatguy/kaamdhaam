import dbConnect from "@/lib/dbConnect";
import { getCurrentUserData } from "@/lib/hooks/getCurrentUserData";
import WorkPostModel from "@/lib/model/work/WorkPostModel";
import type { DbTypes } from "@/lib/type";
import type { workPostDataType } from "@/lib/zod-schema/workPost-schema/workPost-schema";
import Image from "next/image";
import Link from "next/link";

const MyWorks = async () => {
  const user = await getCurrentUserData();

  const getPostedWorks = async () => {
    try {
      await dbConnect();
      const workData = await WorkPostModel.find({
        createdBy: user?.id,
        status: { $ne: "ENDED" },
      })
        .sort({ createdAt: -1 })
        .limit(2);
      console.log("WORKDATA: ", workData);
      return workData;
    } catch (error) {
      console.log("Error in getPostedWorks(): ", error);
    }
  };

  const workData: (workPostDataType & DbTypes)[] =
    (await getPostedWorks()) as (workPostDataType & DbTypes)[];

  return (
    <section className="flex flex-col gap-8 ">
      <div className="flex justify-between items-center">
        <h3>MY POSTED WORKS</h3>
        <Link
          href={`/producer/all-work-posts`}
          className="hover:cursor-pointer underline"
        >
          MORE
        </Link>
      </div>

      <div
        className={`grid ${workData.length === 2 ? "grid-cols-[1.25fr_0.75fr]" : "grid-cols-1"}   gap-8 h-[90vh] `}
      >
        {workData.length > 0 ? (
          workData.map((e: workPostDataType & DbTypes, index: number) => (
            <div key={index} className=" flex flex-col gap-4 ">
              <Link
                href={`/producer/work-detail?workPostId=${e._id}`}
                className="relative h-full overflow-hidden hover:cursor-pointer"
              >
                <Image
                  src={
                    (e.workImg &&
                      e.workImg.length > 0 &&
                      e.workImg[0].imgSrc) ||
                    "/hero/kaamdhaam_hero.jpeg"
                  }
                  alt={e.title}
                  fill
                  className="object-cover object-center hover:scale-110 scale-100 transition-all duration-500 "
                />
              </Link>
              <div className="">
                <div className="flex flex-col gap-2">
                  <div>
                    <span className="px-2 py-1 rounded-md border bg-green-800 text-white">
                      {" "}
                      {e.category[0].label}
                    </span>
                  </div>

                  <div className="flex flex-col gap-4 ">
                    <div className=" break-word">
                      <h4 className="leading-tight tracking-tight font-semibold">
                        {e.title}
                      </h4>
                      <div className="text-muted-text">
                        Started on 12 nov, 2024 . 4 offers recieved
                      </div>
                    </div>
                    <div className="font-bold">
                      Rs. {e.rate} ({e.rateType})
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="h-full flex justify-center items-center gap-4 bg-green-400 border">
            THERE IS no WORK Made!
          </div>
        )}
      </div>
    </section>
  );
};

export default MyWorks;
