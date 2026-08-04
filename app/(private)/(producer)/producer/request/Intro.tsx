import { getCurrentUserData } from "@/lib/hooks/getCurrentUserData";

const Intro = async () => {
  const user = await getCurrentUserData();

  return (
    <section className="flex flex-col gap-8">
      <section className="  h-[20vh] flex items-end  ">
        <div className=" text-4xl capitalize font-semibold text-gray-800">
          {user?.name} Requests!
        </div>
        <div className=" bg-gray-300/20 flex-1 border-b-4 border-border"></div>
      </section>
    </section>
  );
};

export default Intro;
