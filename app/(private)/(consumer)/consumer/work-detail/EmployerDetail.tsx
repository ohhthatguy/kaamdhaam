import dbConnect from "@/lib/dbConnect";
import WorkPostModel from "@/lib/model/work/WorkPostModel";
import type { DbTypes } from "@/lib/type";
import type { workPostDataType } from "@/lib/zod-schema/workPost-schema/workPost-schema";

import Image from "next/image";
import Link from "next/link";
import { ImArrowRight2, ImSad } from "react-icons/im";

const EmployerDetail = async ({
  postDetail,
}: {
  postDetail: workPostDataType & DbTypes;
}) => {
  console.log("POST DETAIL IN consumer SIDE: ", postDetail);

  const getPostedWorks = async (): Promise<
    (workPostDataType & DbTypes)[] | undefined
  > => {
    try {
      await dbConnect();

      const workData = await WorkPostModel.find({
        _id: { $ne: postDetail._id },
      })
        .sort({ createdAt: -1 })
        .limit(3);

      console.log("WORKDATA in listing: ", workData);

      return workData;
    } catch (error) {
      console.log("Error in getPostedWorks(): ", error);
    }
  };

  const moreWork = await getPostedWorks();
  console.log(moreWork);
  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col border border-border h-[60vh]  bg-surface gap-8 justify-center items-center ">
        <div className=" flex flex-col  bg-surface gap-4 justify-center items-center">
          <div className="relative  h-48 w-48 rounded-md overflow-hidden">
            <Image
              src={
                (postDetail.createdBy && postDetail.createdBy.profileImg) ||
                "/hero/kaamdhaam_hero.jpeg"
              }
              alt={`created By ${postDetail.createdBy.name}`}
              fill
              className="object-cover object-center "
            />
          </div>

          <h4>{postDetail.createdBy.name}</h4>
        </div>
        {/* <div> */}
        <Link
          href="/asd"
          className="border border-border px-4 py-2 rounded-md text-white hover:scale-105 scale-100 transition-all duration-500 bg-green-800/85"
        >
          I'm Intrested!
        </Link>
        {/* </div> */}
      </div>

      <div>
        <h6 className="capitalize text-md">OTHER OPPOURTUNITIES </h6>
        <div className="flex flex-col mt-4 gap-4">
          {moreWork && moreWork.length > 0 ? (
            moreWork.map((e: workPostDataType & DbTypes, index: number) => (
              <div
                key={index}
                className=" flex h-26 px-4 border border-border bg-surface gap-4 items-center"
              >
                <div className="relative  h-18 w-18 rounded-md overflow-hidden">
                  <Image
                    src={
                      (postDetail.workImg &&
                        postDetail.workImg.length > 0 &&
                        postDetail.workImg[0].imgSrc) ||
                      "/hero/kaamdhaam_hero.jpeg"
                    }
                    alt={`casd`}
                    fill
                    className="object-cover object-center "
                  />
                </div>

                <div className=" flex flex-col  w-full gap-2">
                  <div className="leading-tight tracking-tight line-clamp-1 capitalize font-medium text-gray-900/75">
                    {e.title}
                  </div>

                  <div className="text-xs items-center  font-gray-900 flex justify-between">
                    <div>
                      {" "}
                      Rs {e.rate} {e.rateType}{" "}
                    </div>
                    <Link href={`/consumer/work-detail?workPostId=${e._id}`}>
                      <ImArrowRight2
                        size={22}
                        className={`hover:cursor-pointer hover:text-green-400/75 transition-colors duration-200 text-gray-400/75`}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-92 bg-surface flex flex-col gap-4 justify-center items-center">
              <ImSad size={72} className="text-gray-400/75" />

              <div className="text-md px-4 line-clamp-4">
                No More Data Found!
              </div>
            </div>
          )}

          {moreWork && moreWork.length > 0 && (
            <Link
              className=" underline text-center hover:cursor-pointer hover:text-blue-700/75 transition-colors duration-200 text-gray-900/75 "
              href={`/consumer/work-detail?workPostId=`}
            >
              MORE
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default EmployerDetail;
