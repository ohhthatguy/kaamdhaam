import Rendertable from "../homepage/Table/Rendertable";
import Intro from "./Intro";

const page = () => {
  return (
    <section className="mx-32   flex flex-col gap-12">
      <Intro />
      <Rendertable />
    </section>
  );
};

export default page;
