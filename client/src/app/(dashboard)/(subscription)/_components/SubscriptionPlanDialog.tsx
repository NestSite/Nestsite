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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function SubscriptionPlanDialog({
	children,
	title,
	onSuccess = () => { },
}: {
	title: string
	children: ReactNode;
	onSuccess?: () => void;
}) {
	const [open, setOpen] = useState<boolean>(false);
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);
	const [planUSer, setPlanUser] = useState("");
	const [planCost, setPlanCost] = useState("");
	const [planValidity, setPlanValidity] = useState("");



	const handleChangeName = (value: string) => {
		setPlanCost(value);
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
					<DialogTitle>{title}</DialogTitle>

				</DialogHeader>
				<form onSubmit={onSubmit} className="grid gap-4 py-4">
					<div className="grid gap-4 md:grid-cols-2">
						<div className="flex flex-col gap-4">
							<Label htmlFor="title" className="">
								Plan User
							</Label>
							<Select>
								<SelectTrigger className="w-full h-full py-3">
									<SelectValue placeholder="Select Status" className="placeholder:text-muted" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>User</SelectLabel>
										<SelectItem value="apple">User</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						<div className="flex flex-col gap-4">
							<Label htmlFor="title" className="">
								Plan Cost
							</Label>
							<Input
								id="cost"
								name="cost"
								type="number"
								placeholder="$"
								className="col-span-3"
								value={planCost}
								onChange={(e) => handleChangeName(e.target.value)}
							/>
						</div>
						<div className="flex flex-col gap-4">
							<Label htmlFor="title" className="">
								Tasker Title*
							</Label>
							<Select>
								<SelectTrigger className="w-full h-full py-3">
									<SelectValue placeholder="Select Status" className="placeholder:text-muted" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>User</SelectLabel>
										<SelectItem value="apple">User</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
					</div>

					<div className="flex">
						<div className="flex flex-col gap-4">
							<Label htmlFor="title" className="">
								Status
							</Label>
							<Switch
								id="status"
							/>
						</div>
					</div>

					<DialogFooter className="justify-center sm:justify-center items-center flex">
						<Button
							className="w-full md:w-1/2"
							disabled={
								title.trim().length === 0 ||
								isLoading
							}
							type="submit"
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
