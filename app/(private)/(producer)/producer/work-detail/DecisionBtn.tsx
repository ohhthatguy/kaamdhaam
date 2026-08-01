"use client";
import { useState } from "react";
import { toast } from "react-toastify";

const DecisionBtn = ({
  isWorkAssociated,
  id,
  workerId,
}: {
  isWorkAssociated: boolean;
  id: string;
  workerId: string;
}) => {
  const [isOffered, setIsOffered] = useState<boolean>(false);

  const handleClick = async () => {
    console.log("PostID: ", id);

    try {
      const offerData = {
        postId: id,
        workerId: workerId,
      };

      const res = await fetch("/api/producer/handle-offer", {
        method: "PUT",
        body: JSON.stringify(offerData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(
          responseData.message ||
            "Something went wrong during DecisionBtn in /api/producer/handle-offer",
        );
      }

      toast.success(" work succesfully Associated");
      setIsOffered(true);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  return (
    <div>
      <button
        onClick={() => handleClick()}
        disabled={isWorkAssociated || isOffered}
        className={`border border-border px-4 py-2 rounded-md text-white hover:cursor-pointer ${isWorkAssociated || isOffered ? "bg-gray-700/40" : "bg-green-800/85"} `}
      >
        {isWorkAssociated || isOffered ? "Job Assigned" : "Accept Offer"}
      </button>
    </div>
  );
};

export default DecisionBtn;
