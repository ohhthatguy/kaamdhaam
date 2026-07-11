"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export const JoinCommunityAnimationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const mainContainerRef = useRef<HTMLDivElement | null>(null);
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainContainerRef.current,
        start: "top top",
        end: "center center",
        invalidateOnRefresh: true,
        markers: true,
      },
    });
  });

  return <section ref={mainContainerRef}>{children}</section>;
};
