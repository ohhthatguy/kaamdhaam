import { getCurrentUserData } from "@/lib/hooks/getCurrentUserData";

const Intro = async () => {
  const user = await getCurrentUserData();

  return (
    <section className="flex flex-col gap-8">
      <section className="  h-[20vh] flex items-end  ">
        <div className=" text-4xl capitalize font-semibold text-gray-800">
          {user?.name} Applications{" "}
        </div>
        <div className=" bg-gray-300/20 flex-1 border-b-4 border-border"></div>
      </section>

      <section className="   flex justify-around ">
        <div className="rounded-md bg-surface border border-border  p-8">
          <div>Total Application Sent: </div>
          <h4 className="text-right">12</h4>
        </div>

        <div className="rounded-md bg-surface border border-border  p-8">
          <div>Total PENDING: </div>
          <h4 className="text-right">7</h4>
        </div>

        <div className="rounded-md bg-surface border border-border  p-8">
          <div>Total ACTIVE </div>
          <h4 className="text-right">4</h4>
        </div>

        <div className="rounded-md bg-surface border border-border  p-8">
          <div>Total ENDED: </div>
          <h4 className="text-right">1</h4>
        </div>
      </section>

      <section className="   flex justify-around "></section>
    </section>
  );
};

export default Intro;
