"use client"
import { IFlag } from "@/interfaces";
import { useState } from "react";
import BaseTable from "@/components/table/base-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { AdminPageHeader } from "@/app/(dashboard)/_components/admin-sections";
import { flagList } from "@/lib/mock/flags";
import { flagColumns } from "./_components/flags.columns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FlagsPage() {
  const [data, setData] = useState<IFlag[]>(flagList);

  return (
    <div className="flex flex-col self-stretch px-16 mt-8 max-md:px-5 max-md:max-w-full">
      <AdminPageHeader title="Flags" />
      <div className="flex flex-wrap w-full gap-6 mt-4 lg:flex-nowrap items center">
        <Input
          type="search"
          placeholder="User’s name"
          className="w-full h-full py-5"
        />
        <Select>
          <SelectTrigger className="flex w-full h-full px-3 py-5 text-sm text-black border rounded-md border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            <SelectValue placeholder="Seeker" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Graphic Design</SelectItem>
            <SelectItem value="dark">Painting</SelectItem>
            <SelectItem value="system">Teaching</SelectItem>
          </SelectContent>
        </Select>
        <Button className="flex items-center w-full h-full gap-3 py-5">
          <Search size={'1.1rem'} />
          Search
        </Button>
      </div>

      <div className="flex flex-col mt-6 leading-[140%] max-md:max-w-full">
        <BaseTable data={data} columns={flagColumns} />
      </div>

    </div>

  );
}
