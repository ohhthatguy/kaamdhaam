"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, EyeIcon } from "lucide-react";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type producerJobManagementDataType = {
  applicant: string;
  rating: string;
  workerId: string;
  status: boolean;
  dateApplied: string;
  dateOfWorkEnded: string;
};

export const columns: ColumnDef<producerJobManagementDataType>[] = [
  {
    accessorKey: "applicant",
    header: "Applicant",
    cell: ({ row }) => {
      return (
        <div className="max-w-70  leading-tight tracking-tight whitespace-normal  wrap-break-words">
          {row.getValue("applicant")}
        </div>
      );
    },
  },
  {
    accessorKey: "rating",

    header: ({ column }) => {
      return (
        <button
          className=" flex gap-2 items-center hover:cursor-pointer"
          // variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rating
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
  },

  {
    accessorKey: "dateApplied",
    header: ({ column }) => {
      return (
        <button
          className=" flex gap-2 items-center hover:cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Applied
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },

    cell: ({ row }) => {
      const dateValue = row.getValue("dateApplied") as string;
      const formatted = new Date(dateValue).toISOString().split("T")[0];

      return <div>{formatted}</div>;
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      console.log(row);
      const statusStr = row.getValue("status") as boolean;
      const dateEnded = row.original.dateOfWorkEnded;

      console.log("INSIDE STTATUS: ", dateEnded);

      return (
        <div
          className={`${dateEnded && dateEnded !== "undefineD" ? "bg-gray-800/40 p-1 rounded-md text-center" : statusStr ? "bg-green-400 p-1 rounded-md text-center" : "bg-yellow-400 p-1 rounded-md text-center"}`}
        >
          {dateEnded && dateEnded !== "undefineD"
            ? "Work Ended"
            : statusStr
              ? "Work Assigned"
              : "Pending"}
        </div>
      );
    },
  },
  {
    accessorKey: "workerId",
    header: "Action",
    cell: ({ row }) => {
      return (
        <Link
          href={`/profile?workerId=${row.getValue("workerId")}`}
          className=" hover:cursor-pointer text-center"
        >
          <EyeIcon size={22} className="hover:fill-green-500" />
        </Link>
      );
    },
  },
];
