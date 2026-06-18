import LoginForm from "./LoginForm";

const page = () => {
  return (
    <main className="grid md:grid-cols-[1.25fr_1fr] h-screen">
      <section className=" hidden md:flex bg-tertiary  justify-center items-center">
        image
      </section>
      <section className=" my-16  mx-14 md:m-14  flex flex-col justify-center items-center md:items-start">
        <h3>
          KAAMDHAAAM <span className="text-2xl">login</span>
        </h3>

        <h2 className="mt-10">
          Keep it local, <br />
          Keep it simple
        </h2>

        <div className="mt-8 w-full ">
          <LoginForm />
        </div>
      </section>

      {/* <section className=" my-16 mx-4 sm:m-16   ">
        <h3>
          KAAMDHAAAM <span className="text-2xl">login</span>
        </h3>

        <h2 className="mt-8">
          Keep it local, <br />
          Keep it simple
        </h2>

        <div className="mt-8">
          <LoginForm />
        </div>
      </section> */}
    </main>
  );
};

export default page;
