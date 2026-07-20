import dbConnect from "@/lib/dbConnect";
import WorkPostModel from "@/lib/model/work/WorkPostModel";
import { DbTypes } from "@/lib/type";
import { workPostDataType } from "@/lib/zod-schema/workPost-schema/workPost-schema";
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

  const getPostedWorks = async () => {
    try {
      await dbConnect();
      const workData = await WorkPostModel.find({})
        .sort({ createdAt: -1 })
        .skip((pageNumber - 1) * 5)
        .limit(5);
      console.log("WORKDATA: ", workData);
      return workData;
    } catch (error) {
      console.log("Error in getPostedWorks(): ", error);
    }
  };

  const workData: (workPostDataType & DbTypes)[] =
    (await getPostedWorks()) as (workPostDataType & DbTypes)[];

  return (
    <section className="">
      <div>
        <h1>Sevice Listing</h1>
        {(query || category) && (
          <label>
            Results for:
            {query && ` ${query}`}
            {query && categoryText && " and"}
            {category && ` ${categoryText}`}
          </label>
        )}
      </div>

      <div className="flex flex-col gap-4">asdasd</div>
    </section>
  );
};

export default ListingPart;
