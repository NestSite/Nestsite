"use client"
import Image from "next/image";
import { IconDotsVertical, IconStar, IconStarFilled } from "@tabler/icons-react";
import ReferImg from "@/assets/refer.svg"

const Referrals = () => {
  return (
    <>
        <div className="w-full p-6 py-6 bg-white rounded-lg">
            <h3 className="mb-6 text-base font-bold">Referrals (5)</h3> 
            <div className="grid gap-6 xl:items-start xl:grid-cols-2">
                <div className="flex flex-col gap-6">
                    {
                        [...Array.from(Array(5).keys())].map(el => (
                            <div key={el} className="flex flex-row items-center w-full gap-1">
                                <Image src={ReferImg} alt='profile' className="relative rounded-full w-11 h-11 md:w-12 md:h-12" />
                                <div className="flex flex-col gap-0.5 text-xs text-[#424242] max-w-md">
                                    <span className="text-base font-semibold text-[#212121]">Taylor Bryan <span className="text-sm font-normal text-primary">{el%2==0 ? "Tasker" : "Seeker"}</span></span>
                                    <span className="font-normal text-gray-600">Unit 1 Brixton Angel Road, London SE1 3HE</span>
                                    <span className="font-normal text-gray-600 text-[10px]">5 days ago.</span>
                                </div>
                            </div>
                        )) 
                    }
                </div>
                <div className='flex flex-col items-center gap-2 p-2 border rounded-md'>
                    <span className="text-base font-bold">Referral Reward</span> 
                    <span className="text-3xl font-bold">£240</span> 
                    <span className="flex justify-center w-full gap-1 p-3 mt-3 text-xs font-semibold text-gray-600 bg-gray-100 rounded-md">Referral Code: <span className="text-primary"> Radiance434512ws</span></span>
                </div>
            </div>
        </div>
    </>
  )
}

export default Referrals