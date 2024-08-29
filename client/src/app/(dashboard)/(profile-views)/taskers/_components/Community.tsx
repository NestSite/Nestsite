"use client"
import Image from "next/image";
import { IconDotsVertical, IconEye, IconReport, IconTrash } from "@tabler/icons-react";
import AdminImg from "@/assets/admin-image.svg"
import CommunityViewDialog from "./CommunityView.dialog";

const Community = () => {
    const notif = [
        {
            title: 'Community offers',
            text: 'Hair Stylist ',
            date: 'Created on July 1st, 2024',
        },
        {
            title: 'Community offers',
            text: 'Hair Stylist ',
            date: 'Created on July 1st, 2024',
        },
        {
            title: 'Community offers',
            text: 'Hair Stylist ',
            date: 'Created on July 1st, 2024',
        },
        {
            title: 'Community offers',
            text: 'Hair Stylist ',
            date: 'Created on July 1st, 2024',
        },
        {
            title: 'Community offers',
            text: 'Hair Stylist ',
            date: 'Created on July 1st, 2024',
        },
        {
            title: 'Community offers',
            text: 'Hair Stylist ',
            date: 'Created on July 1st, 2024',
        },
    ]

  return (
    <>
        <div className="w-full p-6 py-6 bg-white rounded-lg">
            <h3 className="mb-5 text-base font-bold">Community Created (20)</h3> 
            <div className="flex flex-wrap items-center gap-5 mb-8 text-sm">
                <span className="p-1.5 px-5 text-white rounded-full bg-primary">Active</span>
                <span className="p-1.5 px-5 bg-gray-100 rounded-full">Deleted</span>
            </div>
            <div className="flex flex-col gap-6">
                {
                    notif?.map((el, index) => (
                        <div key={el.title + index} className="flex items-center justify-between gap-5">
                            <div className="flex flex-col w-full gap-2 lg:flex-col xl:flex-row sm:flex-row lg:items-start xl:items-center sm:items-center">
                                <Image src={AdminImg} alt='profile' className="relative rounded-full w-11 h-11 md:w-12 md:h-12" />
                                <div className="flex flex-col gap-0.5 text-xs text-[#424242]">
                                    <span className="text-base font-semibold text-[#212121]">{el.title}</span>
                                    <span className="font-normal text-gray-600">{el.text}</span>
                                    <span className="font-normal text-[10px] text-gray-400">{el.date}</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 text-xs xl:flex-row xl:items-center">
                            <CommunityViewDialog>
                                <div className="flex items-center gap-1.5 cursor-pointer">
                                    <span className="p-1 font-semibold bg-gray-100 rounded-full">
                                        <IconEye size={'1.3rem'} color="#51A993" />
                                    </span>
                                    <span>Views</span>
                                    <span className="text-white bg-[#51A993] p-0.5 px-1.5 font-semibold rounded-full">67</span>
                                </div>
                            </CommunityViewDialog>
                                <div className="flex items-center gap-1.5">
                                    <span className="p-1 font-semibold bg-gray-100 rounded-full">
                                        <IconReport size={'1.3rem'} color="#FFCC00" />
                                    </span>
                                    <span>Reports</span>
                                    <span className="text-white bg-[#1691B2] p-0.5 px-1.5 font-semibold rounded-full">9</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="p-1 font-semibold bg-[#FF17171A] rounded-full">
                                        <IconTrash size={'1.1rem'} color="#FF1717" />
                                    </span>
                                    <span>Delete</span>
                                </div>
                            </div>
                        </div>
                    )) 
                }
            </div>
        </div>
    </>
  )
}

export default Community