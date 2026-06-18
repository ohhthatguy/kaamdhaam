import type { stepsDataType } from "./type";

const Stepper = ({
  stepData,
  activeStep = 1,
  setActiveStep,
}: {
  stepData: stepsDataType[];
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const handleClick = (
    isCompleted: boolean,
    isActive: boolean,
    stepNumber: number,
  ) => {
    if (isCompleted || isActive) {
      setActiveStep(stepNumber);
    }
  };

  return (
    <div className="relative flex justify-between w-full max-w-2xl mx-auto items-start">
      <div className="absolute left-0 top-4 right-0 h-0.5 bg-gray-700 -z-10 flex w-full">
        <div
          className="bg-blue-600 h-full transition-all duration-300 ease-out"
          style={{
            width: `${((activeStep - 1) / (stepData.length - 1)) * 100}%`,
          }}
        />
      </div>

      {stepData.map((e: stepsDataType, index: number) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < activeStep;
        const isActive = stepNumber === activeStep;

        return (
          <div
            key={index}
            className={`flex   flex-col items-center gap-4 bg-transparent  `}
            onClick={() => handleClick(isCompleted, isActive, stepNumber)}
          >
            <div
              className={`h-8  w-8 text-white shadow-2xl rounded-full flex justify-center items-center font-semibold transition-colors duration-300
            ${isCompleted || isActive ? "bg-blue-500 cursor-pointer" : "bg-gray-400"}
          `}
            >
              {isCompleted ? "✓" : stepNumber}
            </div>

            <div
              className={`text-sm px-4 text-center ${isActive ? "text-blue-500 font-bold" : "text-gray-400"}`}
            >
              {e.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
