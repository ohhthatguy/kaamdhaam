import Intro from "./Intro";
import WorkListing from "./WorkListing";
const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    _id: string;
    name: string;
    query?: string;
    category?: string;
    page?: string;
  }>;
}) => {
  const { _id, name, query, category, page } = await searchParams;

  return (
    <div className="mx-32 py-8 flex flex-col gap-12">
      <Intro name={name} _id={_id} />
      <WorkListing query={query} category={category} page={page} />
    </div>
  );
};

export default Page;
