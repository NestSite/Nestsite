"use client";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { useRouter } from "next/navigation";
import BoookingImg from "@/assets/booking-man.svg"
import Image from "next/image";
import { DatePicker } from "@/components/ui/date-picker";
import Photo2 from "@/assets/photo2.png"
import { X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Icons } from "@/components/icons";
import { IconBriefcase, IconCash, IconClock, IconFriends, IconLocation, IconLocationHeart, IconLocationSearch, IconMessage, IconPictureInPicture, IconStarFilled, IconWorld } from "@tabler/icons-react";


export default function ViewBookingDialog({
	children,
	onSuccess = () => { },
    id,
    setId,
}: {
	children?: ReactNode;
	onSuccess?: () => void;
    id: string;
    setId: React.Dispatch<React.SetStateAction<string>>
}) {
	const [open, setOpen] = useState<boolean>(false);
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);
	const [title, setTitle] = useState("");

    useEffect(() => {
        if (id) {
            setOpen(true)
        } else {
            setOpen(false)
        }
    }, [id])



	const handleChangeName = (value: string) => {
		setTitle(value);
	};

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// setIsLoading(true);

		setIsLoading(false);
		router.refresh();
		setOpen(false);
	};

    const handleOpen = (val: boolean) => {
        if (val === false) {
            setId('')
            return setOpen(val)
        }
        return setOpen(val)
    }

	return (
		<Dialog open={open} onOpenChange={handleOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-[525px] md:max-w-[800px] max-h-[90dvh] overflow-auto text-gray-800">
				<DialogHeader>
					<DialogTitle></DialogTitle>
				</DialogHeader>
                <div className="mt-9 flex flex-col gap-6">
                    <div className="bg-[#1691B21A] rounded-md text-primary font-bold p-4 rounded-sm">Active</div>
                    <div className="flex gap-1.5 text-xs text-[#616161]">
                        <Image src={BoookingImg} alt='Profile' className="w-full max-w-28" />
                        <div className="flex-1 flex flex-col gap-2">
                            <div className="flex items-center gap-4 justify-between">
                                <h3 className="text-base text-[#424242] font-bold">Radiance Ct</h3>
                                <span className="text-sm text-primary font-bold">£20.00/hr</span>
                            </div>
                            <div className="flex items-center gap-0.5">
                                <IconFriends color="#BDBDBD" size={'1rem'} />
                                <span>Tailor</span>
                                <IconStarFilled color="#FFD300" size={'1rem'} />
                                <span>4.6 Rating</span>
                            </div>
                            <div className="flex items-center gap-0.5">
                                <IconClock color="#BDBDBD" size={'1rem'} />
                                <span>4.6</span>
                                <span>2hr minimum required</span>
                            </div>
                            <div className="flex items-center gap-0.5">
                                <IconBriefcase color="#BDBDBD" size={'1rem'} />
                                <span>4.6</span>
                                <span>My Tools : Hammer, Sowing Machine, Thread, Iron</span>
                            </div>
                            <div className="flex items-center gap-0.5">
                                <IconLocationHeart color="#BDBDBD" size={'1rem'} />
                                <span>4.6</span>
                                <span>0.5miles away from  Seeker</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center justify-center cursor-pointer p-2 rounded-md text-primary bg-primary-light">
                                    <IconMessage size={'1rem'} />
                                </div>
                                <div className="flex items-center justify-center cursor-pointer p-2 rounded-md  text-pending bg-pending-light">
                                    <IconFriends size={'1rem'} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-end gap-8 md:gap-14 relative">
                        <div className="flex flex-col gap-2 w-full">
                            <Label>Tasker&apos;s Available Dates</Label>
                            <DatePicker placeholder='Dec 16' className="w-full text-sm" />
                        </div>
                        <div className="absolute left-1/2 bottom-3 -translate-x-1/2">
                            <Icons.pointer />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <Label>Tasker&apos;s  Time Slots</Label>
                            <DatePicker placeholder='14:00 - 16:00' className="w-full text-sm" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <Label className="font-bold italic">Or propose when you need this Task done</Label>
                        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                            <DatePicker placeholder='On Jun 16' className="w-full text-sm" />
                            <DatePicker placeholder='Before date' className="w-full text-sm" />
                            <DatePicker placeholder='I am Flexible' className="w-full text-sm" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex items-center gap-2">
                            <Checkbox />
                            <span className="text-sm font-medium">I need a certain time of the day</span>
                        </div>
                        <div className="flex gap-4 md:gap-8 flex-wrap">
                            <div className="text-[#010D0A99] flex flex-col gap-0.5 items-center text-center border rounded-lg p-3 border-black/40">
                                <Icons.morning />
                                <span className="text-sm font-bold">Morning</span>
                                <span className="text-[10px] font-medium">(5:00am - 11:59am)</span>
                            </div>
                            <div className="text-[#010D0A99] flex flex-col gap-0.5 items-center text-center border rounded-lg p-3 border-black/40">
                                <Icons.afternoon />
                                <span className="text-sm font-bold">Afternoon</span>
                                <span className="text-[10px] font-medium">(12:00pm - 5:59pm)</span>
                            </div>
                            <div className="text-[#010D0A99] flex flex-col gap-0.5 items-center text-center border rounded-lg p-3 border-black/40">
                                <Icons.evening />
                                <span className="text-sm font-bold">Evening</span>
                                <span className="text-[10px] font-medium">(6:00pm - 11:59pm)</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <Label>Where will this Task take place?*</Label>
                        <Input
                            className="w-full" 
                            placeholder="Provide the precise address for this task "
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <Label>Do you have/will provide basic tools for this Task?*</Label>
                        <Input
                            className="w-full" 
                            placeholder="Yes"
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <Label>Any requirements (optional)</Label>
                        <Input
                            className="w-full" 
                            placeholder="Enter details..."
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <Label>Upload photo related to the task (optional)</Label>
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="rounded-md aspect-[12/10] relative group">
                                <Image src={Photo2} alt='profile' className="w-full h-full" />
                                <X color="white" size={'1rem'} className="absolute top-0 p-1 rounded-full cursor-pointer -right-2 bg-black/40" />
                            </div>
                            <div className="rounded-md aspect-[12/10] relative group">
                                <Image src={Photo2} alt='profile' className="w-full h-full" />
                                <X color="white" size={'1rem'} className="absolute top-0 p-1 rounded-full cursor-pointer -right-2 bg-black/40" />
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="flex flex-col gap-2 w-fit">
                            <Label>What is your budget?*</Label>
                            <Input
                                className="w-full" 
                                placeholder="£ 100"
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-fit">
                            <Label>Payment term?*</Label>
                            <Input
                                className="w-full" 
                                placeholder="Per Hour"
                            />
                        </div>
                    </div>
                </div>
			</DialogContent>
		</Dialog>
	);
}
