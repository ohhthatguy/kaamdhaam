"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";
import { workingStepsData } from "./data";
import type { workingStepsDataType } from "./type";

const HowItWorks = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerTextRef = useRef<HTMLDivElement>(null);
  const containerImgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom",
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
          // markers: true,
          pinSpacing: true,
        },
      });

      const childTextArr = Array.from(containerTextRef.current!.children);
      const childImgArr = Array.from(containerImgRef.current!.children);

      // childTextArr.forEach((child, index) => {
      //   tl.fromTo(
      //     child,
      //     { opacity: index === 0 ? 1 : 0.4, y: index === 0 ? 200 : 300 },
      //     {
      //       opacity: 1,
      //       y: 0,
      //     },
      //   );
      // });

      // childImgArr.forEach((img, i) => {
      //   if (i === 0) return;

      //   tl.from(img, {
      //     yPercent: 100,
      //     duration: 1,
      //     ease: "none",
      //   });
      // });

      childTextArr.forEach((child, index) => {
        if (index === 0) return;

        const img = childImgArr[index];

        tl.fromTo(
          child,
          {
            opacity: 0.4,
            y: 300,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
          },
          index,
        );

        tl.fromTo(
          img,
          {
            yPercent: 100,
          },
          {
            yPercent: 0,
            duration: 1,
            ease: "none",
          },
          index,
        );
      });
    },
    { scope: wrapperRef },
  );

  return (
    <section
      ref={wrapperRef}
      className="min-h-screen  py-4 bg-green-500  flex flex-col  gap-4 "
    >
      <h1 className=" w-full">HOW IT WORKS</h1>

      <div className="grid  grid-cols-[0.75fr_1.25fr] h-screen px-8">
        <div ref={containerTextRef} className="  flex flex-col gap-8 ">
          {workingStepsData.map((e: workingStepsDataType, index: number) => (
            <div key={index} className="  flex justify-center  gap-2 flex-col ">
              <div className="text-5xl font-bold text-gray-100/60">{`0${index + 1}`}</div>
              <div className="text-3xl font-semibold text-gray-200">
                {e.title}
              </div>
              <div className="text-xl text-mist-700">{e.subTitle}</div>
            </div>
          ))}
        </div>

        {/* <div
          ref={containerImgRef}
          className="  relative  grid place-items-center border overflow-hidden  "
        >
          {workingStepsData.map((e, index) => (
      
            <Image
              key={index}
              src={e.imgSrc}
              alt="workingSteps"
              fill
              className="object-cover rounded-md "
            />
          ))}
        </div> */}

        <div className="grid ">
          <div
            ref={containerImgRef}
            className="relative aspect-video w-full  overflow-hidden rounded-md"
          >
            {workingStepsData.map((e, index) => (
              <Image
                key={index}
                src={e.imgSrc}
                alt="workingSteps"
                fill
                className="object-cover rounded-md"
              />
            ))}
          </div>
        </div>

        {/* <div ref={containerImgRef} className=" border">
          {workingStepsData.map((e: workingStepsDataType, index: number) => (
            <div key={index} className="  border relative aspect-video ">
              <Image
                src={e.imgSrc}
                alt="worlingSteps"
                fill
                className="object-cover rounded-md"
              />
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default HowItWorks;
