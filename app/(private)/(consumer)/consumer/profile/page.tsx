import Detail from "./Detail";
import Intro from "./Intro";
const page = () => {
  return (
    <section className="mx-32 relative overflow-hidden mt-8 flex flex-col gap-12">
      <div className="bg-gray-300 w-32 h-32 rounded-full absolute translate-x-12 -translate-y-9 right-0 "></div>

      <Intro />
      <Detail />
    </section>
  );
};

export default page;
