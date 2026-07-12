"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export const MultipleStackingAnimationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const mainContainerRef = useRef<HTMLDivElement | null>(null);
  useGSAP(
    () => {
      const childSectionArr = Array.from(mainContainerRef.current!.children);

      childSectionArr.forEach((e, indx) => {
        const isLast = indx === childSectionArr.length - 1;

        ScrollTrigger.create({
          trigger: e,
          start: "top top",
          end: "bottom 30%",
          pin: true,
          pinSpacing: isLast,
          scrub: true,
          // markers: true,
        });
      });
    },
    { scope: mainContainerRef },
  );

  return (
    <section ref={mainContainerRef} className="z-0">
      {children}
    </section>
  );
};
