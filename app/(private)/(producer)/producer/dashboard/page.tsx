import History from "./History";
import Intro from "./Intro";
import MyWorks from "./MyWorks";

const Page = async () => {
  return (
    <div className="mx-32 py-8 flex flex-col gap-12">
      <Intro />
      <MyWorks />
      <History />
    </div>
  );
};

export default Page;
