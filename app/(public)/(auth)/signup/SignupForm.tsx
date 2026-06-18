"use client";
import { useState } from "react";
import Stepper from "./(forms)/Stepper";
import { stepData } from "./(forms)/data";

import Form1 from "./(forms)/Form1";
import Form2 from "./(forms)/Form2";
import Form3 from "./(forms)/Form3";

const SignupForm = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  return (
    <>
      <div className="mb-6">
        <Stepper
          stepData={stepData}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      </div>
      {activeStep === 1 ? (
        <Form1 setActiveStep={setActiveStep} />
      ) : activeStep === 2 ? (
        <Form2 setActiveStep={setActiveStep} />
      ) : (
        activeStep === 3 && <Form3 setActiveStep={setActiveStep} />
        // for step4 show the final form
      )}
    </>
  );
};

export default SignupForm;
