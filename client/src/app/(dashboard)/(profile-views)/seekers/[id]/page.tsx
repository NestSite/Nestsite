"use client"
import { TTabs } from "@/interfaces";
import { seekerList } from "@/lib/mock/seekers";
import { AdminPageHeader } from "../../../_components/admin-sections";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Compliance from "../../taskers/_components/Compliance";
import Reviews from "../../taskers/_components/Reviews";
import Bookings from "../../taskers/_components/Bookings";
import Referrals from "../../taskers/_components/Referrals";
import Payments from "../../taskers/_components/Payments";
import Subscriptions from "../../taskers/_components/Subscriptions";
import Notifications from "../../taskers/_components/Notifications";
import Community from "../../taskers/_components/Community";
import Traces from "../../taskers/_components/Traces";
import { Plus } from "lucide-react";
import ProfileHeader from "../../_components/profile-header";
import ProfileSidebar from "../../_components/profile-sidebar";


enum SeekersProfileTabName {
    Compliance = 'Compliance',
    Reviews = 'Reviews',
    Bookings = 'Bookings',
    Referrals = 'Referrals',
    Payments = 'Payments',
    Notifications = 'Notifications',
    Subscriptions = 'Subscriptions',
    Community = 'Community',
    Traces = 'Traces'
}
type SeekersProfileTabs = TTabs<SeekersProfileTabName>
const tabs: SeekersProfileTabs = new Map([
    [SeekersProfileTabName.Compliance, Compliance],
    [SeekersProfileTabName.Reviews, Reviews],
    [SeekersProfileTabName.Bookings, Bookings],
    [SeekersProfileTabName.Referrals, Referrals],
    [SeekersProfileTabName.Payments, Payments],
    [SeekersProfileTabName.Subscriptions, Subscriptions],
    [SeekersProfileTabName.Notifications, Notifications],
    [SeekersProfileTabName.Community, Community],
    [SeekersProfileTabName.Traces, Traces],
]);

export default function SeekersProfilePage() {

  return (

    <div className="flex flex-col self-stretch px-16 mt-8 max-md:px-5 max-md:max-w-full">
        <AdminPageHeader title="Seekers / Profile" className="mb-6" />
        <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-5 xl:grid-cols-6">
                <ProfileHeader/>
                <div className=" col-span-1 md:col-span-2">
                    <ProfileSidebar/>
                </div>
                <Tabs defaultValue={SeekersProfileTabName.Compliance} className="w-full col-span-1 md:col-span-3 xl:col-span-4">
                    <TabsList className="flex-wrap w-full md:h-fit gap-0.5 p-0 md:px-1">
                        {
                            Array.from(tabs.keys())?.map((tabVal, index) => (
                                <TabsTrigger key={index} value={tabVal} className="py-6 px-2 text-xs">{tabVal}</TabsTrigger>
                            ))
                        }
                    </TabsList>

                    {Array.from(tabs.entries()).map(([key, Comp], index) => (
                        <TabsContent key={index} value={key} className="w-full">
                            <Comp/>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
    </div>

  );
}
