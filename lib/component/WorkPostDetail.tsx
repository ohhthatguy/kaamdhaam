import Image from "next/image";
import dbConnect from "../dbConnect";
import RenderedOnlyShowLocationMap from "../map/OnlyShowLocationMap.tsx/RenderedOnlyShowLocationMap";
import WorkPostModel from "../model/work/WorkPostModel";
import type { DbTypes } from "../type";
import type { workPostDataType } from "../zod-schema/workPost-schema/workPost-schema";

const WorkPostDetail = async ({ workPostId }: { workPostId: string }) => {
  const getWorkPostDetail = async () => {
    try {
      await dbConnect();
      const postDetail = await WorkPostModel.findOne({ _id: workPostId });

      return postDetail;
    } catch (error) {
      console.log("Error in getPostedWorks(): ", error);
    }
  };

  const postDetail: workPostDataType & DbTypes =
    (await getWorkPostDetail()) as workPostDataType & DbTypes;
  console.log(postDetail);
  return (
    <section className=" flex flex-col gap-8">
      <div className="relative h-[70vh] overflow-hidden hover:cursor-pointer">
        <Image
          src={
            (postDetail.workImg &&
              postDetail.workImg.length > 0 &&
              postDetail.workImg[0].imgSrc) ||
            "/hero/kaamdhaam_hero.jpeg"
          }
          alt={postDetail.title}
          fill
          className="object-cover object-center hover:scale-110 scale-100 transition-all duration-500 "
        />
      </div>

      <div className="">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-4">
            {postDetail.category.map(
              (e: { value: string; label: string }, index: number) => (
                <span
                  key={index}
                  className="px-2 py-1 rounded-md border bg-green-800 text-white"
                >
                  {" "}
                  {e.label}
                </span>
              ),
            )}
          </div>

          <div>
            <h2>{postDetail.title}</h2>
            <div className="text-muted-text">
              {postDetail.createdAt?.toString()}
            </div>
          </div>
        </div>
      </div>

      <div className="flex  gap-4 border-y py-4">
        <div className="flex flex-col ">
          <p>Offer</p>
          <p>
            Npr {postDetail.rate} ({postDetail.rateType})
          </p>
        </div>
        <div className=" border  border-border" />
        <div className="flex flex-col ">
          <p>ESTIMATED TIME</p>
          <p>{postDetail.expectedTime}</p>
        </div>
      </div>

      <p>{postDetail.subTitle}</p>
      <p>{postDetail.finalDeliverable}</p>

      <div className="flex flex-col gap-4">
        <p className="text-xl">Service Location</p>

        <RenderedOnlyShowLocationMap
          position={[
            postDetail.locationCord.coordinates[1],
            postDetail.locationCord.coordinates[0],
          ]}
          zoom={13}
        />
      </div>
    </section>
  );
};

export default WorkPostDetail;
