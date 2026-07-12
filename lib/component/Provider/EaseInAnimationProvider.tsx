"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export const EaseInAnimationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          scrub: true,
          start: "top 80%",
          end: "top top",
          invalidateOnRefresh: true,
          //   markers: true,
        },
      });

      tl.to(wrapperRef.current, { width: "100%" });
    },
    { scope: wrapperRef },
  );

  return (
    <section className="  flex justify-center items-center">
      <div ref={wrapperRef} className="w-8/12 ">
        {children}
      </div>
    </section>
  );
};
