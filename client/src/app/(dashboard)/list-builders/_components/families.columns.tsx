"use client";
import { toast } from "@/components/ui/use-toast";
import { ICountries } from "@/interfaces";
import { Column, createColumnHelper } from "@tanstack/react-table";
import Header from "../../../../components/table/table-header-item";
import { StatusType } from "@/lib/constants";
import Status from "@/app/(dashboard)/_components/Status";
import { Input } from "@/components/ui/input";
import { IconStarFilled } from "@tabler/icons-react";
import { Checkbox } from "@/components/ui/checkbox";
import ListBuilderActions from "./list-builder-table-actions";

const familiesColumnHelper = createColumnHelper<ICountries>();


export const familiesColumns = [
    familiesColumnHelper.accessor("id", {
        header: ({ column }) => <Header title="" column={column} />,

        sortingFn: "text",
        cell: (info) => <div>
            <Checkbox className="w-5 h-5" />
        </div>,
        // footer: (info) => info.column.id,
    }),

    familiesColumnHelper.accessor("city", {
        header: ({ column }) => <Header title="Family Name" column={column} />,

        sortingFn: "text",
        cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString()}</span>,
    }),

    familiesColumnHelper.accessor("createdAt", {
        header: ({ column }) => <Header title="Date Created" column={column} />,

        sortingFn: "text",
        cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString()}</span>,
    }),

    familiesColumnHelper.accessor("status", {
        header: ({ column }) => <Header title="Status" column={column} />,

        sortingFn: "text",
        cell: (info) => {
            const val = info.getValue()?.toString() as StatusType;
            return <Status value={val} />
        },
        // footer: (info) => info.column.id,
    }),

    familiesColumnHelper.accessor("id", {
        sortingFn: "text",
        cell: (info) => {
            const router = { push: (url: string) => window.location.href = url };
            return (
                <ListBuilderActions
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
