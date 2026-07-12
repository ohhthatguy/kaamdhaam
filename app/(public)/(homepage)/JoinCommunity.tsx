"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
// import { ParallaxImageAnimation } from "@/lib/component/ParallaxImageAnimation";
import { useRef } from "react";
import { kaamdhaamServiceData } from "./data";
import type { PopularProjectDataType } from "./type";

const JoinCommunity = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const childArr = Array.from(containerRef.current!.children);

      childArr.forEach((e) => {
        gsap.fromTo(
          e,
          {
            opacity: 0.2,
            y: 100,
          },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: e,
              start: "top 80%",
              end: "top 30%",
              scrub: true,
              // markers: true,
            },
          },
        );
      });
    },
    { scope: containerRef },
  );

  return (
    <section className="min-h-screen  py-4 bg-gray-200 px-8 flex flex-col justify-center items-center gap-4 ">
      <h4 className=" w-full">Services from Kaamdhaam</h4>

      <div
        ref={containerRef}
        className="w-full columns-1 xs:columns-2 lg:columns-3 gap-6"
      >
        {kaamdhaamServiceData.map(
          (e: PopularProjectDataType, index: number) => (
            <div
              key={index}
              className="relative mb-6 break-inside-avoid border-b "
            >
              <div className="relative aspect-video xs:aspect-square  w-full flex-1">
                {/* <ParallaxImageAnimation imgSrc={e.imgSrc} /> */}
                <Image
                  src={e.imgSrc}
                  alt="Local Marketplace Background"
                  fill
                  priority
                  className="object-cover "
                />
              </div>
              <div className="absolute inset-0 bg-blue-700/20 text-2xl top-11/12 text-dark font-bold">
                {e.title}
              </div>
            </div>
          ),
        )}
      </div>
      {/* <div className="grid grid-cols-3 auto-rows-2fr w-full gap-4 border overflow-hidden">
        {kaamdhaamServiceData.map(
          (e: PopularProjectDataType, index: number) => (
            <div key={index} className="">
              <div className="relative h-30  w-full flex-1">
                <Image
                  src={e.imgSrc}
                  alt="Local Marketplace Background"
                  fill
                  priority
                  className="object-cover "
                />
              </div>
              <div>{e.title}</div>
            </div>
          ),
        )}
      </div> */}
    </section>
    // <div>
    //   <section
    //     ref={wrapperRef}
    //     className="h-screen hhh bg-green-600/50 flex flex-col py-22 gap-8 justify-center items-center px-4"
    //   >
    //     <div className="text-5xl  w-full">JOIN THE MOVEMENT</div>

    //     <div ref={containerRef} className="grid  grid-cols-2 w-full gap-4">
    //       <section className="relative transition-all duration-500 ease-in-out ">
    //         <ParallaxImageAnimation imgSrc="/hero/kaamdhaam_hero.jpeg" />

    //         <div className="absolute top-1/2 bg-orange-400/70 inset-0 ">
    //           <div className="text-5xl">Consumer</div>
    //           <div className="text-2xl">Directly from your community</div>
    //         </div>
    //       </section>
    //       <div className="relative  transition-all duration-500 ease-in-out ">
    //         <ParallaxImageAnimation imgSrc="/hero/kaamdhaam_hero.jpeg" />
    //         <div className="absolute top-1/2 bg-orange-400/70 inset-0 ">
    //           <div className="text-5xl">Consumer</div>
    //           <div className="text-2xl">Directly from your community</div>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    // </div>
  );
};

export default JoinCommunity;
