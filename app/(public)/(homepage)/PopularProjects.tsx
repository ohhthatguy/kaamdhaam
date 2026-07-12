import Image from "next/image";
import { popularProjectsData } from "./data";
import type { PopularProjectDataType } from "./type";

const PopularProjects = () => {
  return (
    <section className="h-screen py-4 bg-gray-200 px-8 flex flex-col justify-center items-center gap-4 ">
      <h4 className=" w-full">Popular Projects from kaamdhaam</h4>

      <div className="grid grid-cols-[1.25fr_0.75fr] gap-8">
        <div className=" flex flex-col   gap-4">
          <div className="relative  h-5/5 w-full">
            <Image
              src={popularProjectsData[0].imgSrc}
              alt="Local Marketplace Background"
              fill
              priority
              className="object-cover "
            />
          </div>

          <div className=" flex  flex-col gap-2 ">
            <div className="font-bold text-2xl tracking-tight leading-tight flex gap-4 items-center">
              <span className="text-xl text-white bg-green-900 p-1">
                POPULAR
              </span>
              <span className="font-bold text-2xl tracking-tight leading-tight">
                {popularProjectsData[0].title}{" "}
              </span>
            </div>
            <div className="text-xs tracking-tight leading-tight">
              {popularProjectsData[0].subTitle}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between ">
          {popularProjectsData.map(
            (e: PopularProjectDataType, index: number) => {
              if (index === 0) return;
              return (
                <div
                  key={index}
                  className={`py-4 ${index === 2 && "border-t border-b border-border"} flex gap-8 justify-center items-center`}
                >
                  <div className="relative h-30  w-full flex-1">
                    <Image
                      src={e.imgSrc}
                      alt="Local Marketplace Background"
                      fill
                      priority
                      className="object-cover "
                    />
                  </div>

                  <div className="flex-2 flex flex-col gap-2">
                    <div className="font-bold text-2xl tracking-tight leading-tight">
                      {e.title}
                    </div>
                    <div className="text-xs tracking-tight leading-tight">
                      {e.subTitle}
                    </div>
                  </div>
                </div>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
};

export default PopularProjects;
