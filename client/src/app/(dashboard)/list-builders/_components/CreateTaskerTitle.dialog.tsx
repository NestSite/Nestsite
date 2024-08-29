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
import { Switch } from "@/components/ui/switch";

export default function CreateTaskerTitleDialog({
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
			<DialogContent className="sm:max-w-[525px] max-h-[90dvh] overflow-auto">
				<DialogHeader>
					<DialogTitle>Create Tasker Title  and add Specialities </DialogTitle>

				</DialogHeader>
				<form onSubmit={onSubmit} className="grid gap-4 py-4">
					<div className="flex flex-col gap-4">
						<Label htmlFor="title" className="">
							Tasker Title*
						</Label>
						<Input
							id="title"
							name="title"
							placeholder="Tasker Title"
							className="col-span-3"
							value={title}
							onChange={(e) => handleChangeName(e.target.value)}
						/>
					</div>

					<div className="flex flex-col gap-4">
						<Label htmlFor="title" className="">
							Tasker Family*
						</Label>
						<Input
							id="title"
							name="title"
							placeholder="Tasker Family"
							className="col-span-3"
							value={title}
							onChange={(e) => handleChangeName(e.target.value)}
						/>
					</div>

					<div className="flex flex-col gap-4">
						<Label htmlFor="title" className="">
							Family Description*
						</Label>
						<Input
							id="title"
							name="title"
							placeholder="Family Description"
							className="col-span-3"
							value={title}
							onChange={(e) => handleChangeName(e.target.value)}
						/>
					</div>

					<div className="flex flex-col gap-4">
						<Label htmlFor="title" className="">
							Tasker Specialties*
						</Label>
						<Input
							id="title"
							name="title"
							placeholder="Tasker Specialties"
							className="col-span-3"
							value={title}
							onChange={(e) => handleChangeName(e.target.value)}
						/>
					</div>

					<div className="flex items-center gap-2">
					<Switch />

						<Label htmlFor="title" className="">
							Status
						</Label>
					</div>

					<DialogFooter className="justify-center sm:justify-center items-center flex">
						<Button
							disabled={
								title.trim().length === 0 ||
								isLoading
							}
							type="submit"
							className="p-3 rounded w-full max-w-[280px] py-3.5 h-fit"
						>
							{isLoading
								? "Loading..."
								: "Save"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
