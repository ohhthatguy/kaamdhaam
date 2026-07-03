"use client";
import { useState } from "react";
import Stepper from "./(forms)/Stepper";
import { consumerStepData, producerStepData } from "./(forms)/data";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux-hooks";

import { updateRole } from "@/lib/slice/signupForm/signupFormSlice";
import Form1 from "./(forms)/Form1";
import Form2 from "./(forms)/Form2";
import Form3 from "./(forms)/Form3";

const SignupForm = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const dispatch = useAppDispatch();
  const { role } = useAppSelector((state) => state.signUpForm);

  return (
    <>
      {role !== "CONSUMER" && role !== "PRODUCER" ? (
        <div>
          <h4 className="text-center">How do you want to signup as ?</h4>

          <section className="mt-8 grid gap-4 grid-cols-2">
            <div
              className="border p-20 flex justify-center items-center rounded-md hover:cursor-pointer hover:scale-105 hover:shadow-2xl scale-100 duration-500 transition-all hover:bg-tertiary/10"
              onClick={() => dispatch(updateRole("CONSUMER"))}
            >
              CONSUMER
            </div>
            <div
              className="border p-20 flex justify-center items-center rounded-md hover:cursor-pointer hover:scale-105 hover:shadow-2xl scale-100 duration-500 transition-all hover:bg-tertiary/10"
              onClick={() => dispatch(updateRole("PRODUCER"))}
            >
              PRODUCER
            </div>
          </section>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <Stepper
              stepData={
                role === "CONSUMER" ? consumerStepData : producerStepData
              }
              activeStep={activeStep}
              setActiveStep={setActiveStep}
            />
          </div>
          {activeStep === 1 ? (
            <Form1 setActiveStep={setActiveStep} />
          ) : activeStep === 2 ? (
            <Form2 setActiveStep={setActiveStep} />
          ) : (
            activeStep === 3 && <Form3 />
          )}
        </>
      )}
    </>
  );
};

export default SignupForm;
