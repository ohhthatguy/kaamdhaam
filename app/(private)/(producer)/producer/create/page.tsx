"use client";

import { useState } from "react";

import { skillOption } from "@/app/(public)/(auth)/signup/(forms)/data";
import type { skillOptionDataType } from "@/app/(public)/(auth)/signup/(forms)/type";
import { CloudinaryImgUploader } from "@/lib/component/CloudinaryImgUploader";
import { MdAttachMoney } from "react-icons/md";
import type { UploadedImageDataType } from "./type";

import type { workPostDataType } from "@/lib/zod-schema/workPost-schema/workPost-schema";
import { workPostSchema } from "@/lib/zod-schema/workPost-schema/workPost-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";

import { useAppSelector } from "@/lib/hooks/redux-hooks";

import RenderedMap from "@/lib/map/RenderedMap";

const Page = () => {
  const { _id } = useAppSelector((state) => state.afterLoginSlice);
  const [skills, setSkills] = useState<skillOptionDataType[]>(skillOption);

  const imgHandlerFuncInParent = (images: UploadedImageDataType[]) => {
    console.log("data in NEW imgS parent comp: ", images);
    setValue("workImg", images);
  };

  const mapCoOrdinateOnClick = (coordinate: { lng: number; lat: number }) => {
    console.log("clicked coordinate: ", coordinate);
    setValue("locationCord", {
      type: "Point",
      coordinates: [coordinate.lng, coordinate.lat],
    });
  };

  const {
    register,
    handleSubmit,
    setValue,
    getValues,

    formState: { errors, isLoading },
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
      locationCord: {
        type: "Point",
      },
    },
  });

  const onSubmit = async (e: workPostDataType) => {
    const finalData = { ...e, createdBy: _id };
    console.log(finalData);

    try {
      const res = await fetch("/api/producer/post-create", {
        method: "POST",
        body: JSON.stringify(finalData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.message || "Something went wrong during work-cpost-create",
        );
      }

      const result = await res.json();
      console.log("New work succesfully created", result);

      toast.success("New work succesfully created");
    } catch (err) {
      console.log("ERROR: ", err);
    }
  };

  const handleCategoryClick = (e: skillOptionDataType) => {
    console.log(e);

    const thisEleExist = getValues("category").some(
      (k) => k.label === e.label && k.value === e.value,
    );

    if (thisEleExist) {
      setValue(
        "category",
        getValues("category").filter(
          (t) => t.label !== e.label && t.value !== e.value,
        ),
      );
    } else {
      setValue("category", [
        ...getValues("category"),
        { value: e.value, label: e.label },
      ]);
    }

    setSkills((prev) =>
      prev.map((ele) =>
        ele.label === e.label && ele.value === ele.value
          ? { ...ele, isSelected: !ele.isSelected }
          : ele,
      ),
    );
  };

  console.log(errors);

  //   setValue("profileImg", urlString, { shouldValidate: true });

  return (
    <section className="mx-32 ">
      <div className="py-8">
        <p>Create new request</p>
        <h1>POST YOUR NEED !!</h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-16 py-8"
      >
        <div className=" flex flex-col gap-8">
          <div>
            <div className="text-xl">Reference Images (if any)</div>
            {errors.workImg && (
              <label className="text-red-500">{errors.workImg.message}</label>
            )}
          </div>

          <div className="flex  ">
            <CloudinaryImgUploader
              imgHandlerFuncInParent={imgHandlerFuncInParent}
            />
          </div>
        </div>
        <div className=" flex flex-col gap-8">
          <div>
            <div className="text-xl">Title</div>
            {errors.title && (
              <label className="text-red-500">{errors.title.message}</label>
            )}
          </div>
          <input
            type="text"
            className="w-full  border-0 border-b border-gray-400 outline-none focus:ring-0 focus:border-gray-400 hover:border-gray-400 text-3xl"
            {...register("title")}
            placeholder="EG: HELP WITH MOVING FURNITURE "
          />
        </div>

        <div className=" flex flex-col gap-8">
          <div>
            <div className="text-xl">Description</div>
            {errors.title && (
              <label className="text-red-500">{errors.title.message}</label>
            )}
          </div>
          <textarea
            rows={8}
            className="border text-xl rounded-md p-4 w-full bg-blue-800/5"
            {...register("subTitle")}
            placeholder="EG: I have a lot of furniture that I need some help with. "
          />
        </div>

        <div className=" flex flex-col gap-8">
          <div>
            <div className="text-xl">Select Category</div>
            {errors.category && (
              <label className="text-red-500">{errors.category.message}</label>
            )}
          </div>

          <div className=" flex gap-4 flex-wrap  h-40 p-2  overflow-auto scrollbar-custom ">
            {skills.map((e: skillOptionDataType, index: number) => (
              <div
                key={index}
                onClick={() => handleCategoryClick(e)}
                className={`border   p-2 rounded-md hover:cursor-pointer hover:scale-105 scale-100 transition-all duration-500 ${e.isSelected ? "bg-blue-400" : "bg-blue-800/5 hover:bg-blue-400/35"}`}
              >
                {e.label}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center items-center gap-8 ">
          <div className="flex flex-col gap-2">
            <div className="text-xl">Rate</div>

            <div className="relative">
              <input
                type="number"
                {...register("rate")}
                // required
                max={999}
                className="w-full  text-xl border py-3 pl-8 bg-blue-800/5"
                name="rate"
                placeholder="15"
              />
              <MdAttachMoney
                className="absolute  top-1/3 left-1/8 "
                size={18}
              />
            </div>
            {errors.rate && (
              <label className="text-red-500">{errors.rate.message}</label>
            )}
          </div>
          <div className=" w-full flex flex-col gap-2">
            <div className="text-xl">Metrics</div>
            <div>
              <select
                {...register("rateType")}
                className="w-full  border py-4 px-2 text-center bg-blue-800/5"
              >
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
              <select
                {...register("expectedTime")}
                className="w-full  border py-4 px-2 text-center bg-blue-800/5"
              >
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
          <div>
            <div className="text-xl">
              Final deliverables (Expected outcomes){" "}
            </div>
            {errors.finalDeliverable && (
              <label className="text-red-500">
                {errors.finalDeliverable.message}
              </label>
            )}
          </div>
          <textarea
            rows={12}
            {...register("finalDeliverable")}
            className="border text-xl rounded-md p-4 w-full bg-blue-800/5"
            placeholder="Explain exactly what you want to be the final result"
          />
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <div className="text-xl">
              Select Location where Service is needed
            </div>
            {errors.finalDeliverable && (
              <label className="text-red-500">
                {errors.locationCord &&
                  errors.locationCord.coordinates &&
                  errors.locationCord.coordinates.message}
              </label>
            )}
          </div>
          <RenderedMap
            position={[27.7172, 85.324]}
            zoom={13}
            mapCoOrdinateOnClick={mapCoOrdinateOnClick}
            coOrdinateAfterClick={getValues("locationCord")}
          />
        </div>

        <div>
          <button
            type="submit"
            className="border border-border bg-blue-600/35 px-4 py-2 rounded-md hover:cursor-pointer "
            disabled={isLoading}
          >
            Create
          </button>
        </div>
      </form>
    </section>
  );
};

export default Page;
