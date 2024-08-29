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

export default function EditDialog({
	title,
	children,
	onSuccess = () => { },
}: {
	title: string;
	children: ReactNode;
	onSuccess?: () => void;
}) {
	const [open, setOpen] = useState<boolean>(false);
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);
	const [details, setDetails] = useState("");


	const handleChangeName = (value: string) => {
		setDetails(value);
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
					<DialogTitle>Edit {title}</DialogTitle>

				</DialogHeader>
				<form onSubmit={onSubmit} className="grid gap-4 py-4">
					<div className="flex flex-col gap-4">
						<Label htmlFor="title" className="">
							Page Title*
						</Label>
						<Input
							id="title"
							name="title"
							disabled
							className="col-span-3"
							value={title}
						/>
					</div>
					<div className="flex flex-col gap-4">
						<Label htmlFor="title" className="">
							Page Details*
						</Label>
						<TextArea
							id="details"
							name="details"
							className="col-span-3 min-h-56"
							value={details}
							onChange={(e) => handleChangeName(e.target.value)}
						/>
					</div>


					<DialogFooter className="justify-center sm:justify-center items-center flex">
						<Button
							disabled={
								title.trim().length === 0 ||
								isLoading
							}
							type="submit"
						>
							{isLoading
								? "Loading..."
								: "Update"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
