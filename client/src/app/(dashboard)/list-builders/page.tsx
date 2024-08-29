"use client"

import { ROUTE } from "@/lib/constants";
import { AdminPageHeader } from "../_components/admin-sections";
import { CarFront, Globe, Pencil, Search, UserRound } from "lucide-react";

import { useRouter } from 'next/navigation';



export default function BuildersPage() {
  const router = useRouter();

  return (

    <div className="flex flex-col self-stretch px-16 mt-8 max-md:px-5 max-md:max-w-full">

      <AdminPageHeader title="Builders Categories" />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 w-full gap-6 mt-4 lg:flex-nowrap items center">
        <div onClick={() => router.push(ROUTE.LIST_BUILDERS.TASKER_TITLE)} className="flex cursor-pointer relative py-6 w-full bg-white rounded-md gap-4 flex-col items-center">
          <div className="flex rounded-md h-12 w-12 bg-muted justify-center items-center">
            <UserRound strokeWidth={2} color="#1691B2" />
          </div>
          <p className="font-bold text-sm">Manage new tasker titles</p>
          <span className="h-6 w-6 rounded-full grid place-items-center absolute top-6 right-6 bg-[#F5F5F5]">
            <Pencil strokeWidth={1.5} color="#757575" size={14} />
          </span>
        </div>

        <div onClick={() => router.push(ROUTE.LIST_BUILDERS.FAMILY)} className="flex py-6 w-full bg-white relative cursor-pointer rounded-md gap-4 flex-col items-center">
          <div className="flex rounded-md h-12 w-12 bg-muted justify-center items-center">
            <Globe strokeWidth={2} color="#1691B2" />
          </div>
          <p className="font-bold text-sm">Manage tasker family</p>
          <span className="h-6 w-6 rounded-full grid place-items-center absolute top-6 right-6 bg-[#F5F5F5]">
            <Pencil strokeWidth={1.5} color="#757575" size={14} />
          </span>
        </div> 

        <div onClick={() => router.push(ROUTE.LIST_BUILDERS.VEHICLES)} className="flex cursor-pointer py-6 w-full relative bg-white rounded-md gap-4 flex-col items-center">
          <div className="flex rounded-md h-12 w-12 bg-muted justify-center items-center">
            <CarFront strokeWidth={2} color="#1691B2" />
          </div>
          <p className="font-bold text-sm">Manage new vehicles</p>
          <span className="h-6 w-6 rounded-full grid place-items-center absolute top-6 right-6 bg-[#F5F5F5]">
            <Pencil strokeWidth={1.5} color="#757575" size={14} />
          </span>
        </div>
     
        <div onClick={() => router.push(ROUTE.LIST_BUILDERS.COUNTRIES)} className="flex py-6 w-full bg-white relative cursor-pointer rounded-md gap-4 flex-col items-center">
          <div className="flex rounded-md h-12 w-12 bg-muted justify-center items-center">
            <Globe strokeWidth={2} color="#1691B2" />
          </div>
          <p className="font-bold text-sm">Manage Countries</p>
          <span className="h-6 w-6 rounded-full grid place-items-center absolute top-6 right-6 bg-[#F5F5F5]">
            <Pencil strokeWidth={1.5} color="#757575" size={14} />
          </span>
        </div>
      </div>
    </div>

  );
}
