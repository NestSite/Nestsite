"use client"

import { bookingColumns } from "@/app/(dashboard)/bookings/_components/bookings.columns"
import BaseTable from "@/components/table/base-table"
import { IBooking } from "@/interfaces"
import { bookingList } from "@/lib/mock/bookings"
import { useState } from "react"

const Subscriptions = () => {
  const [data, setData] = useState<IBooking[]>(bookingList);
  const [id, setId] = useState('');

  return (
    <>
        <div className="w-full p-6 py-6 bg-white rounded-lg">
            <h3 className="mb-6 text-base font-bold">All Subscriptions</h3> 
            <div className="max-w-full overflow-hidden">
                <BaseTable data={data} columns={bookingColumns({ id, setId })} />
            </div>
        </div>
    </>
  )
}

export default Subscriptions