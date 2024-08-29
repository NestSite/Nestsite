"use client";
import { toast } from "@/components/ui/use-toast";
import { IBooking } from "@/interfaces";
import { Column, createColumnHelper } from "@tanstack/react-table";
import Header from "@/components/table/table-header-item";
import Actions from "@/components/table/table-actions";
import GirlImg from "@/assets/frame.png";
import Image from "next/image";

const reviewColumnHelper = createColumnHelper<IBooking>();

export const reviewColumns = ({
  handleDelete,
}: {
  handleDelete: (id: string) => void;
}) => [
  reviewColumnHelper.accessor("customer", {
    header: ({ column }) => <Header title="User" column={column} />,
    sortingFn: "text",
    cell: (info) => (
      <div className="flex items-center gap-2">
        <Image
          src={info.getValue()?.profilePhoto?.toString() || GirlImg}
          alt="profile"
          className="rounded-full w-9 h-9"
        />
        <span className="capitalize whitespace-nowrap">
          {info.getValue()?.username?.toString()}
        </span>
      </div>
    ),
  }),
  reviewColumnHelper.accessor("service", {
    header: ({ column }) => <Header title="Service" column={column} />,
    sortingFn: "text",
    cell: (info) => (
      <span className="capitalize whitespace-nowrap">
        {info.getValue()?.title?.toString()}
      </span>
    ),
  }),
  reviewColumnHelper.accessor("serviceId", {
    header: ({ column }) => <Header title="Booking ID" column={column} />,
    sortingFn: "text",
    cell: (info) => (
      <span className="capitalize whitespace-nowrap">
        {info.getValue()?.toString()}
      </span>
    ),
  }),
  reviewColumnHelper.accessor("createdAt", {
    header: ({ column }) => <Header title="Date and Time" column={column} />,
    sortingFn: "text",
    cell: (info) => (
      <span className="capitalize whitespace-nowrap">
        {info.getValue()?.toString()}
      </span>
    ),
  }),
  reviewColumnHelper.accessor("id", {
    sortingFn: "text",
    cell: (info) => (
      <div className="flex justify-center pr-6">
        <Actions
          isHidden={!!info.getValue()}
          hideFunction={async () => {
            // Example of hiding functionality, not implemented
            toast({
              description: `Review ${!info.getValue() ? "Hidden" : "Shown"}!`,
            });
          }}
          editFunction={async () => {
            // Example of edit functionality, not implemented
            window.location.href = `/admin/reviews/${info?.row?.original?.id}`;
          }}
          deleteFunction={async () => {
            handleDelete(info?.row?.original?.id);
            toast({
              description: "Review deleted!",
            });
          }}
        />
      </div>
    ),
    header: ({ column }) => <Header title="Actions" column={column} className="justify-center" />,
  }),
];
