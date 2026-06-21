"use client";

import { useAppSelector } from "@/lib/hooks/redux-hooks";
import type { form3SchemaDataType } from "@/lib/zod-schema/signup-schema/Form3-schema";
import { form3Schema } from "@/lib/zod-schema/signup-schema/Form3-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const Form3 = ({
  setActiveStep,
}: {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const signUpData = useAppSelector((state) => state.signUpForm);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<form3SchemaDataType>({
    resolver: zodResolver(form3Schema),
    mode: "onChange",
    defaultValues: { password: "", confirm_password: "" },
  });

  const onSubmit = async (data: form3SchemaDataType) => {
    console.log(data);
    const finalData = { ...signUpData, password: data.password };
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(finalData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.message || "Something went wrong during signup",
        );
      }

      // 6. Parse the successful response (e.g., success message)
      const result = await res.json();
      console.log(
        "Signup initiated successfully! Verification email sent.",
        result,
      );
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <fieldset className="grid gap-2">
        <label htmlFor="name">Password</label>
        <input
          type="password"
          {...register("password")}
          className="border rounded-md p-2 text-md"
          placeholder="Enter password Here"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </fieldset>

      <fieldset className="grid gap-2">
        <label htmlFor="name">Confirm Password</label>
        <input
          type="password"
          {...register("confirm_password")}
          className="border rounded-md p-2 text-md"
          placeholder="Confirm password Here"
        />
        {errors.confirm_password && (
          <p className="text-red-500">{errors.confirm_password.message}</p>
        )}
      </fieldset>

      <div>
        <button
          className="border w-fit px-4 py-2 rounded-md cursor-pointer"
          type="submit"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default Form3;
