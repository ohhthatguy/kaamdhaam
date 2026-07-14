"use client";
import { useState } from "react";
import { CiMoneyBill } from "react-icons/ci";
import { MdAttachMoney } from "react-icons/md";
import Select, { MultiValue } from "react-select";
import makeAnimated from "react-select/animated";
import { toast } from "react-toastify";
import { skillOption } from "./data";
import type { skillOptionDataType } from "./type";
const animatedComponents = makeAnimated();

import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux-hooks";
import { updateSkillRateForm } from "@/lib/slice/signupForm/signupFormSlice";

const Form2 = ({
  setActiveStep,
}: {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const dispatch = useAppDispatch();
  const { skills, role, ...restOfData } = useAppSelector(
    (state) => state.signUpForm,
  );
  console.log(restOfData);
  const [selectedOption, setSelectedOption] =
    useState<MultiValue<skillOptionDataType>>(skills);

  const updateForm = () => {
    console.log(skills);
    console.log(selectedOption);

    const newSelectedOption = selectedOption.map((e: skillOptionDataType) => ({
      ...e,
      rate: e.rate === "" ? undefined : e.rate,
    }));

    dispatch(updateSkillRateForm([...newSelectedOption]));

    setActiveStep(3);
  };

  const checkDisableBtn = () => {
    const k = selectedOption.every((e) => e.rate !== "");
    if (k) {
      updateForm();
    } else {
      console.log(selectedOption);

      toast.error("Please Enter All Field");
    }
  };

  return (
    <div className="flex flex-col gap-4     ">
      <fieldset className="grid  gap-2">
        <label htmlFor="name">Skills</label>
        <Select
          instanceId="kaamdhaam-skill-select"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e)}
          options={skillOption}
          isMulti
          closeMenuOnSelect={false}
          components={animatedComponents}
        />
      </fieldset>

      <fieldset className="grid  gap-2">
        {selectedOption.length > 0 ? (
          <div className="max-h-60 py-4  flex flex-col gap-4">
            {selectedOption.map((e: skillOptionDataType, index: number) => (
              <div
                key={index}
                className=" bg-light rounded-md flex justify-between items-center  p-4"
              >
                <div className="text-sm  w-1/5 xs:w-2/5">{e.label}</div>

                <div
                  className={` ${role === "CONSUMER" ? "hidden" : "block"} w-3/5 xs:w-2/5 relative   flex justify-between gap-2`}
                >
                  <input
                    type="number"
                    required
                    className="border rounded-md w-2/5 p-2 pl-4 text-xs  "
                    placeholder="10"
                    value={selectedOption[index].rate}
                    max={999}
                    onChange={(ele) =>
                      setSelectedOption((prev) =>
                        prev.map((item, idx) =>
                          idx === index
                            ? {
                                ...item,
                                rate: ele.target.value,
                              }
                            : item,
                        ),
                      )
                    }
                  />
                  <MdAttachMoney className="absolute  top-2/8 " size={18} />

                  <select
                    className="border rounded-md p-2 text-xs w-3/5"
                    value={selectedOption[index].rateType}
                    onChange={(ele) =>
                      setSelectedOption((prev) =>
                        prev.map((item, idx) =>
                          idx === index
                            ? {
                                ...item,
                                rateType: ele.target.value as
                                  | "per Hour"
                                  | "per Task"
                                  | "per Day",
                              }
                            : item,
                        ),
                      )
                    }
                  >
                    <option>per Hour</option>
                    <option>per Task</option>
                    <option defaultValue={"per Day"}>per Day</option>
                  </select>
                </div>
              </div>
            ))}

            <div>
              <button
                className="border w-fit px-4 py-2 rounded-md cursor-pointer"
                onClick={() =>
                  role === "CONSUMER" ? updateForm() : checkDisableBtn()
                }
                // disabled={selectedOption.length !== 0}
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <div className="h-60 border rounded-md  flex flex-col gap-2 justify-center items-center">
            <CiMoneyBill size={68} />
            <div className="grid gap-2">
              <div className="font-bold text-xs text-center">
                No Skills Selected Yet!
              </div>
              <div className="text-center text-xs">
                use the search bar above to select a particular skill. Once
                Selected, you can provide rate to it!
              </div>
            </div>
          </div>
        )}
      </fieldset>
    </div>
  );
};

export default Form2;
