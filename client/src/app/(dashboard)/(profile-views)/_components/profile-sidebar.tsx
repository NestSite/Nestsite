"use client"
import Photo1 from "@/assets/photo1.png"
import Photo2 from "@/assets/photo2.png"
import Image from "next/image";
import { IconCalendar, IconEdit, IconGenderDemiboy, IconLocation, IconMail, IconPhone, IconTrash } from "@tabler/icons-react";
import EditTaskersProfileDialog from "../taskers/_components/EditTaskersProfile.dialog";

export default function ProfileSidebar() {
    return (
        <div className="w-full p-6 py-6 bg-white rounded-lg">
        <div className="pb-4 mb-4 border-b">
            <div className="flex items-center justify-between gap-4 mb-5">
                <h4 className="text-base font-semibold">Basic Information</h4>
                <EditTaskersProfileDialog>
                    <div className="flex items-center justify-center p-2.5 bg-gray-100 rounded-full cursor-pointer text-primary">
                        <IconEdit size={'1rem'} />
                    </div>
                </EditTaskersProfileDialog>
            </div>
            <div className="flex flex-col gap-4 text-sm text-gray-700">
                <p className="flex items-center gap-2"><IconPhone color="gray" size={'1.2rem'} /><span>+14 785 4567 564</span></p>
                <p className="flex items-center gap-2"><IconMail color="gray" size={'1.2rem'} /><span>amandalucas@gmail.com</span></p>
                <p className="flex items-center gap-2"><IconCalendar color="gray" size={'1.2rem'} /><span>7 Nov, 1996</span></p>
                <p className="flex items-center gap-2"><IconGenderDemiboy color="gray" size={'1.2rem'} /><span>Female</span></p>
                <p className="flex items-center gap-2"><IconLocation color="gray" size={'1.2rem'} /><span>1861 Bayonne Ave, Manchester Township,</span></p>
            </div>
        </div>
        <div className="pb-4 mb-4 border-b">
            <h4 className="mb-5 text-base font-semibold">About</h4>
            <p className="text-sm text-gray-700">Lorem ipsum dolor sit amet consectetur. Tristique sed quisque aliquet urna mattis sed velit. Massa accumsan amet odio semper maecenas egestas massa ac.</p>
        </div>
        <div className="pb-4 mb-4 border-b">
            <div className="flex items-center justify-between gap-4 mb-5">
                <h4 className="text-base font-semibold">Other Information</h4>
            </div>
            <div className="flex flex-col gap-4 text-sm font-medium text-gray-900">
                <p className="flex items-center justify-between gap-2"><span>Languages Spoken</span><span>English , French</span></p>
                <p className="flex items-center justify-between gap-2"><span>Gender Served</span><span>No Preference</span></p>
                <p className="flex items-center justify-between gap-2"><span>Drives</span><span>Yes</span></p>
                <p className="flex items-center justify-between gap-2"><span>City</span><span>Lorem</span></p>
                <p className="flex items-center justify-between gap-2"><span>Profession</span><span>Teacher</span></p>
                <p className="flex items-center justify-between gap-2"><span>Country</span><span>United Kingdom</span></p>
                <p className="flex items-center justify-between gap-2"><span>Province /State</span><span>Manchester </span></p>
                <p className="flex items-center justify-between gap-2"><span>Address</span><span>1861 Bayonne Ave, Manchester , </span></p>
                <p className="flex items-center justify-between gap-2"><span>Postal Code/Zip Code</span><span>21345 </span></p>
            </div>
        </div>
        <div className="pb-4 mb-4">
            <h4 className="mb-5 text-base font-semibold">Photos</h4>
            <div className="grid grid-cols-3 gap-4">
                <div className="rounded-md aspect-[12/10] relative group">
                    <Image src={Photo2} alt='profile' className="w-full h-full" />
                    <span className="absolute top-0 left-0 hidden w-full h-full group-hover:grid place-items-center bg-black/20">
                        <IconTrash color="white" size={'1rem'} className="cursor-pointer" />
                    </span>
                </div>
                <div className="rounded-md aspect-[12/10] relative group">
                    <Image src={Photo1} alt='profile' className="w-full h-full" />
                    <span className="absolute top-0 left-0 hidden w-full h-full group-hover:grid place-items-center bg-black/20">
                        <IconTrash color="white" size={'1rem'} className="cursor-pointer" />
                    </span>
                </div>
                <div className="rounded-md aspect-[12/10] relative group">
                    <Image src={Photo2} alt='profile' className="w-full h-full" />
                    <span className="absolute top-0 left-0 hidden w-full h-full group-hover:grid place-items-center bg-black/20">
                        <IconTrash color="white" size={'1rem'} className="cursor-pointer" />
                    </span>
                </div>
            </div>
        </div>
    </div>
    )
}