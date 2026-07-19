import dbConnect from "@/lib/dbConnect";
import WorkPostModel from "@/lib/model/work/WorkPostModel";
import type { workPostDataType } from "@/lib/zod-schema/workPost-schema/workPost-schema";
import Image from "next/image";
import Link from "next/link";

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
    <section className="flex flex-col gap-8 ">
      <div className="flex justify-between items-center">
        <h3>MY POSTED WORKS</h3>
        <p className="hover:cursor-pointer underline">MORE</p>
      </div>

      <div
        className={`grid ${workData.length === 2 ? "grid-cols-[1.25fr_0.75fr]" : "grid-cols-1"}   gap-8 h-[90vh] `}
      >
        {workData.length > 0 ? (
          workData.map((e: workPostDataType, index: number) => (
            <div key={index} className=" flex flex-col gap-4 ">
              <Link
                href={"/asd"}
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

                  <div className="flex justify-between ">
                    <div>
                      <h2>{e.title}</h2>
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

//  <div className=" flex flex-col gap-4 ">
//           <div className="relative h-full overflow-hidden ">
//             <Image
//               src={"/hero/kaamdhaam_hero.jpeg"}
//               alt={"asd"}
//               fill
//               className="object-cover object-center hover:scale-110 scale-100 transition-all duration-500 "
//             />
//           </div>
//           <div className="">
//             <div className="flex flex-col gap-2">
//               <div>
//                 <span className="px-2 py-1 rounded-md border bg-green-800 text-white">
//                   {" "}
//                   Categoy[0]
//                 </span>
//               </div>

//               <div className="flex justify-between ">
//                 <div>
//                   <h2>Title</h2>
//                   <div className="text-muted-text">
//                     Started on 12 nov, 2024 . 4 offers recieved
//                   </div>
//                 </div>
//                 <div className="font-bold">Rs. 345 / task</div>
//               </div>
//             </div>
//           </div>
//           {/* <div className="flex justify-between items-center ">
//             <div className="flex flex-col gap-2">
//               <div>
//                 <span className="px-2 py-1 rounded-md border bg-green-800 text-white">
//                   {" "}
//                   Categoy[0]
//                 </span>
//               </div>
//               <div>
//                 <h2>Title</h2>
//                 <div className="text-muted-text">
//                   Started on 12 nov, 2024 . 4 offers recieved
//                 </div>
//               </div>
//             </div>
//             <div className="font-bold">Rs. 345 / task</div>
//           </div> */}
//         </div>
