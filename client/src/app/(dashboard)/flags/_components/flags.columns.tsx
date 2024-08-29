"use client";
import { IFlag } from "@/interfaces";
import { createColumnHelper } from "@tanstack/react-table";
import GirlImg from "@/assets/frame.png"
import Image from "next/image";
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import Header from "@/components/table/table-header-item";
import { Button } from "@/components/ui/button";

const flagColumnHelper = createColumnHelper<IFlag>();

export const flagColumns = [
    // flagColumnHelper.accessor("id", {
    //     header: ({ column }) => <Header title="" column={column} />,

    //     sortingFn: "text",
    //     cell: (info) => <div>
    //         <Checkbox className="w-5 h-5" />
    //     </div>,
    // }),
    flagColumnHelper.accessor("customer", {
        header: ({ column }) => <Header title="User" column={column} />,
        sortingFn: "text",
        cell: (info) => (
            <div className="flex items-center gap-2">
                <Image src={info.getValue()?.profilePhoto?.toString() || GirlImg} alt='profile' className="rounded-full w-9 h-9" />
                <div className="flex flex-col">
                    <span className="capitalize whitespace-nowrap">
                        {info.getValue()?.biodata?.firstName?.toString()}
                        {" "}
                        {info.getValue()?.biodata?.lastName?.toString()}
                    </span>
                    <span className="text-xs">
                        {info.getValue()?.biodata?.otherDetails?.profession?.toString()}
                    </span>
                </div>
            </div>
        ),
    }),
    flagColumnHelper.accessor("rating", {
        header: ({ column }) => <Header title="Ratings" column={column} />,
        sortingFn: "text",
        cell: (info) => (
            <span className="flex items-center gap-1 capitalize whitespace-nowrap">
                {
                    [...Array.from(Array(4))].map(el => (<IconStarFilled size={14} key={el} color="#FFD300" className="rounded-full" />))
                }
                <IconStar className="rounded-full" size={14} />
            </span>
        ),
    }),
    flagColumnHelper.accessor("endpoint", {
        header: ({ column }) => <Header title="Endpoint" column={column} />,
        sortingFn: "text",
        cell: (info) => <span className="capitalize whitespace-nowrap">{info.getValue()}</span>,
    }),   
    flagColumnHelper.accessor("Last14days", {
        header: ({ column }) => <Header title="Last 14 days" column={column} />,
        sortingFn: "text",
        cell: (info) => <span className="capitalize whitespace-nowrap w-fit bg-[#1691B21A] rounded-3xl px-4 p-2 flex justify-center items-center">{info.getValue()}</span>,
    }),   
    flagColumnHelper.accessor("Last30days", {
        header: ({ column }) => <Header title="Last 30 days" column={column} />,
        sortingFn: "text",
        cell: (info) => <span className="capitalize whitespace-nowrap w-fit bg-[#1691B21A] rounded-3xl px-4 p-2 flex justify-center items-center">{info.getValue()}</span>,
    }),   
    flagColumnHelper.accessor("Last60days", {
        header: ({ column }) => <Header title="Last 60 days" column={column} />,
        sortingFn: "text",
        cell: (info) => <span className="capitalize whitespace-nowrap w-fit bg-[#1691B21A] rounded-3xl px-4 p-2 flex justify-center items-center">{info.getValue()}</span>,
    }),   
    flagColumnHelper.accessor("id", {
        sortingFn: "text",
        cell: (info) => {
            const router = { push: (url: string) => window.location.href = url };
            return (
                // <Actions
                //     isHidden={!!info.getValue()}
                //     hideFunction={async () => {
                //         // await hidebooking(info?.row?.original?._id ?? "", !info.getValue());
                //         toast({
                //             description: `booking ${!info.getValue() ? "Hidden" : "Shown"}!`,
                //         });
                //     }}
                //     viewFunction={async () => {
                //         router.push(`${ROUTE.TASKERS}/${info?.row?.original?.id}`);
                //     }}
                //     editFunction={async () => {
                //         router.push(`${ROUTE.TASKERS}/${info?.row?.original?.id}`);
                //     }}
                //     deleteFunction={async () => {
                //         toast({
                //             description: "Tasker deleted!",
                //         });
                //     }}
                // />
                <Button variant={'destructive'}>More Flags</Button>
            );
        },
        header: ({ column }) => <Header title="Actions" column={column} className="justify-center" />,

        // footer: (info) => info.column.id,
    }),
];
