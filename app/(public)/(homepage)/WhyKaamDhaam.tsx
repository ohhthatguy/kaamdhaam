"use client";

import Image from "next/image";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const WhyKaamDhaam = () => {
  const mainContainerRef = useRef(null);

  useEffect(() => {
    gsap.to(mainContainerRef.current, {
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: mainContainerRef.current,
        start: "top 20%",
        end: "center 20%",
        pin: true,
        markers: true,
        scrub: true, // 🔥 key for parallax feel
      },
    });
  }, []);

  return (
    <section
      ref={mainContainerRef}
      className="min-h-screen grid border bg-green-500 lg:grid-rows-[150px_400px_400px_400px_150px] lg:grid-cols-[1fr_2fr_1fr] "
    >
      <div className="border">1</div>
      <div className="border">2</div>
      <div className="border">3</div>
      <div className="border relative bg-fixed">
        <Image
          src="/hero/kaamdhaam_hero.jpeg"
          alt="Local Marketplace Background"
          fill
          priority
          className="object-cover object-center bg-fixed"
        />
      </div>
      <div className="border">5</div>
      <div className="border">6</div>
      <div className="border">7</div>
      <div className="border">8</div>
      <div className="border">9</div>
      <div className="border">10</div>
      <div className="border">11</div>
      <div className="border">12</div>
      <div className="border">12</div>
      <div className="border">14</div>
      <div className="border">15</div>
    </section>
  );
};

export default WhyKaamDhaam;
