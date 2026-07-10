"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

const StackingAnimationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      ScrollSmoother.create({
        content: containerRef.current,
        smooth: 2,
        smoothTouch: 1,
        effects: true,
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="">
      {children}
    </div>
  );
};

export default StackingAnimationProvider;
