"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews, deleteReview } from "@/store/slices/reviewSlice";
import { RootState, AppDispatch } from "@/store";
import { AdminPageHeader } from "../_components/admin-sections";
import BaseTable from "@/components/table/base-table";
import { reviewColumns } from "./_components/reviews.columns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

export default function ReviewsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { reviews, loading, error } = useSelector((state: RootState) => state.reviews);

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteReview(id));
  };

  return (
    <div className="flex flex-col self-stretch px-16 mt-8 max-md:px-5 max-md:max-w-full">
      <AdminPageHeader title="Reviews" />
      <div className="flex flex-wrap w-full gap-6 mt-4 lg:flex-nowrap items center">
        <Input
          type="search"
          placeholder="Search Comments"
          className="w-full h-full py-5"
        />
        <Input
          type="search"
          placeholder="User's Name"
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
        <Button className="flex items-center w-full h-full gap-3 py-5">
          <Search size={'1.1rem'} />
          Search
        </Button>
      </div>

      <div className="flex flex-col mt-6 leading-[140%] max-md:max-w-full">
        {loading ? (
          <div className="space-y-4">
            {/* Skeletons for each row */}
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className="w-full h-12" />
            ))}
          </div>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <BaseTable
            data={reviews}
            columns={reviewColumns({
              handleDelete, // Pass the handleDelete function to columns
            })}
          />
        )}
      </div>
    </div>
  );
}
