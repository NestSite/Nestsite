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
import { TextArea } from "@/components/ui/textarea";

export default function EditFaqDialog({
	children,
	onSuccess = () => { },
	open,
	setOpen,
}: {

	children?: ReactNode;
	onSuccess?: () => void;
    open: string;
    setOpen: React.Dispatch<React.SetStateAction<string>>
}) {
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
		setOpen('');

	};

	return (
		<Dialog open={!!open} onOpenChange={(value) => value===false && setOpen('')}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-[525px] max-h-[90dvh] overflow-auto">
				<DialogHeader>
					<DialogTitle>Edit  FAQ Page</DialogTitle>

				</DialogHeader>
				<form onSubmit={onSubmit} className="grid gap-4 py-4">
					<div className="flex flex-col gap-4">
						<Label htmlFor="title" className="">
							Page Title
						</Label>
						<Input
							id="title"
							name="title"
							className="col-span-3"
							value={title}
                            placeholder="How to get verified with Waveserve."
							onChange={(e) => handleChangeName(e.target.value)}
						/>
					</div>

					<div className="flex flex-col gap-4">
						<Label htmlFor="title" className="">
							Page Details
						</Label>
						<TextArea
							id="title"
							name="title"
							className="col-span-3"
							rows={6}
							value={title}
							onChange={(e) => handleChangeName(e.target.value)}
						/>
					</div>

					<div className="flex flex-col gap-1">
						<Label htmlFor="title" className="">
							Status
						</Label>
						<Switch />
					</div>

					<DialogFooter className="justify-center sm:justify-center items-center flex">
						<Button
							// disabled={
							// 	title.trim().length === 0 ||
							// 	isLoading
							// }
							type="submit"
							className="p-3 w-full max-w-[280px] py-3.5 rounded-md"
						>
							{isLoading
								? "Loading..."
								: "Create"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
