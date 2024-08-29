"use client"

import { AdminPageHeader } from "../_components/admin-sections";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";  
import CommunityCard from "./_components/CommunityCard";




export default function CommunitiesPage() {

  return (

    <div className=" self-stretch flex flex-col gap-4 px-16 mt-8 max-md:px-5 max-md:max-w-full">

      <AdminPageHeader title="Communities" />
      <div className="flex w-full gap-6">
        <Input
          type="search"
          placeholder="Find Community"
          className="w-full py-6"
        />
        <Input
          type="search"
          placeholder="Find a user"
          className="w-full py-6"
        />
        <Button className="w-full py-6">
          {/* <Search size={'1.1rem'} /> */}
          Search
        </Button>
      </div>
      <div className="flex gap-6 flex-col">
        <CommunityCard />
        <CommunityCard />
      </div>
      {/* <Pagination/> */}
    </div>

  );
}
