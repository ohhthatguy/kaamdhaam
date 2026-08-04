// import { getCurrentUserData } from "@/lib/hooks/getCurrentUserData";

const Intro = async () => {
  // const user = await getCurrentUserData();

  return (
    <section className="flex flex-col gap-8">
      <section className="  h-[30vh] flex flex-col   ">
        <div className=" text-4xl capitalize font-semibold text-gray-800">
          JOB MANAGEMENT
        </div>
        <p>Track Your service request and manage request efficiently</p>
      </section>
    </section>
  );
};

export default Intro;
