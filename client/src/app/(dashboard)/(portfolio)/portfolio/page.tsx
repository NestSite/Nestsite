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
import { fetchPortfolios, createPortfolio } from "@/store/slices/portfolioSlice"; // Fetch & create portfolio actions
import { RootState, AppDispatch } from "@/store";
import {
  ToastProvider,
  Toast,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { DEPLOYED_URL } from "@/lib/utils";
const PortfolioPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { portfolios, loading, error } = useSelector(
    (state: RootState) => state.portfolio
  );

  const [isOpen, setIsOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState<"default" | "destructive">(
    "default"
  );

  useEffect(() => {
    dispatch(fetchPortfolios());
  }, [dispatch]);

  const handlePortfolioClick = (portfolioId: string) => {
    router.push(`/portfolio/${portfolioId}`);
  };

  return (
    <ToastProvider swipeDirection="right">
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-4">
          <div>
          <h1 className="text-2xl font-semibold">Your Portfolios</h1>
          <br />
          <span>visit {DEPLOYED_URL}/nestport/:portfolioName to preview</span>
          </div>
          
          {/* Button to Create New Portfolio */}
          <Button onClick={() => setIsOpen(true)}>Create New Portfolio</Button>
        </div>

        {/* Display loading state */}
        {loading && <p>Loading portfolios...</p>}

        {/* Error handling */}
        {error && (
          <p className="text-red-500">Failed to fetch portfolios: {error}</p>
        )}

        {/* Portfolio Listing */}
        {!loading && portfolios.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {portfolios.map((portfolio) => (
              <div
                key={portfolio.id}
                className="border p-4 rounded-md shadow-md cursor-pointer hover:shadow-lg transition"
                onClick={() => handlePortfolioClick(portfolio.id)}
              >
                <h2 className="font-semibold text-lg">{portfolio.fullName}</h2>
                <p className="text-sm">{portfolio.description}</p>
              </div>
            ))}
          </div>
        ) : (
          !loading && (
            <div className="text-center">
              <p className="text-gray-500">You have no portfolios yet.</p>
              {/* Button to create portfolio */}
              <Button onClick={() => setIsOpen(true)} className="mt-4">
                Create New Portfolio
              </Button>
            </div>
          )
        )}

        {/* Create Portfolio Dialog */}
        <PortfolioDialog
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

export default PortfolioPage;

// Dialog Component to Create Portfolio
const PortfolioDialog = ({
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
      const resultAction = await dispatch(createPortfolio(data));

      // Check if the result was successful
      if (createPortfolio.fulfilled.match(resultAction)) {
        reset();
        onClose();
        setToastMessage("Portfolio created successfully!");
        setToastVariant("default");
        setToastOpen(true);
      } else {
        // Handle rejected case and display error message from the payload
        const errorMessage =
          resultAction.payload?.message ||
          "Failed to create portfolio. Please try again.";
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      // Display the error message in the toast
      setToastMessage(
        error.message || "An unknown error occurred while creating the portfolio."
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
          <DialogTitle>Create New Portfolio</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-4">
              <Label htmlFor="name">Portfolio Name</Label>
              <Input
                id="name"
                placeholder="Enter portfolio name"
                {...register("fullName", { required: true })}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="profilePhoto">Profile Photo URL</Label>
              <Input
                id="profilePhoto"
                placeholder="Profile photo URL"
                {...register("profilePhoto")}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Enter portfolio description"
              {...register("description", { required: true })}
            />
          </div>

          <div className="flex flex-col gap-4">
            <Label htmlFor="skill">Skills</Label>
            <Input
              id="skill"
              placeholder="Enter your skill"
              {...register("skill", { required: true })}
            />
          </div>

          <DialogFooter className="justify-center sm:justify-center items-center flex">
            <Button
              className="w-full md:w-1/2"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? "Creating..." : "Create Portfolio"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
