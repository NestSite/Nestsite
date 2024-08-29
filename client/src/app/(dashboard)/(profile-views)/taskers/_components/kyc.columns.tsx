"use client";
import { toast } from "@/components/ui/use-toast";
import { IKYC } from "@/interfaces";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { StatusType } from "@/lib/constants";
import Status from "@/app/(dashboard)/_components/Status";
import { IconFile } from "@tabler/icons-react";
import Header from "@/components/table/table-header-item";
import Actions from "@/components/table/table-actions";
import DocumentPreviewDialog from "./DocumentPreview.dialog";

interface IProps {
    previewDoc: (id: string) => void,
}
  

const kycColumnHelper = createColumnHelper<IKYC>();  
  
export const kycColumnsMaker = ({ 
    previewDoc,
}: IProps) => [
    // kycColumnHelper.accessor("id", {
    //     header: ({ column }) => <Header title="" column={column} />,

    //     sortingFn: "text",
    //     cell: (info) => <div>
    //         <Input type="checkbox" className="w-5" />
    //     </div>,
    // }),
    kycColumnHelper.accessor("docType", {
        header: ({ column }) => <Header title="Document Type" column={column} />,
        sortingFn: "text",
        cell: (info) => (
            <span className="flex items-center gap-1 capitalize whitespace-nowrap">
                {info.getValue()?.toString()}
            </span>
        ),
        // footer: (info) => info.column.id,
    }),
    kycColumnHelper.accessor("files", {
        header: ({ column }) => <Header title="File" column={column} />,
        sortingFn: "text",
        cell: (info) => {
            const data = info.row.original;
            return (
            <div className="flex items-center gap-1">
            {
                info.getValue()?.map((value, index) => (
                    <div onClick={() => previewDoc(data.id)} key={index} className="flex items-center gap-0.5 text-primary cursor-pointer">
                        {value.name}
                        <a href={value.doc}><IconFile color="#1691B2" /></a>
                    </div>
                ))
            }
            </div>)
        },
        // footer: (info) => info.column.id,
    }),
    kycColumnHelper.accessor("expiryDate", {
        header: ({ column }) => <Header title="Expiry Date" column={column} />,

        sortingFn: "text",
        cell: (info) => (
            <span className="flex items-center gap-1 capitalize whitespace-nowrap">
                {info.getValue()?.toString()}
            </span>
        ),
        // footer: (info) => info.column.id,
    }),
    kycColumnHelper.accessor("status", {
        header: ({ column }) => <Header title="Status" column={column} />,

        sortingFn: "text",
        cell: (info) => {
            const val = info.getValue()?.toString() as StatusType;
            return <Status value={val} />
        },
        // footer: (info) => info.column.id,
    }),
    kycColumnHelper.accessor("id", {
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
                    viewFunction={async () => previewDoc(info.row.original.id)}
                    editFunction={async () => {
                        router.push(`/kycs/${info?.row?.original?.id}`);
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
