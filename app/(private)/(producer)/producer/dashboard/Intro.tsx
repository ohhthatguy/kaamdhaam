import Link from "next/link";

const Intro = ({ name, _id }: { name: string; _id: string }) => {
  return (
    <section className="  h-[70vh] gap-8 flex flex-col justify-center  items-center">
      <div className="grid grid-cols-[0.75fr] gap-8 w-full ">
        <div className="leading-tight tracking-tight ">
          <h1>WELCOME BACK, {name.split(" ")[0]}</h1>
          <h1>WHAT ARE YOU LOOKING FOR HELP WITH TODAY ?</h1>
        </div>
        <p className="">
          Manage Your Activity Post, browse local talent or launch a new
          Initiative. The community is ready to build with you.
        </p>
      </div>

      <div className=" w-full text-right py-4 px-2">
        <Link
          href={`/producer/create?_id=${_id}&name=${name}`}
          className="border bg-green-900 text-white rounded-md py-4 px-2"
        >
          CREATE NEW POST +{" "}
        </Link>
      </div>
    </section>
  );
};

export default Intro;
