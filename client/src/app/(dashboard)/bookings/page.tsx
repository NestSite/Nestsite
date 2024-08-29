"use client"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { AdminPageHeader } from "../_components/admin-sections";
import BaseTable from "@/components/table/base-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
// import LoadingScreen from "@/components/LoadingScreen";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { bookingList } from "@/lib/mock/bookings";
import { bookingColumns } from "./_components/bookings.columns";
import ViewBookingDialog from "./_components/ViewBooking.dialog";
import { RootState, AppDispatch } from '@/store';
import { fetchAllBookings } from "@/store/slices/bookingSlice";
import { Skeleton } from '@/components/ui/skeleton';

export default function BookingsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { bookings, status, error } = useSelector((state: RootState) => state.bookings);
  const [id, setId] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllBookings());
    }
  }, [status, dispatch]);


  return (
    <div className="flex flex-col self-stretch px-16 mt-8 max-md:px-5 max-md:max-w-full">
      <ViewBookingDialog setId={setId} id={id} />
      <AdminPageHeader title="Bookings" />
      <div className="flex flex-wrap w-full gap-6 mt-4 lg:flex-nowrap items center">
        <Input
          type="search"
          placeholder="Booking ID"
          className="w-full h-full py-5"
        />
        <Input
          type="search"
          placeholder="Tasker's Name"
          className="w-full h-full py-5"
        />

        <Select>
          <SelectTrigger className="flex w-full h-full px-3 py-5 text-sm text-black border rounded-md border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            <SelectValue placeholder="Graphic Design" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Graphic Design</SelectItem>
            <SelectItem value="dark">Painting</SelectItem>
            <SelectItem value="system">Teaching</SelectItem>
          </SelectContent>
        </Select>
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
        {status === 'loading' ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <BaseTable data={bookings} columns={bookingColumns({ id, setId })} />
        )}
      </div>
    </div>

  );
}
