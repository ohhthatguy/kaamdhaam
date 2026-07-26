"use client";

import { useRouter, useSearchParams } from "next/navigation";

const Pagination = ({
  pageNumber,
  totalWorks,
  limit,
}: {
  pageNumber: number;
  totalWorks: number;
  limit: number;
}) => {
  const total = Math.ceil(totalWorks / limit);
  console.log(total);
  const router = useRouter();
  const searchParams = useSearchParams();

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", page.toString());

    router.push(`?${params.toString()}`);
  };

  return (
    <div className=" flex justify-center items-center mt-4 p-4 gap-8 ">
      <button
        onClick={() => changePage(pageNumber - 1)}
        disabled={pageNumber === 1}
        className="rounded-md p-2 hover:cursor-pointer disabled:hover:cursor-default  disabled:text-muted-text bg-surface font-bold disabled:font-normal"
      >
        prev
      </button>
      <div>
        page <span className="font-semibold">{pageNumber}</span> of{" "}
        <span className="font-bold">{total}</span>
      </div>
      <button
        onClick={() => changePage(pageNumber + 1)}
        disabled={total === pageNumber}
        className="rounded-md p-2 hover:cursor-pointer disabled:hover:cursor-default disabled:text-muted-text  bg-surface font-bold disabled:font-normal"
      >
        next
      </button>
    </div>
  );
};

export default Pagination;
