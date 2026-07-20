import dbConnect from "@/lib/dbConnect";
import WorkPostModel from "@/lib/model/work/WorkPostModel";
import type { DbTypes } from "@/lib/type";
import type { workPostDataType } from "@/lib/zod-schema/workPost-schema/workPost-schema";
import Image from "next/image";
import Link from "next/link";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ _id: string }>;
}) => {
  const { _id } = await searchParams;
  const getPostedWorks = async () => {
    try {
      await dbConnect();
      const workData = await WorkPostModel.find({ createdBy: _id }).sort({
        createdAt: -1,
      });

      console.log("WORKDATA: ", workData);
      return workData;
    } catch (error) {
      console.log("Error in getPostedWorks(): ", error);
    }
  };

  const workData: (workPostDataType & DbTypes)[] =
    (await getPostedWorks()) as (workPostDataType & DbTypes)[];

  return (
    <section className="mx-32 py-8 flex flex-col gap-8 min-h-screen ">
      <div className="flex justify-between items-center">
        <h3>MY POSTED WORKS ({workData.length})</h3>
      </div>

      <div
        className={`grid ${workData.length <= 1 ? "grid-cols-1" : "grid-cols-2"}   gap-8  `}
      >
        {workData.length > 0 ? (
          workData.map((e: workPostDataType & DbTypes, index: number) => (
            <div key={index} className=" flex flex-col gap-4 h-[90vh] border ">
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

export default Page;
