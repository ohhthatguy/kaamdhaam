import dbConnect from "@/lib/dbConnect";
import OfferModel from "@/lib/model/offer/OfferModel";

const IntrestedWorker = async ({ workPostId }: { workPostId: string }) => {
  const getWorkPostDetail = async () => {
    try {
      await dbConnect();
      const postDetail = await OfferModel.findOne({ postId: workPostId });

      return postDetail;
    } catch (error) {
      console.log("Error in getPostedWorks(): ", error);
    }
  };

  const workers = await getWorkPostDetail();
  console.log("asd");
  console.log(workers);
  console.log("asd");

  return (
    <div className="border">
      {workers ? (
        <div></div>
      ) : (
        <div className=" flex flex-col justify-center items-center">
          <div>img</div>
          <div>No OFFERS YET!</div>
        </div>
      )}
    </div>
  );
};

export default IntrestedWorker;
