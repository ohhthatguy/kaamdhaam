"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const ParallaxImageAnimation = ({ imgSrc }: { imgSrc: string }) => {
  const mainContainer2Ref = useRef<HTMLDivElement | null>(null);
  const contentContainerRef = useRef<HTMLImageElement | null>(null);

  console.log("image link: ", imgSrc);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainContainer2Ref.current,
        scrub: 1,
        start: "top 80%",
        end: "bottom 50%",

        invalidateOnRefresh: true,
      },
    });

    tl.fromTo(
      contentContainerRef.current,
      {
        y: -80,
      },
      {
        y: 80,
      },
    );
  });

  return (
    <div
      ref={mainContainer2Ref}
      className=" overflow-hidden border relative p-2 h-[400px]"
    >
      <div ref={contentContainerRef} className="absolute inset-0 scale-125">
        <Image
          src="/hero/kaamdhaam_hero.jpeg"
          alt="Local Marketplace Background"
          fill
          priority
          className="object-cover scale-110 "
        />
      </div>
    </div>
  );
};
