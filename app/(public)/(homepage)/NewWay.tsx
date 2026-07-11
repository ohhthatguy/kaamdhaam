import Image from "next/image";
import Link from "next/link";

const NewWay = () => {
  return (
    <section className="min-h-screen relative ">
      <Image
        src="/hero/kaamdhaam_hero.jpeg"
        alt="Local Marketplace Background"
        fill
        priority
        className="object-cover "
      />

      <div className="relative z-20 grid place-items-center h-screen text-white ">
        <div className="flex gap-8 justify-center items-center  flex-col w-2/3 h-full ">
          <div>What is Kaamdhaam</div>

          <div className=" text-center text-6xl leading-16 tracking-tight ">
            A new way to serve your local area and earn money.
          </div>

          <div className="text-xl  text-center">
            With kaamdhaaam, your skills are used in your own locallity where
            people with your needs will comeforward for the help that you will
            provide and earn money. Or you could also ask for the help from the
            community.
          </div>

          <Link
            href={"/login"}
            className="bg-surface text-black py-2 px-4  rounded-md"
          >
            Proceed the way
          </Link>
        </div>
      </div>

      <div className="absolute inset-0 bg-green-700/60 " />
      {/* <div className="absolute h-90 w-90 top-1/5 rounded-full left-4/12 bg-gray-400 blur-3xl " /> */}
    </section>
  );
};

export default NewWay;
