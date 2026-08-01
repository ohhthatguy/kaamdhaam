import BreadCrumb from "@/lib/component/BreadCrumb";
import dbConnect from "@/lib/dbConnect";
import WorkPostModel from "@/lib/model/work/WorkPostModel";
import type { DbTypes, breadCrumbDataType } from "@/lib/type";
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

  const breadCrumbData: breadCrumbDataType[] = [
    {
      title: "Home",
      link: `/consumer/homepage`,
      isCurrent: false,
    },
    {
      title: "Work Detail",

      isCurrent: true,
    },
  ];

  return (
    <div className="mx-28 py-8 flex flex-col gap-4">
      <BreadCrumb breadCrumbData={breadCrumbData} />
      <div className="grid gap-8 grid-cols-[1.35fr_0.65fr]">
        <WorkDetail postDetail={postDetail} />
        <EmployerDetail postDetail={postDetail} />
      </div>
    </div>
  );
};

export default page;
