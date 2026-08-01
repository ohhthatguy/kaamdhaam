import type { breadCrumbDataType } from "@/lib/type";
import Link from "next/link";

const BreadCrumb = ({
  breadCrumbData,
}: {
  breadCrumbData: breadCrumbDataType[];
}) => {
  return (
    <section className="flex gap-2 ">
      {breadCrumbData.map((e: breadCrumbDataType, index: number) => (
        <div key={index}>
          {e.isCurrent ? (
            <div className="font-bold">{e.title}</div>
          ) : (
            <div className="flex gap-2 ">
              <Link
                className="hover:cursor-pointer hover:underline"
                href={e.link!}
              >
                {e.title}
              </Link>
              <div> -</div>
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default BreadCrumb;
