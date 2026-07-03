"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

type messageDataType = {
  heading: string;
  label: string;
  btn: "RESEND" | "LOGIN" | "VERIFY";
};

const Page = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  console.log(token);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<messageDataType>({
    heading: "Verify Your Email",
    label: "Please click this button to verify your email.",
    btn: "VERIFY",
  });

  const verifiyToken = async () => {
    console.log("asd");
    if (message.btn === "LOGIN") {
      toast.success("PLEASE LOGIN USING CREDENTIALS");
      router.replace("/login");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(
        `/api/verify/${message.btn === "VERIFY" ? "email" : "expired-token"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(token),
        },
      );

      const data = await res.json();
      setMessage(data.message);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex mt-16 items-center flex-col gap-16 h-full">
      <div>
        <h2>{message.heading}</h2>
        <p className="text-xl mt-2">{message.label}</p>
      </div>

      <button
        onClick={() => verifiyToken()}
        className={`border w-28 p-2 rounded-md hover:cursor-pointer hover:scale-105 scale-100 transition-all duration-500 shadow-2xl hover:bg-tertiary/85 hover:border-border hover:text-white ${isLoading && `flex justify-center items-center bg-tertiary`}`}
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
                stroke="currentColor"
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
          message.btn
        )}
      </button>
    </div>
  );
};

export default Page;
