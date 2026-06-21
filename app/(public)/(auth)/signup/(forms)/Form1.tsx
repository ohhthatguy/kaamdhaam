"use client";

import ProfileImageInput from "@/lib/component/ProfileImageInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { Form1DataType } from "../../../../../lib/zod-schema/signup-schema/Form1-schema";
import { Form1Schema } from "../../../../../lib/zod-schema/signup-schema/Form1-schema";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux-hooks";
import { updateIntroForm } from "@/lib/slice/signupForm/signupFormSlice";

const Form1 = ({
  setActiveStep,
}: {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const dispatch = useAppDispatch();
  const { skill, password, ...restOfFormData } = useAppSelector(
    (state) => state.signUpForm,
  );

  const {
    register,
    handleSubmit,

    setValue,
    formState: { errors, isValid },
  } = useForm<Form1DataType>({
    resolver: zodResolver(Form1Schema),
    mode: "onChange",
    defaultValues: restOfFormData,
  });

  const onSubmit = (data: Form1DataType) => {
    console.log("Form Data:", data);
    dispatch(updateIntroForm(data));
    setActiveStep(2);
  };

  const UrlFromProfileImgInputComp = (urlString: string) => {
    setValue("profileImg", urlString, { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <fieldset className="grid gap-2">
        <label htmlFor="profileImg">Profile</label>

        <ProfileImageInput
          UrlFromProfileImgInputComp={UrlFromProfileImgInputComp}
        />
      </fieldset>

      <fieldset className="grid gap-2">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          {...register("name")}
          className="border rounded-md p-2 text-md"
          placeholder="Enter Name Here"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </fieldset>

      <div className="flex justify-between">
        <fieldset className="grid gap-2   ">
          <label htmlFor="age">Age</label>
          <input
            type="text"
            {...register("age")}
            className="border rounded-md p-2 text-md w-3/5"
            placeholder="18+"
          />

          {errors.age && <p className="text-red-500">{errors.age.message}</p>}
        </fieldset>

        <fieldset className="grid gap-2 w-4/5">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email")}
            className="border rounded-md p-2 text-md "
            placeholder="Enter Email Here"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </fieldset>
      </div>

      <fieldset className="grid gap-2">
        <label htmlFor="phone">Phone</label>
        <input
          type="number"
          {...register("phone")}
          className="border rounded-md p-2 text-md"
          placeholder="98XXXXXXXX"
        />
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
      </fieldset>

      <fieldset className="grid gap-2">
        <label htmlFor="bio">Bio</label>
        <textarea
          rows={7}
          {...register("bio")}
          className="border rounded-md p-2 text-md"
          placeholder="Tell us about yourself"
        />
        {errors.bio && <p className="text-red-500">{errors.bio.message}</p>}
      </fieldset>

      <div>
        <button
          type="submit"
          // onClick={() => setActiveStep(2)}
          disabled={!isValid}
          className="border w-fit px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed enabled:cursor-pointer transition-colors"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default Form1;
