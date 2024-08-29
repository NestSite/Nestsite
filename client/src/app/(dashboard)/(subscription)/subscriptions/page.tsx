"use client"
import { ISubscription } from "@/interfaces";
// import { Booking } from "@/lib/interface";
// import { getAllBookings } from "@/services/booking.service";
import { useEffect, useState } from "react";
import { AdminPageHeader } from "../../_components/admin-sections";
import BaseTable from "@/components/table/base-table";
import { subscriptionColumns } from "@/components/table/columns/subscriptions.columns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { subscriptionList } from "@/lib/mock/subscriptions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function SubscriptionsPage() {

  const [data, setData] = useState<ISubscription[]>(subscriptionList);


  return (

    <div className="flex flex-col self-stretch px-16 mt-8 max-md:px-5 max-md:max-w-full">

      <AdminPageHeader title="Subscriptions" />
      <div className="flex flex-wrap w-full gap-6 mt-4 lg:flex-nowrap items center">
        <Input
          type="search"
          placeholder="Subscription&apos;s Name"
          className="w-full h-full py-5"
        />
        <Input
          type="search"
          placeholder="Subscription&apos;s Email"
          className="w-full h-full py-5"
        />
        <Select>
          <SelectTrigger className="flex w-full h-full px-3 py-5 text-sm text-black border rounded-md border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">All</SelectItem>
          </SelectContent>
        </Select>
        <Button className="flex items-center w-full h-full gap-3 py-5">
          <Search size={'1.1rem'} />
          Search
        </Button>
      </div>

      <div className="flex flex-col mt-6 leading-[140%] max-md:max-w-full">

        <BaseTable data={data} columns={subscriptionColumns} />
      </div>

    </div>

  );
}
