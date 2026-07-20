import FilterPart from "./FilterPart";
import ListingPart from "./ListingPart";

const WorkListing = async ({
  query = "",
  category = "",
  page = "1",
}: {
  query?: string;
  category?: string;
  page?: string;
}) => {
  console.log("query: ", query);
  console.log("category: ", category);
  console.log("page: ", page);

  const getWorkListing = async ({
    query,
    category,
    page,
  }: {
    query?: string;
    category?: string;
    page?: string;
  }) => {
    try {
    } catch (err) {
      console.log("Error in fetWorklisting in /consumer/dashboard");
    }
  };

  const workers = await getWorkListing({ query, category, page });

  return (
    <section className=" h-[80vh] overflow-auto scrollbar-custom border grid grid-cols-[0.5fr_1.75fr] gap-8">
      <FilterPart />
      <ListingPart query={query} category={category} page={page} />
    </section>
  );
};

export default WorkListing;
