"use client";
// import { useState } from "react";
import { toast } from "react-toastify";

export type dataToRouteHandleOfferDateType = {
  postId: string;
  workerId: string;
  action: "workAssigned" | "workEnded" | "afterWorkEnded";
};

const DecisionBtn = ({
  isWorkAssociated,
  id,
  workerId,
  postStatus,
}: {
  isWorkAssociated: boolean;
  id: string;
  workerId: string;
  postStatus: "ACTIVE" | "PENDING" | "ENDED";
}) => {
  // const [isOffered, setIsOffered] = useState<boolean>(false);

  const handleDecision = async () => {
    console.log("PostID: ", id);

    try {
      const offerData: dataToRouteHandleOfferDateType = {
        postId: id,
        workerId: workerId,
        action:
          postStatus === "PENDING"
            ? "workAssigned"
            : postStatus === "ACTIVE"
              ? "workEnded"
              : "afterWorkEnded",
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
      // setIsOffered(true);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  return (
    <div>
      <button
        onClick={() =>
          (postStatus === "PENDING" || postStatus === "ACTIVE") &&
          handleDecision()
        }
        // disabled={isWorkAssociated || isOffered}
        // {isWorkAssociated || isOffered ? "bg-gray-700/40" : "bg-green-800/85"}
        disabled={postStatus === "ENDED"}
        className={`border border-border px-4 py-2 rounded-md text-white hover:cursor-pointer ${postStatus === "PENDING" ? "bg-green-800/85" : postStatus === "ACTIVE" ? "bg-amber-400/40" : "bg-gray-700/40"} `}
      >
        {postStatus === "PENDING"
          ? "ACCEPT OFFER"
          : postStatus === "ACTIVE"
            ? "FINISHED WORK?"
            : "WORK ENDED"}
      </button>
    </div>
  );
};

export default DecisionBtn;
