"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const WhyKaamDhaamTextAnimationProvider = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  const mainContainer2Ref = useRef<HTMLDivElement | null>(null);
  const contentContainerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contentContainerRef.current,
        scrub: 1,
        start: "top 80%",
        end: "end 90%",

        invalidateOnRefresh: true,
      },
    });

    tl.to(contentContainerRef.current, {
      opacity: 1,
    });

    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: contentContainerRef.current,
        scrub: 1,
        start: "center 60%",
        end: "center",

        invalidateOnRefresh: true,
      },
    });

    tl2.to(contentContainerRef.current, {
      y: mainContainer2Ref.current?.offsetHeight,
    });
  });

  return (
    <div ref={mainContainer2Ref} className=" overflow-hidden ">
      <div
        ref={contentContainerRef}
        className="flex justify-center opacity-0  items-center flex-col p-8 gap-4"
      >
        <h3>{title}</h3>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default WhyKaamDhaamTextAnimationProvider;
