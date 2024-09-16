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
import { clearProfileData } from "@/store/slices/profileSlice"; 
import NotificationsDropdown from "./notifications-dropdown";
import { deleteCookie, getCookie } from "cookies-next";

export function UserNav() {
	const router = useRouter();
	const dispatch = useDispatch();

	// Get profile data from profile slice instead of auth slice
	const profile = useSelector((state: RootState) => state.profile.profile);
	console.log(profile);

	const username = profile?.username || "user";
	const firstName = profile?.firstName || "";
	const lastName = profile?.lastName || "";
	const profilePhoto = profile?.profilePhoto || "";

	console.log(username, firstName, lastName, profilePhoto);

	const handleLogout = () => {
		const authToken = getCookie('nestsiteAuthToken');
		console.log('Current nestsiteAuthToken:', authToken);
		dispatch(clearProfileData()); // Clear profile data instead of auth data

		deleteCookie('nestsiteAuthToken', { path: '/', domain: window.location.hostname });

		console.log('demo');
		router.replace("/login");
	};

	// Fallback for avatar if profilePhoto is not available
	const avatarFallback = `${username?.[0] ?? ""}`.toUpperCase();

	return (
		<div className="flex items-center gap-2">
			<NotificationsDropdown />
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="relative flex gap-2 items-center">
						<Avatar className="h-8 w-8 rounded-full">
							{profilePhoto ? (
								<AvatarImage src={profilePhoto} alt={username} />
							) : (
								<AvatarFallback>{avatarFallback}</AvatarFallback>
							)}
						</Avatar>
						<p>{username || "User"}</p>
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
