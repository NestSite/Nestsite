"use client";

import React, { useState, useEffect } from "react";
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
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchStorefronts, createStorefront } from "@/store/slices/storefrontSlice"; // Fetch & create storefront actions
import { RootState, AppDispatch } from "@/store";
import {
  ToastProvider,
  Toast,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useRouter } from "next/navigation";

const StorefrontPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { storefronts, loading, error } = useSelector(
    (state: RootState) => state.storefront
  );

  const [isOpen, setIsOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState<"default" | "destructive">(
    "default"
  );

  useEffect(() => {
    dispatch(fetchStorefronts());
  }, [dispatch]);

  const handleStorefrontClick = (storefrontId: string) => {
    router.push(`/storefront/${storefrontId}`);
  };

  return (
    <ToastProvider swipeDirection="right">
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Your Storefronts</h1>
          
          {/* Button to Create New Storefront */}
          <Button onClick={() => setIsOpen(true)}>Create New Storefront</Button>
        </div>

        {/* Display loading state */}
        {loading && <p>Loading storefronts...</p>}

        {/* Error handling */}
        {error && (
          <p className="text-red-500">Failed to fetch storefronts: {error}</p>
        )}

        {/* Storefront Listing */}
        {!loading && storefronts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {storefronts.map((storefront) => (
              <div
                key={storefront.id}
                className="border p-4 rounded-md shadow-md cursor-pointer hover:shadow-lg transition"
                onClick={() => handleStorefrontClick(storefront.id)}
              >
                <h2 className="font-semibold text-lg">{storefront.name}</h2>
                <p className="text-sm">{storefront.description}</p>
              </div>
            ))}
          </div>
        ) : (
          !loading && (
            <div className="text-center">
              <p className="text-gray-500">You have no storefronts yet.</p>
              {/* Button to create storefront
              <Button onClick={() => setIsOpen(true)} className="mt-4">
                Create New Storefront
              </Button> */}
            </div>
          )
        )}

        {/* Create Storefront Dialog */}
        <StorefrontDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          setToastMessage={setToastMessage}
          setToastOpen={setToastOpen}
          setToastVariant={setToastVariant}
        />
      </div>

      {/* Toast for notifications */}
      <Toast open={toastOpen} onOpenChange={setToastOpen} variant={toastVariant}>
        <ToastTitle>{toastMessage}</ToastTitle>
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
};

export default StorefrontPage;

// Dialog Component to Create Storefront
const StorefrontDialog = ({
  isOpen,
  onClose,
  setToastMessage,
  setToastOpen,
  setToastVariant,
}: {
  isOpen: boolean;
  onClose: () => void;
  setToastMessage: (message: string) => void;
  setToastOpen: (open: boolean) => void;
  setToastVariant: (variant: "default" | "destructive") => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, register, reset } = useForm();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const resultAction = await dispatch(createStorefront(data));

      // Check if the result was successful
      if (createStorefront.fulfilled.match(resultAction)) {
        reset();
        onClose();
        setToastMessage("Storefront created successfully!");
        setToastVariant("default");
        setToastOpen(true);
      } else {
        // Handle rejected case and display error message from the payload
        const errorMessage =
          resultAction.payload?.message ||
          "Failed to create storefront. Please try again.";
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      // Display the error message in the toast
      setToastMessage(
        error.message || "An unknown error occurred while creating the storefront."
      );
      setToastVariant("destructive");
      setToastOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Storefront</DialogTitle>
        </DialogHeader>
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

          <DialogFooter className="justify-center sm:justify-center items-center flex">
            <Button
              className="w-full md:w-1/2"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? "Creating..." : "Create Storefront"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
