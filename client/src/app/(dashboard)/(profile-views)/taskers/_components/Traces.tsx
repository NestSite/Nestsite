"use client"
import Image from "next/image";
import { IconDotsVertical, IconLocation, IconMailOpened } from "@tabler/icons-react";
import AdminImg from "@/assets/admin-image.svg"

const Traces = () => {
    const notif = [
        {
            title: 'New location Detected ',
            day: 'Today - 00:00',
            image: AdminImg,
        },
        {
            title: 'New location Detected ',
            day: 'Today - 00:00',
            image: AdminImg,
        },
        {
            title: 'New location Detected ',
            day: 'Today - 00:00',
            image: AdminImg,
        },
        {
            title: 'New location Detected ',
            day: 'Yesterday - 14:00',
            image: AdminImg,
        },
        {
            title: 'New location Detected ',
            day: '20/06/2024 - 14:00',
            image: AdminImg,
        },
    ]

  return (
    <>
        <div className="w-full p-6 py-6 bg-white rounded-lg">
            <h3 className="mb-5 text-base font-bold">Locations Traces</h3> 
            <div className="flex flex-col gap-6">
                {
                    notif?.map((el, index) => (
                        <div key={el.title + index} className="flex justify-between gap-6">
                            <div className="flex flex-col w-full gap-2 sm:flex-row sm:items-center">
                                <Image src={el.image} alt='profile' className="relative rounded-full w-11 h-11 md:w-12 md:h-12" />
                                <div className="flex flex-col gap-0.5 text-xs text-[#424242]">
                                    <span className="text-base font-semibold text-[#212121] flex items-center gap-2">{el.title}<span className="text-xs font-semibold text-primary">{el.day}</span></span>
                                    <span className="font-normal text-gray-600">1861 Bayonne Ave, Manchester , London </span>
                                </div>
                            </div>
                            <IconLocation color="#1691B2" size={'1.3rem'} />
                        </div>
                    )) 
                }
            </div>
        </div>
    </>
  )
}

export default Traces