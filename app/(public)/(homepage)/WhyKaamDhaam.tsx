import { ParallaxImageAnimation } from "@/lib/component/ParallaxImageAnimation";
import WhyKaamDhaamTextAnimationProvider from "./(animationProvider)/WhyKaamDhaamTextAnimationProvider";
import { whyKaamDhaamAnimData } from "./data";

const WhyKaamDhaam = () => {
  return (
    <section className="min-h-screen grid  overflow-hidden bg-dark grid-rows-3 lg:grid-rows-[150px_400px_400px_400px_150px] lg:grid-cols-[1fr_2fr_1fr] ">
      <div className="lg:block hidden"></div>
      <div className="lg:block hidden"></div>
      <div className=" lg:block hidden"></div>

      <div className="lg:block hidden"></div>
      <WhyKaamDhaamTextAnimationProvider
        title={whyKaamDhaamAnimData[0].title}
        content={whyKaamDhaamAnimData[0].content}
      />
      <ParallaxImageAnimation imgSrc="/hero/kaamdhaam_hero.jpeg" />

      <ParallaxImageAnimation imgSrc="/hero/kaamdhaam_hero.jpeg" />
      <WhyKaamDhaamTextAnimationProvider
        title={whyKaamDhaamAnimData[1].title}
        content={whyKaamDhaamAnimData[1].content}
      />
      <div className=" lg:block hidden"></div>

      <div className=" lg:block hidden"></div>
      <WhyKaamDhaamTextAnimationProvider
        title={whyKaamDhaamAnimData[2].title}
        content={whyKaamDhaamAnimData[2].content}
      />
      <ParallaxImageAnimation imgSrc="/hero/kaamdhaam_hero.jpeg" />

      <div className=" lg:block hidden"></div>
      <div className=" lg:block hidden"></div>
      <div className=" lg:block hidden"></div>
    </section>
  );
};

export default WhyKaamDhaam;
