"use client"
import { IVerificationRequest } from "@/interfaces";
import { useState } from "react";
import { AdminPageHeader } from "../_components/admin-sections";
import BaseTable from "@/components/table/base-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { verificationRequestsList } from "@/lib/mock/verificationRequests";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { verificationRequestColumns } from "@/components/table/columns/verification-request.columns";


export default function VerificationRequestPage() {

  const [data, setData] = useState<IVerificationRequest[]>(verificationRequestsList);


  return (

    <div className="flex flex-col self-stretch px-16 mt-8 max-md:px-5 max-md:max-w-full">
      <AdminPageHeader title="Taskers Verification Requests" className="mb-6" />
      <div className="grid text-center lg:text-left xl:flex lg:grid-cols-2 bg-white rounded-md flex-wrap gap-3 items-center p-4 xl:justify-between font-medium mb-2">
        <div className="text-sm">Total Request Completed 100</div>
        <span className="xl:inline-block hidden">|</span>
        <div className="text-sm">Total New Request 50</div>
        <span className="xl:inline-block hidden">|</span>
        <div className="text-sm">Total Banned 20</div>
        <span className="xl:inline-block hidden">|</span>
        <div className="text-sm">Total Restricted 20</div>
        <span className="xl:inline-block hidden">|</span>
        <div className="text-sm">Total Country 20</div>
        <span className="xl:inline-block hidden">|</span>
        <div className="text-sm">Total User 100</div>
      </div>
      <div className="flex flex-wrap w-full gap-6 mt-4 lg:flex-nowrap items center">
        <Input
          type="search"
          placeholder="Name"
          className="w-full h-full py-5"
        />
        <Input
          type="search"
          placeholder="Submission Reference"
          className="w-full h-full py-5"
        />
        <Select>
          <SelectTrigger className="py-5">
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
        <BaseTable data={data} columns={verificationRequestColumns} />
      </div>

    </div>

  );
}
