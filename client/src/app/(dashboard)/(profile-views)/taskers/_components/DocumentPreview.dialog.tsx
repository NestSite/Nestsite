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
import Image from "next/image";
import { IconTrash } from "@tabler/icons-react";
import Photo2 from "@/assets/photo2.png"

interface IProps {
	children?: ReactNode;
	onSuccess?: () => void;
	open: string;
	setOpen: (a: string) => void;
}

export default function DocumentPreviewDialog({
	children,
	onSuccess = () => { },
	open,
	setOpen,
}: IProps) {
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
		<Dialog open={!!open} onOpenChange={(value) => setOpen(value ? 'fdfd' : '')}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-[525px] max-h-[90dvh] overflow-auto text-gray-800">
				<DialogHeader>
					<DialogTitle>Document preview</DialogTitle>
				</DialogHeader>
				<form onSubmit={onSubmit} className="grid gap-4 py-4 gap-x-5">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="firstname" className="">
                            Document Type
                        </Label>
                        <Input
                            id="firstname"
                            name="firstname"
                            placeholder="Valid ID"
                            className=""
                            disabled
                            value={title}
                            onChange={(e) => handleChangeName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="title" className="text-sm">File Uploaded</label>
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="rounded-md aspect-[12/10] relative group">
                                <Image src={Photo2} alt='profile' className="w-full h-full" />
                                <IconTrash color="white" size={'1rem'} className="absolute top-0 p-1 rounded-full cursor-pointer -right-2 bg-black/40" />
                            </div>
                            <div className="rounded-md aspect-[12/10] relative group">
                                <Image src={Photo2} alt='profile' className="w-full h-full" />
                                <IconTrash color="white" size={'1rem'} className="absolute top-0 p-1 rounded-full cursor-pointer -right-2 bg-black/40" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="title" className="text-sm">Expiry Date</label>
                        <Input
                            id="firstname"
                            name="firstname"
                            placeholder="Valid ID"
                            className=""
                            type='date'
                            disabled
                            value={title}
                            onChange={(e) => handleChangeName(e.target.value)}
                        />
                    </div>
					<DialogFooter className="flex items-center justify-end mt-3">
						<Button
							// disabled={
							// 	title.trim().length === 0 ||
							// 	isLoading
							// }
                            className="text-xs font-semibold w-full max-w-[200px]"
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
