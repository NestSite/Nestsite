"use client"
import { ITasker } from "@/interfaces";
// import { Booking } from "@/lib/interface";
// import { getAllBookings } from "@/services/booking.service";
import { useEffect, useState } from "react";
import BaseTable from "@/components/table/base-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { taskerList } from "@/lib/mock/taskers";
import { taskerColumns } from "./_components/taskers.columns";
import { AdminPageHeader } from "@/app/(dashboard)/_components/admin-sections";



export default function TaskersPage() {

  const [data, setData] = useState<ITasker[]>(taskerList);


  return (

    <div className="flex flex-col self-stretch px-16 mt-8 max-md:px-5 max-md:max-w-full">

      <AdminPageHeader title="Taskers" />
      <div className="flex flex-wrap w-full gap-6 mt-4 lg:flex-nowrap items center">
        <Input
          type="search"
          placeholder="Tasker&apos;s Name"
          className="w-full h-full py-5"
        />
        <Input
          type="search"
          placeholder="Title"
          className="w-full h-full py-5"
        />
        <Button className="flex items-center w-full h-full gap-3 py-5">
          <Search size={'1.1rem'} />
          Search
        </Button>
      </div>

      <div className="flex flex-col mt-6 leading-[140%] max-md:max-w-full">
        <BaseTable data={data} columns={taskerColumns} />
      </div>

    </div>

  );
}
