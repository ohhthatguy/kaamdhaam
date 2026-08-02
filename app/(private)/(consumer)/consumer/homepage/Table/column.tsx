"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Payment = {
//   id: string;
//   amount: number;
//   status: "pending" | "processing" | "success" | "failed";
//   email: string;
// };

export type consumerApplicationDataType = {
  title: string;
  rate: string;
  status: "PENDING" | "ACTIVE" | "ENDED";
  dateApplied: string;
  expectedTime:
    | "within 1-3 hour"
    | "within half a day"
    | "about a day"
    | "within 1-3 days"
    | "within a week";
};

export const columns: ColumnDef<consumerApplicationDataType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return (
        // Apply wrapping classes here
        <div className="max-w-70  leading-tight tracking-tight whitespace-normal wrap-break-words">
          {row.getValue("title")}
        </div>
      );
    },
  },
  {
    accessorKey: "rate",
    // header: "Rate",
    header: ({ column }) => {
      return (
        <button
          className=" flex gap-2 items-center hover:cursor-pointer"
          // variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rate
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
    accessorKey: "expectedTime",
    header: "Expected Time",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const statusStr = row.getValue("status") as
        | "PENDING"
        | "ACTIVE"
        | "ENDED";

      const statusData = {
        PENDING: "bg-yellow-400 p-1 rounded-md text-center",
        ACTIVE: "bg-green-400 p-1 rounded-md text-center",
        ENDED: "bg-red-400 p-1 rounded-md text-center",
      };

      return <div className={`${statusData[statusStr]}`}>{statusStr}</div>;
    },
  },
];
