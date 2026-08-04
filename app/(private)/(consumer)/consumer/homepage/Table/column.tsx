"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, EyeIcon } from "lucide-react";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type consumerApplicationDataType = {
  title: string;
  rate: string;
  postId: string;
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
      console.log("INside table columns postId: ", row.getValue("postId"));
      return (
        // Apply wrapping classes here

        <div className="max-w-70  leading-tight tracking-tight whitespace-normal  wrap-break-words">
          {row.getValue("title")}
        </div>
      );
    },
  },
  {
    accessorKey: "rate",

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
  {
    accessorKey: "postId",
    header: "Action",
    cell: ({ row }) => {
      return (
        <Link
          href={`/consumer/work-detail?workPostId=${row.getValue("postId")}`}
          className=" hover:cursor-pointer text-center"
        >
          <EyeIcon size={22} className="hover:fill-green-500" />
        </Link>
      );
    },
  },
];
