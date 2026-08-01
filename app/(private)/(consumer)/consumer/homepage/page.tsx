import Intro from "./Intro";

import FilterPart from "./FilterPart";
import ListingPart from "./ListingPart";

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
  const { query, category, page } = await searchParams;

  return (
    <div className="mx-32   flex flex-col gap-12">
      <Intro />
      <section className="  grid grid-cols-[0.5fr_1.75fr] gap-8">
        <FilterPart />
        <ListingPart query={query} category={category} page={page} />
      </section>
    </div>
  );
};

export default Page;
