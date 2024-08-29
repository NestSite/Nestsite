"use client"
import Image from "next/image";
import { IconDotsVertical, IconStar, IconStarFilled } from "@tabler/icons-react";
import Reveiew1Img from "@/assets/review1.svg"
import Reveiew2Img from "@/assets/review3.svg"
import Reveiew3Img from "@/assets/review4.svg"
import Reveiew4Img from "@/assets/dp.svg"

const Reviews = () => {
    const images = [Reveiew1Img, Reveiew2Img, Reveiew3Img, Reveiew4Img]
  return (
    <>
        <div className="w-full p-6 py-6 bg-white rounded-lg">
            <h3 className="mb-6 text-base font-bold">20 Reviews</h3> 
            <div className="flex flex-col gap-7">
                {
                    [...Array.from(Array(4).keys())].map(el => (
                        <div key={el} className="flex flex-row justify-between w-full gap-5">
                            <div className="flex gap-3">
                                <Image src={images[el]} alt='profile' className="relative w-10 h-10 rounded-full md:w-14 md:h-14" />
                                <div className="flex flex-col gap-0.5 text-xs text-[#424242] max-w-md">
                                    <span className="text-base font-semibold text-[#212121]">Christiana Maryjane</span>
                                    <div className="flex flex-wrap items-center gap-x-3">
                                        <div className="flex items-center gap-1">
                                            <IconStarFilled color="#FFD300" size={'0.7rem'} />
                                            <IconStarFilled color="#FFD300" size={'0.7rem'} />
                                            <IconStarFilled color="#FFD300" size={'0.7rem'} />
                                            <IconStarFilled color="#FFD300" size={'0.7rem'} />
                                            <IconStar size={'0.7rem'} />
                                        </div>
                                        <span className="whitespace-nowrap">June 20, 2024 <span className="font-bold text-primary">{el < 1 ? 'Given' : 'Received'}</span></span>
                                    </div>
                                    <p className="mt-2 font-normal text-gray-600">Lorem ipsum dolor sit amet consectetur. Tristique sed quisque aliquet urna mattis sed velit. Massa accumsan amet odio semper maecenas egestas massa ac.</p>
                                </div>
                            </div>
                            <IconDotsVertical size={'1.3rem'} />
                        </div>
                    )) 
                }
            </div>
        </div>
    </>
  )
}

export default Reviews