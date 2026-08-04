import { getCurrentUserData } from "@/lib/hooks/getCurrentUserData";
import ConsumerHeader from "../(consumer)/consumer/homepage/ConsumerHeader";
import Header from "../(producer)/producer/dashboard/Header";
import Detail from "./Detail";
import Intro from "./Intro";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ workerId: string }>;
}) => {
  const { workerId } = await searchParams;
  const user = await getCurrentUserData();
  console.log("WORKERID: ", workerId);
  return (
    <>
      {user?.role === "PRODUCER" ? (
        <Header />
      ) : user?.role === "CONSUMER" ? (
        <ConsumerHeader />
      ) : (
        ""
      )}
      <section className="mx-32 relative overflow-hidden mt-8 flex flex-col gap-12">
        <div className="bg-gray-300 w-32 h-32 rounded-full absolute translate-x-12 -translate-y-9 right-0 "></div>

        <Intro workerId={workerId} />
        <Detail workerId={workerId} />
      </section>
    </>
  );
};

export default page;
