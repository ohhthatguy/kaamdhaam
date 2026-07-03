import SignupForm from "./SignupForm";
const page = () => {
  return (
    <main className="grid md:grid-cols-[1fr_1.25fr] h-screen ">
      {/* my-16  mx-14 md:m-14  */}
      <div className=" px-4 py-4 xs:px-14  xs:py-8  overflow-auto scrollbar-custom">
        <section className="  flex flex-col  items-center md:items-start">
          <h3>
            KAAMDHAAAM <span className="text-2xl">signup</span>
          </h3>

          <div className="mt-8 w-full ">
            <SignupForm />
          </div>
        </section>
      </div>

      <section className=" hidden md:flex bg-tertiary  justify-center items-center">
        image
      </section>
    </main>
  );
};

export default page;
