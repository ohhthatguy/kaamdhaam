"use client";

import { skillOption } from "@/app/(public)/(auth)/signup/(forms)/data";
import type { skillOptionDataType } from "@/app/(public)/(auth)/signup/(forms)/type";
import { CloudinaryImgUploader } from "@/lib/component/CloudinaryImgUploader";
import { MdAttachMoney } from "react-icons/md";
import type { UploadedImageDataType } from "./type";

import type { workPostDataType } from "@/lib/zod-schema/workPost-schema/workPost-schema";
import { workPostSchema } from "@/lib/zod-schema/workPost-schema/workPost-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const Page = () => {
  const imgHandlerFuncInParent = (images: UploadedImageDataType[]) => {
    console.log("data in NEW imgS parent comp: ", images);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<workPostDataType>({
    resolver: zodResolver(workPostSchema),
    defaultValues: {
      title: "",
      subTitle: "",
      category: [],
      rate: "",
      rateType: "per Hour", // Must match the enum value exactly
      expectedTime: "within 1-3 hour", // Must match the enum value exactly
      finalDeliverable: "",
      status: "PENDING",
      workImg: [],
    },
  });

  //   const handleServiceCreation = (e) => {
  //     //any
  //   };

  return (
    <section className="mx-16 flex flex-col gap-16 py-8">
      <div>
        <p>Create new request</p>
        <h1>POST YOUR NEED !!</h1>
      </div>

      <div className=" flex flex-col gap-8">
        <div className="text-xl">Title</div>
        <input
          type="text"
          className="w-full  border-0 border-b border-gray-400 outline-none focus:ring-0 focus:border-gray-400 hover:border-gray-400 text-3xl"
          {...register("title")}
          placeholder="EG: HELP WITH MOVING FURNITURE "
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>

      <div className=" flex flex-col gap-8">
        <div className="text-xl">Select Category</div>

        <div className=" flex gap-4 flex-wrap  h-40 p-2  overflow-auto scrollbar-custom ">
          {skillOption.map((e: skillOptionDataType, index: number) => (
            <div
              key={index}
              className="border bg-blue-800/5 hover:bg-blue-400/35 p-2 rounded-md hover:cursor-pointer hover:scale-105 scale-100 transition-all duration-500 "
            >
              {e.label}
            </div>
          ))}
        </div>
        {errors.category && (
          <p className="text-red-500">{errors.category.message}</p>
        )}
      </div>

      <div className=" flex flex-col gap-8">
        <div className="text-xl">Reference Images</div>

        <div className="flex  ">
          <CloudinaryImgUploader
            imgHandlerFuncInParent={imgHandlerFuncInParent}
          />
        </div>
        {errors.workImg && (
          <p className="text-red-500">{errors.workImg.message}</p>
        )}
      </div>

      <div className="flex justify-center items-center gap-8 ">
        <div className="flex flex-col gap-2">
          <div className="text-xl">Rate</div>
          <div className="relative">
            <input
              type="number"
              {...register("rate")}
              required
              max={999}
              className="w-full  text-xl border py-3 pl-8 bg-blue-800/5"
              name="rate"
              placeholder="15"
            />
            <MdAttachMoney className="absolute  top-1/3 left-1/8 " size={18} />
          </div>
          {errors.rate && <p className="text-red-500">{errors.rate.message}</p>}
        </div>
        <div className=" w-full flex flex-col gap-2">
          <div className="text-xl">Metrics</div>
          <div>
            <select className="w-full  border py-4 px-2 text-center bg-blue-800/5">
              <option value="per Hour">per hour</option>
              <option value="per Day">per day</option>
              <option value="per Task">per task</option>
            </select>
          </div>
          {errors.rateType && (
            <p className="text-red-500">{errors.rateType.message}</p>
          )}
        </div>
        <div className=" w-full flex flex-col gap-2">
          <div className="text-xl ">How long do you want it to be ?</div>
          <div>
            <select className="w-full  border py-4 px-2 text-center bg-blue-800/5">
              <option value="within 1-3 hour">within 1-3 hour</option>
              <option value="within half a day">within half a day</option>
              <option value="about a day">about a day</option>
              <option value="within 1-3 days">within 1-3 days</option>
              <option value="within a week">within a week</option>
            </select>
          </div>
          {errors.expectedTime && (
            <p className="text-red-500">{errors.expectedTime.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="text-xl">Final deliverables (Expected outcomes) </div>
        <textarea
          rows={12}
          {...register("finalDeliverable")}
          className="border text-xl rounded-md p-4 w-full bg-blue-800/5"
          placeholder="Explain exactly what you want to be the final result"
        />
      </div>
      {errors.finalDeliverable && (
        <p className="text-red-500">{errors.finalDeliverable.message}</p>
      )}

      <div>
        <button className="border bg-red-600 px-4 py-2 rounded-md hover:cursor-pointer ">
          Create
        </button>
      </div>
    </section>
  );
};

export default Page;
