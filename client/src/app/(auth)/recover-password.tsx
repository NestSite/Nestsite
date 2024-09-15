"use client";
import { Card } from "@/components/ui/card";
import { RecoverPasswordForm } from "./components/recover-password-form";
import Link from "next/link";
export default function RecoverPassword() {
	return (
		<>

				<div className="mx-auto flex w-full flex-col justify-center space-y-2 md:max-w-[470px] lg:p-8">
					
					<Card className="p-6 border-none rounded-xl">
						<div className="flex font-semibold flex-col text-left mb-6">
						<h1 className="text-md tracking-tight mb-3 text-gray-700">
								Remember your password? &nbsp;
								<Link href="/login" className="text-md font-medium text-primary">
                                    login
                                </Link>
							</h1>
							<h2 className="text-3xl -mt-4 text-gray-700">Password recovery</h2>
							
						</div>
						<RecoverPasswordForm />
					</Card>
				</div>

		</>
	);
}
