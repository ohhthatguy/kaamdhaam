// import dbConnect from "@/lib/dbConnect";
// import { getCurrentUserData } from "@/lib/hooks/getCurrentUserData";
// import OfferModel from "@/lib/model/offer/OfferModel";
// import WorkerModel from "@/lib/model/worker/WorkerModel";
import { ImSad } from "react-icons/im";
import { columns, producerJobManagementDataType } from "./column";
import { DataTable } from "./DataTable";

// async function getData(): Promise<producerJobManagementDataType[] | undefined> {
// Fetch data from your API here.
// const user = await getCurrentUserData();

// try {
//   await dbConnect();
//   await OfferModel;
//   const workerData = await WorkerModel.findOne({
//     workerUserId: user?.id,
//   })
//     .populate({
//       path: "totalApplication",

//       populate: {
//         path: "postId",
//         select: "title status rate rateType createdAt expectedTime",
//       },
//     })
//     .lean();

//   if (!workerData) {
//     throw new Error(
//       "There is no data of userId in workerModel OR user?.id is null in header x-user-id. chcek getCurrentUserData()",
//     );
//   }

//   console.log("WORKER DATA in renderTable: ", workerData);

//   const finalTableData: consumerApplicationDataType[] = [];

//   workerData.totalApplication.map((e) => {
//     const data = {
//       title: e.postId.title,
//       rate: `${e.postId.rate} / ${e.postId.rateType}`,
//       status: e.postId.status,
//       dateApplied: e.postId.createdAt,
//       expectedTime: e.postId.expectedTime,
//       postId: e.postId._id.toString(),
//     };
//     finalTableData.push(data);
//   });

//   console.log("Final tbale data: ", finalTableData);

//   return finalTableData;
// } catch (error) {
//   console.log(
//     "ERROR IN workerData consumer/application/renderTable: ",
//     error,
//   );
// }

export default async function Rendertable({
  data,
}: {
  data: producerJobManagementDataType[];
}) {
  // const data = await getData();

  console.log("data in producer table: ", data);

  if (!data) {
    return (
      <div className="h-92 bg-surface flex flex-col gap-4 justify-center items-center">
        <ImSad size={72} className="text-gray-400/75" />

        <div className="text-md px-4 line-clamp-4">No More Data Found!</div>
      </div>
    );
  }

  return (
    // <div className="container border border-red-600 mx-auto py-10">
    <DataTable columns={columns} data={data} />
    // </div>
  );
}
