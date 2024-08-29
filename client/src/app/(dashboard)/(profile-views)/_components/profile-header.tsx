"use client"
import { Button } from "@/components/ui/button";
import ProfileImg from "@/assets/dp.svg"
import Image from "next/image";
import { IconClearAll, IconEdit, IconMail, IconMessage, IconPointFilled, IconTrash, IconX } from "@tabler/icons-react";
import EditTaskersProfileDialog from "../taskers/_components/EditTaskersProfile.dialog";


export default function ProfileHeader() {
    return (
        <div className="flex col-span-1 md:col-span-5 xl:col-span-6 flex-col items-center justify-between w-full gap-4 p-4 py-6 bg-white lg:flex-row md:py-5 md:px-7">
        <div className="flex items-center gap-3">
            <div className="relative rounded-full w-14 h-14 md:w-20 md:h-20">
                <Image src={ProfileImg} alt='profile' className="w-full h-full" />
                <IconPointFilled color="#4AAF57" className="absolute bottom-0 right-0" />
            </div>
            <div className="flex flex-col gap-0.5 text-xs text-[#424242]">
                <span className="text-base font-bold text-[#212121]">Amanda Lucas</span>
                <span className="font-medium">User ID : WV74-345 </span>
                <span className="font-normal text-gray-600">Date joined : 21st June, 2024</span>
                <p className="font-normal text-gray-600">Current hourly rate; <span className="font-medium text-primary">£20.30</span></p>
            </div>
        </div>
        <div className="flex flex-col items-center w-full gap-3 lg:flex-row md:w-auto gap-y-4">
            <Button className="flex items-center gap-3 px-5 py-5 font-normal bg-grad-to-right">
                <IconMail size={'1.1rem'} />
                Send Email
            </Button>
            <div className="flex items-center gap-3">
                <div className="flex items-center justify-center cursor-pointer p-3 rounded-full text-primary bg-primary-light">
                    <IconMessage size={'1.1rem'} />
                </div>
                <EditTaskersProfileDialog>
                    <div className="flex items-center justify-center cursor-pointer p-3 rounded-full text-pending bg-pending-light">
                        <IconEdit size={'1.1rem'} />
                    </div>
                </EditTaskersProfileDialog>
                <div className="flex items-center justify-center cursor-pointer p-3 rounded-full text-destructive bg-destructive-lighter">
                    <IconTrash size={'1.1rem'} />
                </div>
                <div className="flex items-center justify-center cursor-pointer p-3 rounded-full text-destructive bg-destructive-light">
                    <IconClearAll size={'1.1rem'} />
                </div>
            </div>
        </div>
    </div>
    )
}