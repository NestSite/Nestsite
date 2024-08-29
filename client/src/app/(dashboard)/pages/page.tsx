"use client"

import { ROUTE } from "@/lib/constants";
import { AdminPageHeader } from "../_components/admin-sections";
import { CarFront, Globe, Pencil, Search, UserRound, Zap } from "lucide-react";

import { useRouter } from 'next/navigation';



export default function Pages() {
  const router = useRouter();

  return (

    <div className="flex flex-col self-stretch px-16 mt-8 max-md:px-5 max-md:max-w-full">

      <AdminPageHeader title="Builders Categories" />
      <div className="flex flex-wrap w-full gap-6 mt-4 lg:flex-nowrap items center">
        <div onClick={() => router.push(ROUTE.FAQ)} className="flex cursor-pointer relative py-6 w-full bg-white rounded-md gap-4 flex-col items-center">
          <div className="flex rounded-md h-12 w-12 bg-muted justify-center items-center">
            <Zap color="#1691B2" strokeWidth={1} />
          </div>
          <p className="font-bold text-sm">Help & FAQs Pages</p>
          <span className="h-6 w-6 rounded-full grid place-items-center absolute top-6 right-6 bg-[#F5F5F5]">
            <Pencil strokeWidth={1.5} color="#757575" size={14} />
          </span>
        </div>
        <div onClick={() => router.push(ROUTE.ABOUT_US)} className="flex cursor-pointer py-6 w-full relative bg-white rounded-md gap-4 flex-col items-center">
          <div className="flex rounded-md h-12 w-12 bg-muted justify-center items-center">
            <Zap color="#1691B2" strokeWidth={1} />
          </div>
          <p className="font-bold text-sm">About Us Pages</p>
          <span className="h-6 w-6 rounded-full grid place-items-center absolute top-6 right-6 bg-[#F5F5F5]">
            <Pencil strokeWidth={1.5} color="#757575" size={14} />
          </span>
        </div>
        <div onClick={() => router.push(ROUTE.TERMS_OF_USE)} className="flex py-6 w-full bg-white relative cursor-pointer rounded-md gap-4 flex-col items-center">
          <div className="flex rounded-md h-12 w-12 bg-muted justify-center items-center">
            <Zap color="#1691B2" strokeWidth={1} />
          </div>
          <p className="font-bold text-sm">Terms of Use Pages</p>
          <span className="h-6 w-6 rounded-full grid place-items-center absolute top-6 right-6 bg-[#F5F5F5]">
            <Pencil strokeWidth={1.5} color="#757575" size={14} />
          </span>
        </div>
        <div onClick={() => router.push(ROUTE.PRIVACY_POLICY)} className="flex py-6 w-full bg-white relative cursor-pointer rounded-md gap-4 flex-col items-center">
          <div className="flex rounded-md h-12 w-12 bg-muted justify-center items-center">
            <Zap color="#1691B2" strokeWidth={1} />
          </div>
          <p className="font-bold text-sm">Privacy Policy Pages</p>
          <span className="h-6 w-6 rounded-full grid place-items-center absolute top-6 right-6 bg-[#F5F5F5]">
            <Pencil strokeWidth={1.5} color="#757575" size={14} />
          </span>
        </div>
      </div>
    </div>

  );
}
