import dbConnect from "@/lib/dbConnect";
import WorkPostModel from "@/lib/model/work/WorkPostModel";
import type { DbTypes } from "@/lib/type";
import type { workPostDataType } from "@/lib/zod-schema/workPost-schema/workPost-schema";

const EmployerDetail = async ({ workPostId }: { workPostId: string }) => {
  const getPostedWorks = async (): Promise<
    (workPostDataType & DbTypes) | undefined
  > => {
    try {
      await dbConnect();

      const workData = await WorkPostModel.findOne({
        _id: workPostId,
      }).populate({
        path: "createdBy",
        select: "name profileImg",
      });

      console.log("WORKDATA in listing: ", workData);

      return workData;
    } catch (error) {
      console.log("Error in getPostedWorks() in employerDetail: ", error);
    }
  };

  //   const postDetail: (workPostDataType & DbTypes) | undefined =
  //     await getPostedWorks();
  //   console.log(postDetail);

  return <div className="border">EmployerDetail</div>;
};

export default EmployerDetail;
