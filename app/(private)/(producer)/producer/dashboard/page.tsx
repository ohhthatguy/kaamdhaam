import History from "./History";
import Intro from "./Intro";
import MyWorks from "./MyWorks";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ _id: string; name: string }>;
}) => {
  const { _id, name } = await searchParams;

  return (
    <div className="mx-32 py-8 flex flex-col gap-12">
      <Intro name={name} _id={_id} />
      <MyWorks _id={_id} />
      <History _id={_id} />
    </div>
  );
};

export default Page;
