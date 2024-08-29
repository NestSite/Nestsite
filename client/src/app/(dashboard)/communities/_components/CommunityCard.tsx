

import { Button } from "@/components/ui/button";
import MemberCard from "./MemberCard";
import { CircleAlert, Delete, Eye, PanelLeftOpen, PanelLeftOpenIcon, Trash2 } from "lucide-react";
import Image from "next/image";
import girlImg from "@/assets/frame.png"
import { useState } from "react";
import { cn } from "@/lib/utils";
import CloseCommunityDialog from "./CloseCommunity.dialog";

const CommunityCardHeader = () => {
    return (
        <div className="flex flex-col flex-wrap items-center justify-between w-full pb-1 border-b border-gray-300 lg:flex-row">
                <div className="flex flex-col items-center justify-center gap-1 lg:items-start">
                    <div className="flex flex-col items-center justify-center gap-2 lg:flex-row">
                        <h2 className="text-lg font-semibold">Hairstylist Community</h2>
                        <p className="hidden lg:block">|</p>
                        <div className="flex items-center gap-2 text-sm">
                            <Image src={girlImg} alt='profile' className="rounded-full w-7 h-7" />
                            <p className="">Created by Laura James</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm">
                        <h2 className="">Time Remaining</h2>
                        <p className="font-bold text-primary">13days : 30ms</p>
                    </div>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-x-3 lg:gap-x-3">
                    <Button variant={"ghost"} className="flex items-center gap-2 p-1 py-0 text-xs md:gap-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary">
                            <Eye size={16} color="#51A993" />
                        </span>
                        <span>View</span>
                        <span className="flex text-[10px] bg-[#51A993] items-center justify-center text-white font-bold h-5 px-2 rounded-full">67</span>
                    </Button>
                    <Button variant={"ghost"} className="flex items-center gap-2 p-1 py-0 text-xs md:gap-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary">
                            <CircleAlert size={16} color="#FFCC00" />
                        </span>
                        <span>Report</span>
                        <span className="flex text-[10px] bg-primary items-center justify-center text-white font-bold h-5 px-2 rounded-full">9</span>
                    </Button>
                    <CloseCommunityDialog>
                        <Button variant={"ghost"} className="flex items-center gap-2 p-1 py-0 text-xs md:gap-2">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-destructive-foreground">
                                <Trash2 size={16} color="#FF1717" />
                            </span>
                            <span>Delete</span>
                        </Button>
                    </CloseCommunityDialog>
                </div>
            </div>
    )
}
const CommunityCard = () => {
    const [isCollapsed, setIsCollapsed] = useState(false)
    return (
        <div className="flex flex-col w-full gap-6 p-6 text-black bg-white rounded-md">
            <CommunityCardHeader/>
            <div className="relative flex flex-col w-full gap-y-5 xl:flex-row">
                <div className={cn("flex h-full xl:w-1/3 flex-col gap-6 pr-2 xl:border-r border-gray-300 overflow-hidden bg-white transition-all")}>
                    <div className="flex items-center justify-between w-full">
                        <h2 className="font-bold">Members</h2>
                        <div className="bg-white flex-1 min-w-[100px]">
                            <Button size={"icon"} variant={"ghost"} onClick={() => setIsCollapsed((prev) => !prev)}>
                                <PanelLeftOpenIcon size={18} className="text-black/80"/>
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <MemberCard />
                        <MemberCard />
                        <MemberCard />
                    </div>
                    <Button className="font-bold w-fit">Close Community</Button>
                </div>
                <div className="flex flex-col gap-6 xl:pl-6 xl:w-2/3 max-h-96 xl:max-h-full">
                    <h2 className="font-bold">Community Chat</h2>
                    <div className="flex flex-col gap-5 overflow-y-auto">
                        <div className="flex gap-2">
                            <Image src={girlImg} alt='profile' className="rounded-full w-7 h-7" />
                            <p className="p-1.5 text-sm bg-[#FAFAFA] rounded-md">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo nemo repellendus laboriosam expedita sed quae dignissimos, animi rem facilis veritatis perspiciatis commodi magni consequuntur eum a veniam labore iste maxime.
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Image src={girlImg} alt='profile' className="rounded-full w-7 h-7" />
                            <p className="p-1.5 text-sm bg-[#FAFAFA] rounded-md">
                            Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CommunityCard