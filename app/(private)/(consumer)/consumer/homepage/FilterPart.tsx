"use client";

import { skillOption } from "@/app/(public)/(auth)/signup/(forms)/data";
import { skillOptionDataType } from "@/app/(public)/(auth)/signup/(forms)/type";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const FilterPart = () => {
  const [userQuery, setUserQuery] = useState<string>("");
  const [skills, setSkills] = useState<skillOptionDataType[]>(skillOption);

  const isFirstLoad = useRef<boolean>(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearchChange = (query: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (query.trim()) {
      params.set("query", query);
    } else {
      params.delete("query");
    }

    router.replace(`?${params.toString()}`);
  };

  useEffect(() => {
    if (!isFirstLoad.current) {
      const timer = setTimeout(() => {
        handleSearchChange(userQuery);
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    } else {
      isFirstLoad.current = false;

      //this right here makes sure even if refresh the query matches the search

      const params = new URLSearchParams(searchParams.toString());
      const currentCategories = params.getAll("category");
      const currentQuery = params.get("query") || "";
      setUserQuery(currentQuery);
      setSkills((prev) =>
        prev.map((ele) =>
          currentCategories.includes(ele.label)
            ? { ...ele, isSelected: !ele.isSelected }
            : ele,
        ),
      );
    }
  }, [userQuery]);

  const handleCategoryClick = (e: skillOptionDataType) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentCategories = params.getAll("category");
    console.log("all category: ", currentCategories);

    if (currentCategories.includes(e.label)) {
      // remove
      params.delete("category");
      currentCategories
        .filter((c) => c !== e.label)
        .forEach((c) => params.append("category", c));
    } else {
      params.append("category", e.label);
    }
    router.replace(`?${params.toString()}`);

    setSkills((prev) =>
      prev.map((ele) =>
        ele.label === e.label ? { ...ele, isSelected: !ele.isSelected } : ele,
      ),
    );
  };

  return (
    <section className="">
      <h1>FILTER</h1>

      <div className="flex flex-col gap-4 overflow-auto scrollbar-custom ">
        <div>
          <input
            className="w-full bg-surface px-2 py-4"
            placeholder="Seach something..."
            onChange={(e) => setUserQuery(e.target.value)}
            value={userQuery}
          />
        </div>

        <h4>Category</h4>
        <div className=" flex bg-surface rounded-md gap-4 flex-wrap  h-72 p-2  overflow-auto scrollbar-custom ">
          {skills.map((e: skillOptionDataType, index: number) => (
            <div
              key={index}
              onClick={() => handleCategoryClick(e)}
              className={`border  w-full p-2 rounded-md hover:cursor-pointer hover:scale-105 scale-100 transition-all duration-500 ${e.isSelected ? "bg-blue-400" : "bg-blue-800/5 hover:bg-blue-400/35"}`}
            >
              {e.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FilterPart;
