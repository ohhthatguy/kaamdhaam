import Intro from "./Intro";
import RequestDetail from "./RequestDetail";
const page = () => {
  return (
    <section className="mx-32   flex flex-col gap-12">
      <Intro />
      <RequestDetail />
    </section>
  );
};

export default page;
