import dbConnect from "@/lib/dbConnect";
import WorkPostModel from "@/lib/model/work/WorkPostModel";
import type { DbTypes } from "@/lib/type";
import type { workPostDataType } from "@/lib/zod-schema/workPost-schema/workPost-schema";
import Image from "next/image";
import Link from "next/link";
import { ImSad } from "react-icons/im";
import Pagination from "./Pagination";

const ListingPart = async ({
  query,
  category,
  page,
}: {
  query?: string;
  category?: string;
  page?: string;
}) => {
  const categoryText = Array.isArray(category) ? category.join(", ") : category;
  const pageNumber = page ? Number(page) : 1;
  const limit = 2;
  type GetPostedWorksResponse = {
    workData: (workPostDataType & DbTypes)[];
    totalWorks: number;
  };
  const filter: Record<string, any> = {
    status: { $ne: "ACTIVE" },
  };

  if (query) {
    filter.title = {
      $regex: query.trim(),
      $options: "i",
    };
  }

  if (category) {
    filter["category.label"] = {
      $in: Array.isArray(category) ? category : [category],
    };
  }

  console.log(filter);

  const getPostedWorks = async (): Promise<
    GetPostedWorksResponse | undefined
  > => {
    try {
      await dbConnect();

      const [workData, totalWorks] = await Promise.all([
        WorkPostModel.find(filter)
          .populate({
            path: "createdBy",
            select: "name profileImg",
          })
          .sort({ createdAt: -1 })
          .skip((pageNumber - 1) * limit)
          .limit(limit),

        WorkPostModel.countDocuments(filter),
      ]);
      console.log("WORKDATA in listing: ", workData);
      console.log("WORKDATA total: ", totalWorks);

      return { workData, totalWorks };
    } catch (error) {
      console.log("Error in getPostedWorks(): ", error);
    }
  };

  // const workData: (workPostDataType & DbTypes)[] =
  //   (await getPostedWorks()) as (workPostDataType & DbTypes)[];

  const result = await getPostedWorks();

  const workData = result?.workData ?? [];
  const totalWorks = result?.totalWorks ?? 0;

  console.log("workdate lsiting data filter: ", workData);

  return (
    <section className="">
      <div className="">
        <h1>Sevice Listing</h1>
        {(query || category) && workData && workData.length > 0 && (
          <label className="line-clamp-2">
            Results for:
            {query && ` ${query}`}
            {query && categoryText && " and"}
            {category && ` ${categoryText}`}
          </label>
        )}
      </div>

      <div className="flex flex-col gap-8 overflow-auto scrollbar-custom  ">
        {workData && workData.length > 0 ? (
          workData.map((e: workPostDataType & DbTypes, index: number) => (
            <div
              key={index}
              className="flex gap-4 bg-surface h-72 p-2 rounded-md  "
            >
              <div className="relative   flex-1 overflow-hidden">
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
              </div>

              <div className="flex  flex-2 flex-col justify-between ">
                <div className="flex  flex-col gap-4">
                  {/* prfile img and name top  */}
                  <div className="flex  gap-4 items-center ">
                    <div className="relative  h-6 w-6 rounded-full overflow-hidden">
                      <Image
                        src={
                          (e.createdBy && e.createdBy.profileImg) ||
                          "/hero/kaamdhaam_hero.jpeg"
                        }
                        alt={`created By ${e.createdBy.name}`}
                        fill
                        className="object-cover object-center hover:scale-110 scale-100 transition-all duration-500 "
                      />
                    </div>

                    <div>{e.createdBy.name}</div>
                  </div>

                  {/* title subtitle  */}
                  <div className=" flex flex-col gap-4 ">
                    {" "}
                    <h4 className=" line-clamp-2 tracking-tight leading-tight">
                      {e.title}
                    </h4>
                    <p className=" line-clamp-4 tracking-tight leading-tight">
                      {e.subTitle}
                    </p>
                  </div>
                </div>

                {/* link btn  */}
                {/* <div className=""> */}
                <Link
                  href={`/consumer/work-detail?workPostId=${e._id}`}
                  className="px-2 py-2 w-fit border bg-green-700 text-white"
                >
                  Offer Service
                </Link>
                {/* </div> */}
              </div>
            </div>
          ))
        ) : (
          <div className="h-92 bg-surface flex flex-col gap-4 justify-center items-center">
            <ImSad size={72} className="text-gray-400/75" />

            <div className="text-md px-4 line-clamp-4">
              No Data found for:
              {query && ` ${query}`}
              {query && categoryText && " and"}
              {category && ` ${categoryText}`}
            </div>
          </div>
        )}
      </div>

      {workData && workData.length > 0 && (
        <Pagination
          pageNumber={pageNumber}
          totalWorks={totalWorks}
          limit={limit}
        />
      )}
    </section>
  );
};

export default ListingPart;
