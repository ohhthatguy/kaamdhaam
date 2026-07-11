import { ParallaxImageAnimation } from "@/lib/component/ParallaxImageAnimation";

const JoinCommunity = () => {
  return (
    <section className="min-h-screen bg-gray-200 flex flex-col gap-4 justify-center items-center px-4">
      <div className="text-5xl">JOIN THE MOVEMENT</div>

      <div className="group grid grid-cols-[1fr_1fr] has-[div:first-child:hover]:grid-cols-[1.5fr_0.5fr] has-[div:last-child:hover]:grid-cols-[0.5fr_1.5fr] border  w-full gap-4 transition-all duration-500 ease-in-out">
        <div className="relative h-[70vh] transition-all duration-500 ease-in-out ">
          <ParallaxImageAnimation imgSrc="/hero/kaamdhaam_hero.jpeg" />
        </div>
        <div className="relative h-[70vh] transition-all duration-500 ease-in-out ">
          <ParallaxImageAnimation imgSrc="/hero/kaamdhaam_hero.jpeg" />
        </div>
      </div>
    </section>
  );
};

export default JoinCommunity;
