const Form3 = ({
  setActiveStep,
}: {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div>
      Form3
      <div>
        <button
          className="border w-fit px-4 py-2 rounded-md cursor-pointer"
          onClick={() => setActiveStep(4)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Form3;
