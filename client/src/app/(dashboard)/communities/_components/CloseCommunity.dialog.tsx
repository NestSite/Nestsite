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
import React, { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface IProps {
	children?: ReactNode;
	onSuccess?: () => void;
}

export default function CloseCommunityDialog({
	children,
	onSuccess = () => { },
}: IProps) {
	const router = useRouter();
    const [open, setOpen] = useState(false)

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
		<Dialog open={!!open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="max-w-[450px] max-h-[90dvh] overflow-auto text-gray-800">
				<DialogHeader>
					<DialogTitle className="flex justify-center text-center">Confirm Community Closure </DialogTitle>
				</DialogHeader>
				<form onSubmit={onSubmit} className="grid gap-4 py-4 gap-x-5">
                   <div className="text-sm text-center">
                        <p>Are you sure you want to permanently Close this <span className="text-primary">Hairstylist Community with 13days 30mins autoclose</span></p>
                   </div>
					<DialogFooter className="flex items-center justify-between gap-3 mt-3">
						<Button
                            className="text-xs font-semibold bg-white text-primary border border-primary w-full max-w-[200px]"
							type="button"
                            onClick={() => setOpen(false)}
                            variant={'outline'}
						>
							{isLoading
								? "No"
								: "No"}
						</Button>
						<Button
                            className="text-xs font-semibold w-full max-w-[200px] bg-destructive hover:bg-destructive/80"
							type="submit"
						>
							{isLoading
								? "Yes Close"
								: "Yes Close"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
