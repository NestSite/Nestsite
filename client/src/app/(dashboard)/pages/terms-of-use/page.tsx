"use client"

import { ROUTE } from "@/lib/constants";
import { AdminPageHeader } from "../../_components/admin-sections";
import { Edit, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";


import { useRouter } from 'next/navigation';
import EditDialog from "../_components/Edit.dialog";
import AddDialog from "../_components/Add.dialog";



export default function Pages() {
    const router = useRouter();

    return (
        <div className="flex flex-col self-stretch px-16 mt-8 max-md:px-5 max-md:max-w-full">

            <AdminPageHeader title="Terms of Use" />
            <div className="flex flex-col w-full gap-6 mt-4 bg-white rounded-xl py-8 px-4 items center">
                <div className="flex w-full items-center justify-between">
                    <h2 className="text-3xl font-bold">Terms of Use</h2>
                    <div className="flex gap-4 items-center">
                        <EditDialog title="Terms of Use">
                            <Button className="flex items-center text-primary font-bold w-fit h-full gap-3 py-4" variant="outline" >
                                <Edit size={'1.1rem'} color="#1691B2" />
                                Edit Page
                            </Button>
                        </EditDialog>
                        <AddDialog title="Terms of Use">
                            <Button className="flex items-center w-fit h-full gap-3 py-4">
                                <Plus size={'1.1rem'} />
                                Add New Page
                            </Button>
                        </AddDialog>
                    </div>
                </div>
                <div className="flex flex-col">
                    <h2 className="text-[#424242] font-bold text-2xl">Terms of Use</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur. Semper accumsan vitae eu dignissim enim rhoncus. In duis quis id ligula ut lectus ut. Ultricies etiam in turpis blandit et pulvinar a. Nunc cras feugiat nam facilisi. Purus nullam ultrices cras nullam. Eleifend blandit integer lacus elit. Orci malesuada eget habitant ullamcorper cras orci aliquam sed tempus. Tellus phasellus at mauris mi massa risus. Consequat scelerisque ut augue maecenas. Rhoncus facilisis pulvinar mauris non posuere sed risus id. Fames diam quis facilisis molestie tempor. Phasellus at enim velit viverra nibh at risus nisl convallis.
                        Integer nisl sed risus duis eget vitae odio platea sed. Semper venenatis amet malesuada egestas ornare. In consequat risus id maecenas. Viverra id egestas blandit pretium sapien at egestas magna enim. Imperdiet nunc massa semper adipiscing aliquam posuere. Cras vivamus mauris odio odio arcu facilisis molestie. Neque adipiscing sit natoque id quis erat amet turpis. Feugiat sagittis erat sodales sed id id bibendum lacus blandit. Id nunc pellentesque diam nunc cursus odio id nisl. Eleifend ornare nisi dignissim id habitant in hendrerit arcu. Nulla at ac lacus sed. Sed pellentesque nisl id at
                    </p>
                </div>
            </div>
        </div>

    );
}
