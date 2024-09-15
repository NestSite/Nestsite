"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation"; 
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { fetchPortfolioById, updatePortfolio } from "@/store/slices/portfolioSlice";
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

const PortfolioEditPage = () => {
  const router = useRouter();
  const params = useParams();
  const portfolioId = Array.isArray(params.portfolioId) ? params.portfolioId[0] : params.portfolioId; // Ensure portfolioId is a string
  const dispatch = useDispatch<AppDispatch>();
  const { portfolio, loading, error } = useSelector((state: RootState) => state.portfolio);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState<"default" | "destructive">("default");

  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      fullName: "",
      profilePhoto: "",
      description: "",
      skill: "",
    },
  });

  useEffect(() => {
    if (portfolioId) {
      dispatch(fetchPortfolioById(portfolioId)); 
    }
  }, [dispatch, portfolioId]);

  // Reset form fields once portfolio data is loaded
  useEffect(() => {
    if (portfolio) {
      reset({
        fullName: portfolio.fullName,
        profilePhoto: portfolio.profilePhoto,
        description: portfolio.description,
        skill: portfolio.skill,
      });
    }
  }, [portfolio, reset]);

  const onSubmit = async (data: any) => {
    try {
      const updatedData = {
        fullName: data.fullName,
        profilePhoto: data.profilePhoto,
        description: data.description,
        skill: data.skill,
      };

      const resultAction = await dispatch(updatePortfolio({ portfolioId: portfolioId, updatedData }));

      // Check if the action was successful
      if (updatePortfolio.fulfilled.match(resultAction)) {
        setToastMessage("Portfolio updated successfully!");
        setToastVariant("default");
        setToastOpen(true);
        router.push("/portfolio"); // Redirect after success
      } else {
        // If action was rejected, show error message from the payload
        const errorMessage =
          resultAction.payload?.message || "Failed to update portfolio.";
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      setToastMessage(error.message || "An unknown error occurred during portfolio update.");
      setToastVariant("destructive");
      setToastOpen(true);
    }
  };

  return (
    <ToastProvider swipeDirection="right">
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-semibold mb-4">Edit Portfolio</h1>

        {loading && <p>Loading portfolio...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-4">
              <Label htmlFor="fullName">Portfolio Name</Label>
              <Input
                id="fullName"
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

export default PortfolioEditPage;
