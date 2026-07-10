import Image from "next/image";
import Link from "next/link";
import Header from "./Header";

const Hero = () => {
  return (
    <main className="relative h-screen w-full overflow-hidden ">
      <Header />

      <Image
        src="/hero/kaamdhaam_hero.jpeg"
        alt="Local Marketplace Background"
        fill
        priority
        className="object-cover object-center -z-10"
      />

      {/* <div className="inset-0 absolute bg-green-900/30"></div> */}
      <div className="absolute inset-0 bg-linear-to-r from-green-900/60 via-green-800/70 via-20% to-transparent"></div>

      <div className="relative z-10  w-1/2  text-white h-full grid px-16 grid-rows-[1fr_1fr_1fr] ">
        <div className=" leading-tight  flex items-end">
          Sabai lae khojeko kaamdhaaam.
        </div>

        <div className=" text-5xl leading-tight font-bold">
          TRADE LOCALLY.
          <br /> TRUST DEEPLY.
        </div>

        <div className="flex   items-start flex-col gap-4">
          <h5 className=" text-2xl leading-tight  ">
            Service and products from the community to the community.
          </h5>

          <Link
            href="/"
            className=" p-2 rounded-md bg-tertiary/85 text-white hover:cursor-pointer hover:bg-tertiary scale-100 hover:scale-105 transition-all duration-500"
          >
            Get Started
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Hero;
