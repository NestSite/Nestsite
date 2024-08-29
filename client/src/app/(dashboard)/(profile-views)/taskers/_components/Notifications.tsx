"use client"
import Image from "next/image";
import { IconDotsVertical, IconTrash } from "@tabler/icons-react";
import ReferImg from "@/assets/refer.svg"
import AdminImg from "@/assets/admin-image.svg"

const Notifications = () => {
    const notif = [
        {
            title: 'Message From Admin',
            day: 'Today',
            image: AdminImg,
        },
        {
            title: 'Booking Appointment',
            day: 'Yesterday',
            image: ReferImg,
        },
        {
            title: 'New Message Alert',
            day: 'Yesterday',
            image: AdminImg,
        },
        {
            title: 'Booking from sara cancelled ',
            day: '03/09/2024',
            image: ReferImg,
        },
    ]

  return (
    <>
        <div className="w-full p-6 py-6 bg-white rounded-lg">
            <h3 className="mb-5 text-base font-bold">Notification</h3> 
            <div className="flex flex-wrap items-center justify-between gap-5 mb-8 text-sm">
                <div className="flex flex-wrap items-center gap-5 text-sm">
                    <span className="p-1.5 px-5 text-white rounded-full bg-primary">All</span>
                    <span className="p-1.5 px-5 bg-gray-100 rounded-full">Read</span>
                    <span className="p-1.5 px-5 bg-gray-100 rounded-full">Unread</span>
                </div>
                <span className="p-1.5 px-5 bg-[#F755551A] rounded-full flex items-center gap-2 text-[#F75555]">
                    Delete All
                    <IconTrash color="#F75555" size={'1.1rem'} />
                </span>
            </div>
            <div className="flex flex-col gap-6">
                {
                    notif?.map(el => (
                        <div key={el.title} className="flex items-center w-full gap-1">
                            <Image src={el.image} alt='profile' className="relative rounded-full w-11 h-11 md:w-12 md:h-12" />
                            <div className="flex flex-col gap-0.5 text-xs text-[#424242]">
                                <div className="flex items-center justify-between gap-5">
                                    <span className="text-base font-semibold text-[#212121]">{el.title} <span className="text-xs font-normal text-primary">{el.day}</span></span>
                                    <IconDotsVertical size={'1.3rem'} />
                                </div>
                                <span className="font-normal text-gray-600">Lorem ipsum dolor sit amet consectetur. Dignissim orci a id in curabitur ut. Odio sed at habitasse sed nussa consectetur praesent tellus pellentesque </span>
                            </div>
                        </div>
                    )) 
                }
            </div>
        </div>
    </>
  )
}

export default Notifications