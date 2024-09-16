"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; 
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ToastProvider, Toast, ToastTitle, ToastViewport } from "@/components/ui/toast";
import { Skeleton } from "@/components/ui/skeleton"; // For loading state
import { BACKEND_URL } from "@/lib/utils"; // Importing BACKEND_URL

const PortfolioPage = () => {
  const { name } = useParams();
  const [portfolio, setPortfolio] = useState<any>(null); // Portfolio data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState<"default" | "destructive">("default");

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        // Use the BACKEND_URL for fetching
        const response = await fetch(`${BACKEND_URL}/api/v1/global/portfolio/${name}`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch portfolio data");
        }

        setPortfolio(result);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
        setToastMessage(error.message);
        setToastVariant("destructive");
        setToastOpen(true);
      }
    };

    if (name) {
      fetchPortfolio();
    }
  }, [name]);

  return (
    <ToastProvider swipeDirection="right">
      <div className="container mx-auto py-8">
        {/* <h1 className="text-2xl font-semibold mb-4">Portfolio: {name}</h1> */}

        {loading ? (
          <Skeleton className="h-20 w-full" />
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : portfolio ? (
          <div>
            {/* Portfolio Details */}
            <div className="bg-white p-4 rounded shadow mb-6">
              <img
                src={portfolio.profilePhoto || "/placeholder.jpg"}
                alt={portfolio.fullName}
                className="w-full h-48 object-cover rounded"
              />
              <h2 className="text-3xl font-semibold mt-4">{portfolio.fullName}</h2>
              <p className="mt-2 text-gray-700">{portfolio.description}</p>
            </div>

            {/* Projects */}
            <h3 className="text-xl font-bold mb-4">Projects</h3>
            {portfolio.projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {portfolio.projects.map((project: any) => (
                  <div key={project.id} className="bg-white p-4 rounded shadow">
                    <img
                      src={project.imageUrl || "/placeholder.jpg"}
                      alt={project.name}
                      className="w-full h-40 object-cover rounded mb-4"
                    />
                    <h5 className="text-xl font-semibold">{project.name}</h5>
                    <p className="text-gray-700 mt-2">{project.description}</p>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        className="text-blue-500 underline mt-2"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Project
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No projects found for this portfolio.</p>
            )}
          </div>
        ) : (
          <p className="text-gray-500">Portfolio not found</p>
        )}

        <Toast open={toastOpen} onOpenChange={setToastOpen} variant={toastVariant}>
          <ToastTitle>{toastMessage}</ToastTitle>
        </Toast>
        <ToastViewport />
      </div>
    </ToastProvider>
  );
};

export default PortfolioPage;
