"use client";
import { Button } from "@/components/ui/button";
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
import React, { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { TextArea } from "@/components/ui/textarea";
import Review4Img from "@/assets/dp.svg"
import Chat1Img from "@/assets/chat1.svg"
import Chat2Img from "@/assets/chat2.svg"
import Image from "next/image";
import { IconDotsVertical, IconLocation, IconMicrophone, IconPhoto, IconReport, IconSend } from "@tabler/icons-react";


export default function CommunityViewDialog({
	children,
	onSuccess = () => { },
}: {
	children: ReactNode;
	onSuccess?: () => void;
}) {
	const [open, setOpen] = useState<boolean>(false);
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);
	const [title, setTitle] = useState("");
	const [tab, setTab] = useState<'Members' | 'Chat'>("Members");


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

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-[525px] md:max-w-[800px] max-h-[90dvh] overflow-auto text-gray-800">
				<DialogHeader className="flex flex-col gap-0.5 space-y-0 mb-3">
					<DialogTitle className="text-[1rem] leading-5">Community offers</DialogTitle>
					<div className="flex flex-col">
						<span className="text-[0.7rem] text-gray-700">Hair Stylist</span>
						<span className="text-[0.6rem] text-gray-400">Created on July 1st, 2024</span>
					</div>
				</DialogHeader>
				<div className="">
					<div className="flex flex-wrap items-center gap-5 text-xs mb-7 font-medium">
						<span onClick={() => setTab('Members')} className={`p-1.5 px-5 cursor-pointer rounded-full ${tab === 'Members' ? 'bg-primary text-white' : ' bg-gray-100'}`}>Members</span>
						<span onClick={() => setTab('Chat')} className={`p-1.5 px-5 cursor-pointer rounded-full ${tab === 'Chat' ? 'bg-primary text-white' : ' bg-gray-100'}`}>Community Chat</span>
					</div>
					{
						tab === "Members" &&
						<div className="flex flex-col gap-5 pb-8">
						{
							[...Array.from(Array(6).keys())].map(el => (
								<div key={el} className="flex flex-row justify-between w-full gap-5">
									<div className="flex gap-3">
										<Image src={Review4Img} alt='profile' className="relative w-10 h-10 rounded-full md:w-14 md:h-14" />
										<div className="flex flex-col gap-0.5 text-xs text-[#424242] max-w-md">
											<span className="text-[0.8rem] text-[#212121]">Sarah Wood</span>
											<div className="flex text-[0.6rem] items-center gap-2 font-normal text-gray-500">
												<IconLocation size={'0.7rem'} />
												<span>1861 Bayonne Ave, Manchester Township,</span>
											</div>
											<div className="flex items-center gap-2 font-normal text-gray-600 text-[0.7rem]">
												<IconReport size={'0.7rem'} />
												<span>Analytics</span>
												<span className="text-white text-[0.5rem] bg-primary px-1.5 font-semibold rounded-full">6</span>
											</div>
										</div>
									</div>
									<IconDotsVertical size={'1.3rem'} />
								</div>
							)) 
						}
						</div>
					}
					{
						tab === "Chat" && 
						<div className="h-full flex flex-col gap-2">
							<div className="min-h-[30vh] max-h-full overflow-auto">
								<div className="flex flex-col gap-5 pb-8">
									{
										[...Array.from(Array(9).keys())].map(el => (
											<div key={el} className="flex flex-row justify-between w-full gap-5">
												<div className="flex gap-3">
													<Image src={el % 2 === 0 ? Chat1Img : Chat2Img} alt='profile' className="relative w-7 h-7 rounded-full md:w-11 md:h-11" />
													<div className="flex flex-col gap-1 text-xs text-[#424242] max-w-xs">
														<span className="text-[0.8rem] text-primary font-medium"> {el % 2 === 0 ? 'Maureen Grace' : 'Fedrick David'}</span>
														<span className="text-[0.7rem] items-center gap-2 font-medium text-gray-900">Tailor</span>
														<p className="text-[0.7rem] bg-gray-100 rounded-md p-2 items-center gap-2 font-medium">{el % 2 === 0 ? 'Hello,  please provide further details. I am available to assist.' : 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita sit ea mollitia explicabo libero consectetur dolore obcaecati facilis excepturi eaque nostrum, maxime repellendus ad assumenda, distinctio praesentium accusamus velit suscipit? '}</p>
													</div>
												</div>
												<IconDotsVertical size={'1.3rem'} />
											</div>
										)) 
									}
								</div>
							</div>
							<div className="flex items-center gap-2 md:gap-4 w-full sticky -bottom-8 pb-8 z-10 bg-white left-0">
								<div className="relative w-full">
									<IconPhoto color="#BDBDBD" className="absolute left-3 top-1/2 -translate-y-1/2" />
									<Input
										id="message"
										name="message"
										placeholder="Post message about your task... "
										className="rounded-full bg-gray-100 p-5 py-6 pl-12 placeholder:text-[#BDBDBD]"
										value={title}
										onChange={(e) => handleChangeName(e.target.value)}
									/>
									<IconSend color="#1691B2" className="absolute right-6 top-1/2 -translate-y-1/2" />
								</div>
								<div className="p-4 rounded-full bg-primary">
									<IconMicrophone size={'1.2rem'} color="#ffffff" />
								</div>
							</div>
						</div>
					}
                </div>
			</DialogContent>
		</Dialog>
	);
}
