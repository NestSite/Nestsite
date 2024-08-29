"use client"
import BaseTable from "@/components/table/base-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { IBooking } from "@/interfaces";
import { useState } from "react";
import { bookingList } from "@/lib/mock/bookings";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { bookingColumns } from "@/app/(dashboard)/bookings/_components/bookings.columns";


const Bookings = () => {
  const [data, setData] = useState<IBooking[]>(bookingList);
  const [id, setId] = useState('');

  return (
    <>
        <Card className="w-full overflow-scroll">
            <CardHeader>

            <h3 className="-mb-4 text-base font-bold">20 Bookings in total</h3> 
            </CardHeader>
            <CardContent className="w-full overflow-scroll">
            <div className="w-full">
                <div className="flex flex-wrap w-full gap-3 mt-4 items center">
                    <Input
                    type="search"
                    placeholder="Booking ID"
                    className="h-full py-4 w-fit"
                    />
                    <Input
                    type="search"
                    placeholder="Tasker's Name"
                    className="h-full py-4 w-fit"
                    />
                    <Select>
                        <SelectTrigger className="flex h-full px-3 py-4 text-sm text-black border rounded-md border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-fit disabled:cursor-not-allowed disabled:opacity-50">
                            <SelectValue placeholder="Graphic Design" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Graphic Design</SelectItem>
                            <SelectItem value="dark">Painting</SelectItem>
                            <SelectItem value="system">Teaching</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="flex h-full px-3 py-4 text-sm text-black border rounded-md border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-fit disabled:cursor-not-allowed disabled:opacity-50">
                            <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">All</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button className="flex items-center h-full gap-3 py-4 w-fit">
                        <Search size={'1.1rem'} />
                        Search
                    </Button>
                </div>
                <div className="max-w-full overflow-hidden">
                    <BaseTable data={data} columns={bookingColumns({ id, setId })} />
                </div>
            </div>
            </CardContent>
        </Card>
    </>
  )
}

export default Bookings