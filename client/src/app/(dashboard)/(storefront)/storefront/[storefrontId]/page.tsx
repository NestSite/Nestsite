"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { fetchStorefrontById, updateStorefront } from "@/store/slices/storefrontSlice"; // Adjusted actions for storefront
import { RootState, AppDispatch } from "@/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ToastProvider,
  Toast,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

const EditPage = () => {
  const router = useRouter();
  const params = useParams();
  const storefrontId = Array.isArray(params.storefrontId) ? params.storefrontId[0] : params.storefrontId; // Ensure storefrontId is a string
  const dispatch = useDispatch<AppDispatch>();
  const { storefront, loading, error } = useSelector((state: RootState) => state.storefront);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState<"default" | "destructive">("default");

  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      name: "",
      imageUrl: "",
      description: "",
    },
  });

  useEffect(() => {
    if (storefrontId) {
      dispatch(fetchStorefrontById(storefrontId));
    }
  }, [dispatch, storefrontId]);

  // Reset form fields once storefront data is loaded
  useEffect(() => {
    if (storefront) {
      reset({
        name: storefront.name,
        imageUrl: storefront.imageUrl,
        description: storefront.description,
      });
    }
  }, [storefront, reset]);

  const onSubmit = async (data: any) => {
    try {
      const updatedData = {
        id: storefrontId, // Include the ID in the updated data
        name: data.name,
        imageUrl: data.imageUrl,
        description: data.description,
      };

      const resultAction = await dispatch(updateStorefront({ storefrontId, updatedData }));

      // Check if the action was successful
      if (updateStorefront.fulfilled.match(resultAction)) {
        setToastMessage("Storefront updated successfully!");
        setToastVariant("default");
        setToastOpen(true);
        router.push("/storefront"); // Redirect after success
      } else {
        // If action was rejected, show error message from the payload
        const errorMessage =
          resultAction.payload?.message || "Failed to update storefront.";
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      setToastMessage(error.message || "An unknown error occurred during storefront update.");
      setToastVariant("destructive");
      setToastOpen(true);
    }
  };

  return (
    <ToastProvider swipeDirection="right">
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-semibold mb-4">Edit Storefront</h1>

        {loading && <p>Loading storefront...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-4">
              <Label htmlFor="name">Storefront Name</Label>
              <Input
                id="name"
                placeholder="Enter storefront name"
                {...register("name", { required: true })}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="imageUrl">Storefront Image URL</Label>
              <Input
                id="imageUrl"
                placeholder="Storefront image URL"
                {...register("imageUrl")}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Enter storefront description"
              {...register("description", { required: true })}
            />
          </div>

          <Button className="mt-4" type="submit" disabled={loading}>
            {loading ? "Updating..." : "Save Changes"}
          </Button>
        </form>

        <Toast open={toastOpen} onOpenChange={setToastOpen} variant={toastVariant}>
          <ToastTitle>{toastMessage}</ToastTitle>
        </Toast>
        <ToastViewport />
      </div>
    </ToastProvider>
  );
};

export default EditPage;
