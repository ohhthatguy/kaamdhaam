import { headers } from "next/headers";

const Intro = async () => {
  const headerList = await headers();

  const name = headerList.get("x-user-name")!;

  return (
    <section className="  h-[70vh] gap-8 flex flex-col justify-center  items-center">
      <div className="grid grid-cols-[0.75fr] gap-8 w-full ">
        <div className="leading-tight tracking-tight ">
          <h1>WELCOME BACK, {name.split(" ")[0]}</h1>
          <h1>Ready be lend a hand to your community ?</h1>
        </div>
        <p className="">
          Manage Your Activity Post, browse local talent or launch a new
          Initiative. The community is ready to build with you.
        </p>
      </div>
    </section>
  );
};

export default Intro;
