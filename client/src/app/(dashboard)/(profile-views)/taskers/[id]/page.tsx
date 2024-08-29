"use client"
import { ITasker, TTabs } from "@/interfaces";
import { useState } from "react";
import { taskerList } from "@/lib/mock/taskers";
import Compliance from "../_components/Compliance";
import Reviews from "../_components/Reviews";
import Bookings from "../_components/Bookings";
import Referrals from "../_components/Referrals";
import Payments from "../_components/Payments";
import Subscriptions from "../_components/Subscriptions";
import Notifications from "../_components/Notifications";
import Community from "../_components/Community";
import Traces from "../_components/Traces";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminPageHeader } from "@/app/(dashboard)/_components/admin-sections";
import ProfileSidebar from "../../_components/profile-sidebar";
import ProfileHeader from "../../_components/profile-header";

enum TaskersProfileTabName {
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
type TaskersProfileTabs = TTabs<TaskersProfileTabName>
const tabs: TaskersProfileTabs = new Map([
    [TaskersProfileTabName.Compliance, Compliance],
    [TaskersProfileTabName.Reviews, Reviews],
    [TaskersProfileTabName.Bookings, Bookings],
    [TaskersProfileTabName.Referrals, Referrals],
    [TaskersProfileTabName.Payments, Payments],
    [TaskersProfileTabName.Subscriptions, Subscriptions],
    [TaskersProfileTabName.Notifications, Notifications],
    [TaskersProfileTabName.Community, Community],
    [TaskersProfileTabName.Traces, Traces],
]);
// const tabs: TaskersProfileTabs[] = ['Compliance', 'Reviews', 'Bookings', 'Referrals', 'Payments', 'Notifications', 'Subscriptions', 'Community', 'Traces']

export default function TaskersProfilePage() {


    return (

        <div className="flex flex-col self-stretch w-full px-16 mt-8 max-md:px-5 max-md:max-w-full">
            <AdminPageHeader title="Taskers / Profile" className="mb-6" />
            <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-5 xl:grid-cols-6">
                <ProfileHeader/>
                <div className=" col-span-1 md:col-span-2">
                    <ProfileSidebar/>
                </div>
                <Tabs defaultValue={TaskersProfileTabName.Compliance} className="w-full col-span-1 md:col-span-3 xl:col-span-4">
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
