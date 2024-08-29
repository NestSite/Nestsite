"use client"
import { IBlog, IRole } from "@/interfaces";
import { useState } from "react";
import { AdminPageHeader } from "../_components/admin-sections";
import BaseTable from "@/components/table/base-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IconPlus } from "@tabler/icons-react";
import { roleList } from "@/lib/mock/role";
import { roleColumns } from "./_components/roles.columns";
import CreateRoleDialog from "./_components/CreateRole.dialog";

export default function RolesPage() {
  const [data, setData] = useState<IRole[]>(roleList);

  return (

    <div className="flex flex-col self-stretch px-16 mt-8 max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col items-center justify-between gap-3 mb-4 md:flex-row">
          <AdminPageHeader title="Role Manager" />
          <CreateRoleDialog>
            <Button className="flex items-center gap-3 font-bold">
              <IconPlus size={'1.1rem'} />
              Create
            </Button>
          </CreateRoleDialog>
        </div>
      <div className="flex flex-wrap w-full gap-6 mt-4 lg:flex-nowrap items center">
        <Input
          type="search"
          placeholder="Employee ID"
          className="w-full h-full py-5"
        />
        <Input
          type="search"
          placeholder="Name"
          className="w-full h-full py-5"
        />
        <Select>
            <SelectTrigger className="flex w-full h-full px-3 py-5 text-sm text-black border rounded-md border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            <SelectValue placeholder="Task Manager" />
            </SelectTrigger>
            <SelectContent>
            <SelectItem value="light">Task Manager</SelectItem>
            </SelectContent>
        </Select>
        <Button className="flex items-center w-full h-full gap-3 py-5">
          <Search size={'1.1rem'} />
          Search
        </Button>
      </div>

      <div className="flex flex-col mt-6 leading-[140%] max-md:max-w-full">
        <BaseTable data={data} columns={roleColumns} />
      </div>
    </div>

  );
}
