"use client";
import { toast } from "@/components/ui/use-toast";
import { ICountries } from "@/interfaces";
import { Column, createColumnHelper } from "@tanstack/react-table";
import Header from "../../../../components/table/table-header-item";
import Actions from "../../../../components/table/table-actions";
import GirlImg from "@/assets/frame.png"
import CountryImg from "@/assets/usa.png"
import Image from "next/image";
import { StatusType } from "@/lib/constants";
import Status from "@/app/(dashboard)/_components/Status";
import { Input } from "@/components/ui/input";
import { IconStarFilled } from "@tabler/icons-react";
import { Checkbox } from "@/components/ui/checkbox";

const countriesColumnHelper = createColumnHelper<ICountries>();


export const countriesColumns = [
    countriesColumnHelper.accessor("id", {
        header: ({ column }) => <Header title="" column={column} />,

        sortingFn: "text",
        cell: (info) => <div>
            <Checkbox className="w-5 h-5" />
        </div>,
        // footer: (info) => info.column.id,
    }),
    countriesColumnHelper.accessor("country", {
        header: ({ column }) => <Header title="Country" column={column} />,

        sortingFn: "text",
        cell: (info) => (
            <div className="flex items-center gap-2">
                <Image src={info.getValue()?.image?.toString() || CountryImg} alt='country' className="rounded-full w-9 h-9" />
                <span className="capitalize whitespace-nowrap">
                    {info.getValue()?.name?.toString()}
                </span>
            </div>
        ),
        // footer: (info) => info.column.id,
    }),

    countriesColumnHelper.accessor("city", {
        header: ({ column }) => <Header title="City" column={column} />,

        sortingFn: "text",
        cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString()}</span>,
    }),

    countriesColumnHelper.accessor("createdAt", {
        header: ({ column }) => <Header title="Date Created" column={column} />,

        sortingFn: "text",
        cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString()}</span>,
    }),

    countriesColumnHelper.accessor("status", {
        header: ({ column }) => <Header title="Status" column={column} />,

        sortingFn: "text",
        cell: (info) => {
            const val = info.getValue()?.toString() as StatusType;
            return <Status value={val} />
        },
        // footer: (info) => info.column.id,
    }),

    countriesColumnHelper.accessor("id", {
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
