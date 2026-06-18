"use client";
import Link from "next/link";

const LoginForm = () => {
  return (
    <section className="grid gap-8">
      <div className="grid gap-4 ">
        <input
          type="email"
          name="email"
          className="border text-md p-2 rounded-md border-border"
          placeholder="Email"
        />
        <input
          type="password"
          name="pswd"
          className="border text-md p-2 rounded-md border-border"
          placeholder="Password"
        />
      </div>

      <div className="grid gap-8">
        <Link href={"/"} className="border w-fit px-4 py-2 rounded-md">
          LOGIN
        </Link>
        {/* signup by ggogle */}
      </div>

      <div className="">
        First time here ?{" "}
        <Link className="underline text-blue-700" href={"/signup"}>
          Sign In
        </Link>
      </div>
    </section>
  );
};

export default LoginForm;
