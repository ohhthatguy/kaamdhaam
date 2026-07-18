import dbConnect from "@/lib/dbConnect";
import WorkPostModel from "@/lib/model/work/WorkPostModel";
import type { workPostDataType } from "@/lib/zod-schema/workPost-schema/workPost-schema";
import Image from "next/image";

const MyWorks = async ({ _id }: { _id: string }) => {
  const getPostedWorks = async () => {
    try {
      await dbConnect();
      const workData = await WorkPostModel.find({ createdBy: _id })
        .sort({ createdAt: -1 })
        .limit(3);
      console.log("WORKDATA: ", workData);
      return workData;
    } catch (error) {
      console.log("Error in getPostedWorks(): ", error);
    }
  };

  const workData: workPostDataType[] =
    (await getPostedWorks()) as workPostDataType[];

  return (
    <section className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h3>MY POSTED WORKS</h3>
        <p className="hover:cursor-pointer underline">MORE</p>
      </div>

      <div className="grid gird-cols-[1.25fr_0.75fr] gap-4 ">
        <div className="">
          <div className="relative h-56 w-56">
            <Image
              src={"/hero/kaamdhaam_hero.jpeg"}
              alt={"asd"}
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyWorks;

//  {workData.map((e: workPostDataType, index: number) => (
//           <div key={index} className="">
//             <div className="relative h-56 w-56">
//               <Image
//                 src={
//                   (e.workImg && e.workImg.length > 0 && e.workImg[0].imgSrc) ||
//                   "/hero/kaamdhaam_hero.jpeg"
//                 }
//                 alt={e.title}
//                 fill
//                 className="object-cover object-center"
//               />
//             </div>
//           </div>
//         ))}
