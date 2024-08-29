"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store"; 
import { clearAuthData } from "@/store/slices/authSlices";
import NotificationsDropdown from "./notifications-dropdown";
import { deleteCookie } from "cookies-next";
export function UserNav() {
	const router = useRouter();
	const dispatch = useDispatch();

	const merchant = useSelector((state: RootState) => state.auth.merchant);

	const username = merchant?.username || "User";
	const firstName = merchant?.biodata.firstName || "";
	const lastName = merchant?.biodata.lastName || "";
	const profilePhoto = merchant?.profilePhoto || "";

	console.log(username,firstName,lastName,profilePhoto)
	const handleLogout = () => {
		
		dispatch(clearAuthData());

		deleteCookie('nestsiteToken');


		router.replace("/login");
	};

	// Fallback for avatar if profilePhoto is not available
	const avatarFallback = `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();

	return (
		<div className="flex items-center gap-2">
			<NotificationsDropdown />
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="relative flex gap-2 items-center">
						<Avatar className="h-8 w-8 rounded-full">
							{profilePhoto ? (
								<AvatarImage src={profilePhoto} alt={username || "User"} />
							) : (
								<AvatarFallback>{avatarFallback}</AvatarFallback>
							)}
						</Avatar>
						<p>{  firstName || "User"}</p>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56" align="end" forceMount>
					<DropdownMenuItem onClick={handleLogout}>
						Log out
						<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
