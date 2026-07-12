"use client";
import { ParallaxImageAnimation } from "@/lib/component/ParallaxImageAnimation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const JoinCommunity = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        containerRef.current,
        {
          gridTemplateColumns: "1fr 1fr",
        },
        {
          gridTemplateColumns: "0.5fr 1.5fr",
          duration: 1,
          ease: "none",
        },
      )
        .to(containerRef.current, {
          gridTemplateColumns: "1.5fr 0.5fr",

          ease: "none",
        })
        .to(containerRef.current, {
          gridTemplateColumns: "1fr 1fr",

          ease: "none",
        });
    },
    { scope: containerRef },
  );

  return (
    <div>
      <section
        ref={wrapperRef}
        className="h-screen hhh bg-gray-200 flex flex-col py-22 gap-8 justify-center items-center px-4"
      >
        <div className="text-5xl  w-full">JOIN THE MOVEMENT</div>

        <div ref={containerRef} className="grid  grid-cols-2 w-full gap-4">
          <section className="relative transition-all duration-500 ease-in-out ">
            <ParallaxImageAnimation imgSrc="/hero/kaamdhaam_hero.jpeg" />

            <div className="absolute top-1/2 bg-orange-400/70 inset-0 ">
              <div className="text-5xl">Consumer</div>
              <div className="text-2xl">Directly from your community</div>
            </div>
          </section>
          <div className="relative  transition-all duration-500 ease-in-out ">
            <ParallaxImageAnimation imgSrc="/hero/kaamdhaam_hero.jpeg" />
            <div className="absolute top-1/2 bg-orange-400/70 inset-0 ">
              <div className="text-5xl">Consumer</div>
              <div className="text-2xl">Directly from your community</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JoinCommunity;
