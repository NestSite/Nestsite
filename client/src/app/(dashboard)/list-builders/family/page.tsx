"use client"
import { IVehicle } from "@/interfaces";
import { useEffect, useState } from "react";
import { AdminPageHeader } from "../../_components/admin-sections";
import BaseTable from "@/components/table/base-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search, Undo2 } from "lucide-react";
import { vehicleList } from "@/lib/mock/vehicles";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from 'next/navigation';
import { familiesColumns } from "../_components/families.columns";
import AddFamilyDialog from "../_components/AddFamily.dialog";


export default function Vehicles() {
  const router = useRouter();
  const [data, setData] = useState<IVehicle[]>(vehicleList);


  return (

    <div className="flex flex-col self-stretch px-16 mt-8 max-md:px-5 max-md:max-w-full">

      <AdminPageHeader title="List Builder / Family" />
      <div className="flex flex-wrap w-full gap-6 mt-4 lg:flex-nowrap items center">
        <Input
          type="search"
          placeholder="Name"
          className="w-full h-full py-5"
        />
        <Select>
          <SelectTrigger className="w-full h-full py-5">
            <SelectValue placeholder="Select Status" className="placeholder:text-muted" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value="apple">All</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button className="flex items-center w-full h-full gap-3 py-5">
          <Search size={'1.1rem'} />
          Search
        </Button>
      </div>

      <div className="flex w-full mt-12 items-center justify-between">
        <Button className="flex items-center bg-white text-black w-fit h-full gap-3 py-3" onClick={() => router.back()}>
          <Undo2 size={'1.1rem'} color="black" />
          Back
        </Button>
        <AddFamilyDialog>
        <Button className="flex items-center w-fit h-full gap-3 py-5">
          <Plus size={'1.1rem'} />
          Add New Family
        </Button>
        </AddFamilyDialog>
      </div>

      <div className="flex flex-col mt-6 leading-[140%] max-md:max-w-full">

        <BaseTable data={data} columns={familiesColumns} />
      </div>

    </div>

  );
}
