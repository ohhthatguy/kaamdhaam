"use client";
import { useState } from "react";
import { toast } from "react-toastify";

type CurrentUserData = {
  name: string;
  email: string;
  role: string;
  profileImg: string;
  id: string;
};

type offerModelDataType = {
  postId: string;
  intrestedWorkers: [
    {
      workerName: string;
      workerImg: string;
      workerBio?: string;
      workerId: string;
      isWorkAssociated: boolean;
      offerMadeAt?: Date;
    },
  ];
};

const ImIntrestedComponent = ({
  id,
  userData,
}: {
  id: string;
  userData: CurrentUserData | undefined;
}) => {
  const [isOffered, setIsOffered] = useState<boolean>(false);

  const handleClick = async () => {
    console.log("PostID: ", id);

    try {
      if (!userData || !userData.name || !userData.profileImg || !userData.id) {
        throw new Error(
          "There is no user data or missing required fields in getCurrentUserData()",
        );
      }
      const offerData: offerModelDataType = {
        postId: id,
        intrestedWorkers: [
          {
            workerName: userData?.name,
            workerImg: userData?.profileImg,
            workerId: userData?.id,
            isWorkAssociated: false,
          },
        ],
      };

      const res = await fetch("/api/consumer/send-offer", {
        method: "POST",
        body: JSON.stringify(offerData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.message ||
            "Something went wrong during imIntrestedComponent in /api/consumer/send-offer",
        );
      }

      const result = await res.json();
      console.log("New work succesfully created", result);

      toast.success("New work succesfully created");
      setIsOffered(true);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  return (
    <div>
      <button
        onClick={() => handleClick()}
        disabled={isOffered}
        className={`border border-border px-4 py-2 rounded-md text-white hover:scale-105 scale-100 transition-all duration-500  ${!isOffered ? "bg-green-800/85" : "bg-gray-600"} `}
      >
        Im Intrested!
      </button>
    </div>
  );
};

export default ImIntrestedComponent;
