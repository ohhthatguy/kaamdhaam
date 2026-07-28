import dbConnect from "@/lib/dbConnect";
import WorkPostModel from "@/lib/model/work/WorkPostModel";
import type { DbTypes } from "@/lib/type";
import type { workPostDataType } from "@/lib/zod-schema/workPost-schema/workPost-schema";
import EmployerDetail from "./EmployerDetail";
import WorkDetail from "./WorkDetail";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ workPostId: string }>;
}) => {
  const { workPostId } = await searchParams;

  const getWorkPostDetail = async () => {
    try {
      await dbConnect();
      const postDetail = await WorkPostModel.findOne({
        _id: workPostId,
      }).populate({
        path: "createdBy",
        select: "name profileImg",
      });

      return postDetail;
    } catch (error) {
      console.log("Error in getPostedWorks(): ", error);
    }
  };

  const postDetail: workPostDataType & DbTypes =
    (await getWorkPostDetail()) as workPostDataType & DbTypes;
  console.log(postDetail);

  return (
    <div className="mx-28 py-8 grid gap-8 grid-cols-[1.35fr_0.65fr]">
      <WorkDetail postDetail={postDetail} />
      <EmployerDetail postDetail={postDetail} />
    </div>
  );
};

export default page;
