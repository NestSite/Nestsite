"use client";
import { toast } from "@/components/ui/use-toast";
import { IRole } from "@/interfaces";
import { createColumnHelper } from "@tanstack/react-table";
import GirlImg from "@/assets/frame.png"
import Image from "next/image";
import { Input } from "@/components/ui/input";
import Header from "@/components/table/table-header-item";
import Actions from "@/components/table/table-actions";
import { Checkbox } from "@/components/ui/checkbox";

const roleColumnHelper = createColumnHelper<IRole>();

export const roleColumns = [
    roleColumnHelper.accessor("id", {
        header: ({ column }) => <Header title="" column={column} />,

        sortingFn: "text",
        cell: (info) => <div>
            <Checkbox className="w-5 h-5" />
        </div>,
        // footer: (info) => info.column.id,
    }),
    roleColumnHelper.accessor("name", {
        header: ({ column }) => <Header title="Name" column={column} />,

        sortingFn: "text",
        cell: (info) => (
            <div className="flex items-center gap-2">
                <Image src={GirlImg} alt='profile' className="w-9 h-9" />
                <span className="capitalize whitespace-nowrap">
                    {info.getValue()?.toString()}
                </span>
            </div>
        ),
        // footer: (info) => info.column.id,
    }),
    roleColumnHelper.accessor("email", {
        header: ({ column }) => <Header title="Email" column={column} />,

        sortingFn: "text",
        cell: (info) => (
            <span className="capitalize whitespace-nowrap">
                {info.getValue()?.toString()}
            </span>
        ),
        // footer: (info) => info.column.id,
    }),
    roleColumnHelper.accessor("phone", {
        header: ({ column }) => <Header title="Mobile" column={column} />,

        sortingFn: "text",
        cell: (info) => (
            <span className="capitalize whitespace-nowrap">
                {info.getValue()?.toString()}
            </span>
        ),
        // footer: (info) => info.column.id,
    }),
    roleColumnHelper.accessor('employeeId', {
        header: ({ column }) => <Header title="Employee ID" column={column} />,

        sortingFn: "text",
        cell: (info) => (
            <span className="capitalize whitespace-nowrap">
                {info.getValue()?.toString()}
            </span>
        ),
        // footer: (info) => info.column.id,
    }),
    roleColumnHelper.accessor("createdAt", {
        header: ({ column }) => <Header title="Date" column={column} />,

        sortingFn: "text",
        cell: (info) => (
            <span className="capitalize whitespace-nowrap">
                {info.getValue()?.toString()}
            </span>
        ),
        // footer: (info) => info.column.id,
    }),

    roleColumnHelper.accessor("status", {
        header: ({ column }) => <Header title="Status" column={column} />,

        sortingFn: "text",
        cell: (info) => (
            <span className="p-2 px-3 text-xs capitalize border rounded-full whitespace-nowrap border-black/20 text-black/60">
                {info.getValue()?.toString()}
            </span>
        ),
        // footer: (info) => info.column.id,
    }),

    roleColumnHelper.accessor("id", {
        sortingFn: "text",
        cell: (info) => {
            const router = { push: (url: string) => window.location.href = url };
            return (
                <Actions
                    isHidden={!!info.getValue()}
                    hideFunction={async () => {
                        // await hidebooking(info?.row?.original?._id ?? "", !info.getValue());
                        toast({
                            description: `booking ${!info.getValue() ? "Hidden" : "Shown"}!`,
                        });
                    }}
                    editFunction={async () => {
                        router.push(`/admin/bookings/${info?.row?.original?.id}`);
                    }}
                    deleteFunction={async () => {
                        toast({
                            description: "booking deleted!",
                        });
                    }}
                />
            );
        },
        header: ({ column }) => <Header title="Actions" column={column} className="justify-center" />,

        // footer: (info) => info.column.id,
    }),
];
