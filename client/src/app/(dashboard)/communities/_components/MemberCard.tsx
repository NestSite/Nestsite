import { IconLocationPin } from '@tabler/icons-react'
import { EllipsisVertical, MapPinIcon, OctagonAlert } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import girlImg from "@/assets/frame.png"


const MemberCard = () => {
    return (
            <div className="flex gap-2 min-w-[250px]">
                <Image src={girlImg} alt='profile' className="flex h-[40px] min-w-[40px] rounded-full bg-muted" />
                <div className="flex flex-col flex-1 gap-1">
                    <p>Sarah Wood</p>
                    <p className="flex items-center gap-1 text-xs text-[#757575]">
                        <MapPinIcon size={15} />
                        1861 Bayonne Ave, Manchester Township,</p>
                    <div className="flex text-sm gap-2 text-[#757575] items-center">
                        <OctagonAlert size={15} />
                        <span>Report</span>
                        <span className="flex text-[10px] bg-primary items-center justify-center text-white font-bold h-5 px-2 rounded-full">9</span>
                    </div>
                </div>
                <EllipsisVertical />
            </div>
    )
}

export default MemberCard