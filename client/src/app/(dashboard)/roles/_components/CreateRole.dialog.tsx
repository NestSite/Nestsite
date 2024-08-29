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
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


const formSchema = z.object({
	email: z
		.string()
		.min(1, { message: "Please enter your email" })
		.email({ message: "Invalid email address" }),
	password: z
		.string()
		.min(1, {
			message: "Please enter your password",
		})
		.min(7, {
			message: "Password must be at least 7 characters long",
		}),
});


export default function CreateRoleDialog({
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

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const handleChangeName = (value: string) => {
		setTitle(value);
	};

	async function onSubmit(data: z.infer<typeof formSchema>) {
		// setIsLoading(true);

		setIsLoading(false);
		router.refresh();
		setOpen(false);

	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-[825px] max-h-[90dvh] overflow-auto">
				<DialogHeader>
					<DialogTitle>Create Role </DialogTitle>

				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className="grid grid-cols-2 gap-4">

							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem className="space-y-1">
										<FormLabel className="font-semibold">Email Address</FormLabel>
										<FormControl>
											<Input placeholder="Enter Email" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/><FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem className="space-y-1">
										<FormLabel className="font-semibold">Email Address</FormLabel>
										<FormControl>
											<Input placeholder="Enter Email" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/><FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem className="space-y-1">
										<FormLabel className="font-semibold">Email Address</FormLabel>
										<FormControl>
											<Input placeholder="Enter Email" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/><FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem className="space-y-1">
										<FormLabel className="font-semibold">Email Address</FormLabel>
										<FormControl>
											<Input placeholder="Enter Email" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/><FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem className="space-y-1">
										<FormLabel className="font-semibold">Email Address</FormLabel>
										<FormControl>
											<Input placeholder="Enter Email" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/><FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem className="space-y-1">
										<FormLabel className="font-semibold">Email Address</FormLabel>
										<FormControl>
											<Input placeholder="Enter Email" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/><FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem className="space-y-1">
										<FormLabel className="font-semibold">Email Address</FormLabel>
										<FormControl>
											<Input placeholder="Enter Email" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
								<div>
								</div>
						<Button className="mt-2" disabled={isLoading}>
							Sign In
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
