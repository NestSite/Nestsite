import { Icons } from "@/components/icons";
import {
	IconUsersGroup,
	IconUserShield,
	IconHeadphones,
	IconDoorExit,
	IconMoneybag,
} from "@tabler/icons-react";
import { MegaphoneIcon, PieChartIcon, SettingsIcon} from "lucide-react";
import { ROUTE } from ".";

export interface NavLink {
	title: string;
	label?: string;
	variant?: "default" | "destructive";
	href: string;
	icon: JSX.Element;
}

export interface SideLink extends NavLink {
	sub?: NavLink[];
}

export const AdminRoutes = {
	ClubTypes: "/admin/club-types",
};

export const sidelinks: SideLink[] = [
	{
		title: "Dashboard",
		label: "",
		href: ROUTE.DASHBOARD,
		icon: <Icons.dashboard size={18} />,
	},
	{
		title: "Bookings",
		label: "",
		href: ROUTE.BOOKINGS,
		icon: <Icons.calendar size={18} />,
	},
	{
		title: "Taskers",
		label: "",
		href: ROUTE.TASKERS,
		icon: <Icons.gauge size={18} />,
	},
	{
		title: "Seekers",
		label: "",
		href: ROUTE.SEEKERS,
		icon: <Icons.tasklist size={18} />,
	},
	{
		title: "Reviews",
		label: "",
		href: ROUTE.REVIEWS,
		icon: <Icons.chat size={18} />,
	},
	{
		title: "Communities",
		label: "",
		href: ROUTE.COMMUNITIES,
		icon: <Icons.puzzle size={18} />,
	},
	
	{
		title: "Analytics",
		label: "",
		href: ROUTE.ANALYTICS,
		icon: <PieChartIcon size={18} />,
	},
	{
		title: "Withdrawals",
		label: "",
		href: ROUTE.WITHDRAWALS,
		icon: <IconMoneybag size={18} />,
	},
	{
		title: "Updates",
		label: "",
		href: ROUTE.UPDATES,
		icon: <MegaphoneIcon size={18} />,
	},
	{
		title: "Settings",
		label: "",
		href: "",
		icon: <SettingsIcon size={18} />,
		sub: [
			{
				title: "Subscription Manager",
				label: "",
				href: ROUTE.SUBSCRIPTION_MANAGER,
				icon: <IconUserShield size={18} />,
			},
			{
				title: "List Builder",
				label: "",
				href: ROUTE.LIST_BUILDERS.INDEX,
				icon: <IconUserShield size={18} />,
			},
			{
				title: "Page Builder",
				label: "",
				href: ROUTE.PAGES,
				icon: <IconUserShield size={18} />,
			},

		],
	},
	{
		title: "Users",
		label: "",
		href: "",
		icon: <IconUsersGroup size={18} />,
		sub: [
			{
				title: "All Users",
				label: "",
				href: "/users",
				icon: <IconUserShield size={18} />,
			},
			{
				title: "Role Manager",
				label: "",
				href: "/roles",
				icon: <IconUserShield size={18} />,
			},

			{
				title: "Verification Request",
				label: "7",
				href: ROUTE.VERIFICATION_REQUEST,
				icon: <IconUserShield size={18} />,
			},

		],
	},
];

export const bottomSidelinks: SideLink[] = [
	{
		title: "Support Tickets",
		label: "",
		href: "/",
		icon: <IconHeadphones size={18} />,
	},
	{
		title: "Log Out",
		label: "",
		href: "/logout",
		variant: "destructive",
		icon: <IconDoorExit size={18} />,
	},

];
