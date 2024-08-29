"use client"

import { ROUTE } from "@/lib/constants";
import { AdminPageHeader } from "../../_components/admin-sections";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import Actions from "@/components/table/table-actions";
import AddFaqDialog from "../_components/AddFaqDialog.dialog";
import { useState } from "react";
import EditFaqDialog from "../_components/EditFaqDialog.dialog";
import { Filters } from "@/components/ui/filters";


export default function Pages() {
    const [editId, setEditId] = useState('')
    const handlePageSize = (value: string) => {
        // TODO: Handle Filter
	}
    return (

        <div className="flex flex-col self-stretch px-16 mt-8 max-md:px-5 max-md:max-w-full">
            <EditFaqDialog open={editId} setOpen={setEditId} />
            <AdminPageHeader title="FAQs" className="mb-4" />
			<Filters handlePageSize={handlePageSize} />

            <div className="justify-end flex mb-6">
                <AddFaqDialog>
                    <Button className="flex items-center h-full gap-3 py-2.5 md:py-4">
                        <IconPlus size={'1.1rem'} />
                        Add FAQ Page
                    </Button>
                </AddFaqDialog>
            </div>
            <div className="flex flex-col gap-4">
                {
                    [...Array.from(Array(10).keys())].map(el => (             
                        <div key={el} className="flex items-center justify-between gap-4 rounded-md p-3 md:p-4 bg-white">
                            <p className="text-[#424242] text-sm font-bold">How to get verified with Waveserve.</p>
                            <Actions
                                isHidden={false}
                                hideFunction={async () => {
                                    // await hidebooking(info?.row?.original?._id ?? "", !info.getValue());
                                    toast({
                                        description: `booking ${true ? "Hidden" : "Shown"}!`,
                                    });
                                }}
                                viewFunction={async () => {
                                    toast({
                                        description: `booking ${true ? "Hidden" : "Shown"}!`,
                                    });
                                }}
                                editFunction={async () => {
                                    setEditId(el.toString())

                                    // router.push(`${ROUTE.TASKERS}/`);
                                }}
                                deleteFunction={async () => {
                                    toast({
                                        // description: "Tasker deleted!",
                                    });
                                }}
                            />
                            {/* <EllipsisVertical size={'1.4rem'} /> */}
                        </div>
                    ))
                }
            </div>
        </div>

    );
}
