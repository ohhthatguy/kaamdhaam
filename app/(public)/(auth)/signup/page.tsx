import SignupForm from "./SignupForm";

const page = () => {
  return (
    <main className="grid md:grid-cols-[1fr_1.25fr] h-screen">
      {/* my-16  mx-14 md:m-14  */}
      <section className=" mx-14 my-8 flex flex-col  items-center md:items-start">
        <h3>
          KAAMDHAAAM <span className="text-2xl">signup</span>
        </h3>

        <div className="mt-8 w-full ">
          <SignupForm />
        </div>
      </section>

      <section className=" hidden md:flex bg-tertiary  justify-center items-center">
        image
      </section>
    </main>
  );
};

export default page;
