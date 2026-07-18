"use client";
import {
  loginSchema,
  loginSchemaDataType,
} from "@/lib/zod-schema/login-schema/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux-hooks";
import { saveLoginDataFromDb } from "@/lib/slice/afterLoginSlice/afterLoginSlice";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const dataFromRedux = useAppSelector((state) => state.afterLoginSlice);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isLoading, errors },
  } = useForm<loginSchemaDataType>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: loginSchemaDataType) => {
    console.log("handle login", data);
    const queryParams = new URLSearchParams({
      email: data.email,
      password: data.password,
    }).toString();
    try {
      const res = await fetch(`/api/auth/login?${queryParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Something went wrong during login");
      }

      console.log("LOGIN SUCCESSFUL", data.data);

      dispatch(saveLoginDataFromDb(data.data));

      console.log(dataFromRedux);

      if (data.data.role === "PRODUCER") {
        router.replace("/producer/create");
      } else if (data.data.role === "CONSUMER") {
        router.replace("/home");
      }

      //save this data in redux and redirect in homepage
    } catch (err) {
      console.log("ERR: ", err);
    }
  };

  return (
    <section className="grid gap-8">
      <div className="grid gap-4 ">
        <input
          type="email"
          {...register("email")}
          className="border text-md p-2 rounded-md border-border"
          placeholder="Email"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input
          type="password"
          {...register("password")}
          className="border text-md p-2 rounded-md border-border"
          placeholder="Password"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="grid gap-8">
        <button
          onClick={handleSubmit(handleLogin)}
          // className="border w-28 px-4 py-2 rounded-md"
          className={`border w-28 p-2 rounded-md hover:cursor-pointer hover:scale-105 scale-100 transition-all duration-500 shadow-2xl bg-tertiary/5 hover:bg-tertiary/85 hover:border-border hover:text-white ${isLoading && `flex justify-center items-center bg-tertiary`}`}
        >
          {isLoading ? (
            <div className="flex justify-center items-center">
              <svg
                className="w-5 h-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="green"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
          ) : (
            "LOGIN"
          )}
        </button>
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
