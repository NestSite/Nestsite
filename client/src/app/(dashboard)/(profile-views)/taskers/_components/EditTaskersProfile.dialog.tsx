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

export default function EditTaskersProfileDialog({
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
				<DialogHeader>
					<DialogTitle>Edit Profile infomation</DialogTitle>
				</DialogHeader>
				<form onSubmit={onSubmit} className="grid gap-4 gap-x-5 py-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="firstname" className="">
                                First Name
                            </Label>
                            <Input
                                id="firstname"
                                name="firstname"
                                placeholder="John"
                                className=""
                                value={title}
                                onChange={(e) => handleChangeName(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="lastname" className="">
                                Last Name
                            </Label>
                            <Input
                                id="lastname"
                                name="lastname"
                                placeholder="Maxwell"
                                className=""
                                value={title}
                                onChange={(e) => handleChangeName(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="title" className="">
                                Phone Number
                            </Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="John"
                                className=""
                                value={title}
                                onChange={(e) => handleChangeName(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email" className="">
                                Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                placeholder="John@gmail.com"
                                className=""
                                value={title}
                                onChange={(e) => handleChangeName(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="title" className="">
                                Date of Birth
                            </Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="John"
                                className=""
                                value={title}
                                onChange={(e) => handleChangeName(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="title" className="">
                                Languages Spoken
                            </Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="John"
                                className=""
                                value={title}
                                onChange={(e) => handleChangeName(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="title" className="">
                                Country
                            </Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="John"
                                className=""
                                value={title}
                                onChange={(e) => handleChangeName(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="title" className="">
                                Province/State
                            </Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="John"
                                className=""
                                value={title}
                                onChange={(e) => handleChangeName(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="title" className="">
                                City
                            </Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="John"
                                className=""
                                value={title}
                                onChange={(e) => handleChangeName(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="title" className="">
                                Address
                            </Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="John"
                                className=""
                                value={title}
                                onChange={(e) => handleChangeName(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="title" className="">
                                Postal Code / Zip Code
                            </Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="John"
                                className=""
                                value={title}
                                onChange={(e) => handleChangeName(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="title" className="">
                                Profession
                            </Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="John"
                                className=""
                                value={title}
                                onChange={(e) => handleChangeName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="about" className="">
                            About
                        </Label>
                        <TextArea
                            id="about"
                            name="about"
                            placeholder="Details about the user "
                            className=""
                            rows={5}
                            cols={5}
                            value={title}
                            onChange={(e) => handleChangeName(e.target.value)}
                        />
                    </div>
					<DialogFooter className="justify-center sm:justify-center items-center flex">
						<Button
							// disabled={
							// 	title.trim().length === 0 ||
							// 	isLoading
							// }
                            className="text-xs font-semibold w-full max-w-[250px]"
							type="submit"
						>
							{isLoading
								? "Updating..."
								: "Update Change"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
