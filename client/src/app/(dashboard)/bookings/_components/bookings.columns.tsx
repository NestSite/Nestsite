"use client";

import { toast } from "@/components/ui/use-toast";
import { IBooking } from "@/interfaces";
import { createColumnHelper } from "@tanstack/react-table";
import Header from "@/components/table/table-header-item";
import Actions from "@/components/table/table-actions";
import GirlImg from "@/assets/frame.png";
import Image from "next/image";
import { StatusType } from "@/lib/constants";
import StatusSecondary from "@/app/(dashboard)/_components/StatusSecondary";

const bookingColumnHelper = createColumnHelper<IBooking>();

export const bookingColumns = ({
    id,
    setId,
}: {
    id: string;
    setId: React.Dispatch<React.SetStateAction<string>>;
}) => [
    bookingColumnHelper.accessor("customer.username", {
        header: ({ column }) => <Header title="Booking ID" column={column} />,
        sortingFn: "text",
        cell: (info) => (
            <span className="capitalize whitespace-nowrap">
                {info.getValue()?.toString()}
            </span>
        ),
    }),

    bookingColumnHelper.accessor("customer", {
        header: ({ column }) => <Header title="User" column={column} />,
        sortingFn: "text",
        cell: (info) => {
            const customer = info.getValue();
            const profilePhoto = customer?.profilePhoto?.toString() || GirlImg;
            const username = customer?.username?.toString() || "Unknown User";

            return (
                <div className="flex items-center gap-2">
                    <Image
                        width={100}
                        height={100}
                        src={profilePhoto}
                        alt="profile"
                        className="rounded-full w-9 h-9"
                    />
                    <span className="capitalize whitespace-nowrap">
                        {username}
                    </span>
                </div>
            );
        },
    }),

    bookingColumnHelper.accessor("service.title", {
        header: ({ column }) => <Header title="Service" column={column} />,
        sortingFn: "text",
        cell: (info) => (
            <span className="capitalize whitespace-nowrap">
                {info.getValue()?.toString() || "Unknown Service"}
            </span>
        ),
    }),

    bookingColumnHelper.accessor("status", {
        header: ({ column }) => <Header title="Status" column={column} />,
        sortingFn: "text",
        cell: (info) => {
            const status = info.getValue() as StatusType;
            return <StatusSecondary value={status || "unknown"} />;
        },
    }),

    bookingColumnHelper.accessor("createdAt", {
        header: ({ column }) => <Header title="Booking Date" column={column} />,
        sortingFn: "text",
        cell: (info) => (
            <span className="whitespace-nowrap">
                {new Date(info.getValue()?.toString()).toLocaleDateString() || "Unknown Date"}
            </span>
        ),
    }),

    bookingColumnHelper.accessor("id", {
        sortingFn: "text",
        cell: (info) => {
            const router = { push: (url: string) => window.location.href = url };
            return (
                <div className="flex justify-center pr-6">
                    <Actions
                        isHidden={!!info.getValue()}
                        hideFunction={async () => {
                            // Implement hide/show functionality here
                            toast({
                                description: `Booking ${info.getValue() ? "Shown" : "Hidden"}!`,
                            });
                        }}
                        viewFunction={async () => setId(info?.row?.original?.id)}
                        editFunction={async () => {
                            router.push(`/admin/bookings/${info?.row?.original?.id}`);
                        }}
                        deleteFunction={async () => {
                            // Implement delete functionality here
                            toast({
                                description: "Booking deleted!",
                            });
                        }}
                    />
                </div>
            );
        },
        header: ({ column }) => (
            <Header title="Actions" column={column} className="justify-center" />
        ),
    }),
];
