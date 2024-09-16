"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { RootState, AppDispatch } from "@/store";
import { fetchCategories, createCategory } from "@/store/slices/categorySlice";
import { fetchStorefronts } from "@/store/slices/storefrontSlice";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ToastProvider,
  Toast,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

const CategoryPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { storefronts, loading: storefrontLoading } = useSelector(
    (state: RootState) => state.storefront
  );
  const { categories, loading: categoryLoading } = useSelector(
    (state: RootState) => state.category
  );

  const [selectedStorefront, setSelectedStorefront] = useState<string | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState<"default" | "destructive">(
    "default"
  );

  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    dispatch(fetchStorefronts()); // Fetch all storefronts on mount
  }, [dispatch]);

  useEffect(() => {
    if (selectedStorefront) {
      dispatch(fetchCategories(selectedStorefront)); // Fetch categories when a storefront is selected
    }
  }, [dispatch, selectedStorefront]);

  const onCreateCategory = async (data: any) => {
    if (!selectedStorefront) return;
    try {
      const resultAction = await dispatch(
        createCategory({ storefrontId: selectedStorefront, name: data.name })
      );
      if (createCategory.fulfilled.match(resultAction)) {
        setToastMessage("Category created successfully!");
        setToastVariant("default");
        setToastOpen(true);
        reset();
        setIsDialogOpen(false); // Close the dialog after successful creation
      } else {
        throw new Error(
          resultAction.payload?.message || "Failed to create category."
        );
      }
    } catch (error: any) {
      setToastMessage(
        error.message || "An unknown error occurred while creating the category."
      );
      setToastVariant("destructive");
      setToastOpen(true);
    }
  };

  return (
    <ToastProvider swipeDirection="right">
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-semibold mb-4">Create a New Category</h1>

        {/* Storefront Selection */}
        {storefrontLoading ? (
          <p>Loading storefronts...</p>
        ) : storefronts.length > 0 ? (
          <select
            onChange={(e) => setSelectedStorefront(e.target.value)}
            className="border p-2 rounded-md w-full mb-4"
          >
            <option value="">Select a storefront</option>
            {storefronts.map((storefront) => (
              <option key={storefront.id} value={storefront.id}>
                {storefront.name}
              </option>
            ))}
          </select>
        ) : (
          <p>No storefronts available. Please create one first.</p>
        )}

        {/* Create Category Dialog */}
        {selectedStorefront && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Create New Category</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Category</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onCreateCategory)} className="grid gap-4">
                <div>
                  <Label>Category Name</Label>
                  <Input
                    {...register("name", { required: true })}
                    placeholder="Enter category name"
                  />
                </div>
                <DialogFooter>
                  <Button type="submit">Create Category</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}

        {/* List Categories */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          {categoryLoading ? (
            <p>Loading categories...</p>
          ) : categories.length > 0 ? (
            <ul>
              {categories.map((category) => (
                <li key={category.id}>{category.name}</li>
              ))}
            </ul>
          ) : (
            <p>No categories found for this storefront.</p>
          )}
        </div>
      </div>

      {/* Toast Notifications */}
      <Toast open={toastOpen} onOpenChange={setToastOpen} variant={toastVariant}>
        <ToastTitle>{toastMessage}</ToastTitle>
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
};

export default CategoryPage;
