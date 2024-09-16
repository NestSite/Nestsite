"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { RootState, AppDispatch } from "@/store";
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
} from "@/store/slices/projectSlice";
import { fetchPortfolios } from "@/store/slices/portfolioSlice";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
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

const ProjectPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { portfolios, loading: portfolioLoading } = useSelector(
    (state: RootState) => state.portfolio
  );
  const { projects, loading: projectLoading, error } = useSelector(
    (state: RootState) => state.project
  );

  const [selectedPortfolio, setSelectedPortfolio] = useState<string | null>(
    null
  );
  const [selectedProject, setSelectedProject] = useState<any | null>(null); // To hold selected project for editing
  const [isEditMode, setIsEditMode] = useState<boolean>(false); // To toggle between create and edit mode
  const [isDialogOpen, setIsDialogOpen] = useState(false); // To control the project create/edit dialog
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false); // To control the confirm delete dialog
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null); // To track the project to be deleted

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState<"default" | "destructive">(
    "default"
  );

  const { handleSubmit, register, reset, setValue } = useForm({
    defaultValues: {
      name: "",
      liveUrl: "",
      imageUrl: "",
      description: "",
    },
  });

  useEffect(() => {
    dispatch(fetchPortfolios());
  }, [dispatch]);

  useEffect(() => {
    if (selectedPortfolio) {
      dispatch(fetchProjects(selectedPortfolio));
    }
  }, [dispatch, selectedPortfolio]);

  const onCreateProject = async (data: any) => {
    if (!selectedPortfolio) return;
    try {
      const resultAction = await dispatch(
        createProject({ portfolioId: selectedPortfolio, newProject: data })
      );
      if (createProject.fulfilled.match(resultAction)) {
        setToastMessage("Project created successfully!");
        setToastVariant("default");
        setToastOpen(true);
        reset();
        setIsDialogOpen(false); // Close dialog after creating
      } else {
        const errorMessage =
          resultAction.payload?.message || "Failed to create project.";
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      setToastMessage(
        error.message || "An unknown error occurred while creating the project."
      );
      setToastVariant("destructive");
      setToastOpen(true);
    }
  };
  const onUpdateProject = async (data: any) => {
    if (!selectedPortfolio) {
      setToastMessage("No portfolio selected.");
      setToastVariant("destructive");
      setToastOpen(true);
      return;
    }
  
    if (!selectedProject || !selectedProject.id) {
      setToastMessage("No project selected for update.");
      setToastVariant("destructive");
      setToastOpen(true);
      return;
    }
  
    try {
      const resultAction = await dispatch(
        updateProject({
          portfolioId: selectedPortfolio,
          projectId: selectedProject.id, // Safely access the project ID
          updatedProject: data,
        })
      );
  
      if (updateProject.fulfilled.match(resultAction)) {
        setToastMessage("Project updated successfully!");
        setToastVariant("default");
        setToastOpen(true);
        reset();
        setIsEditMode(false);
        setIsDialogOpen(false); // Close dialog after update
  
        // Fetch projects for the selected portfolio again after the update
        await dispatch(fetchProjects(selectedPortfolio));
      } else {
        const errorMessage =
          resultAction.payload?.message || "Failed to update project.";
        throw new Error(errorMessage);
      }
    } catch (error: any) {
    //   setToastMessage(
    //     error.message || "An error occurred while updating the project."
    //   );
      setIsDialogOpen(false);
      console.log(error.message)
      await dispatch(fetchProjects(selectedPortfolio));
    //   setToastVariant("destructive");
    //   setToastOpen(true);
    }
  };
  
  
  const onDeleteProject = async () => {
    if (!selectedPortfolio || !projectToDelete) return;
    try {
      const resultAction = await dispatch(
        deleteProject({ portfolioId: selectedPortfolio, projectId: projectToDelete })
      );

      if (deleteProject.fulfilled.match(resultAction)) {
        setToastMessage("Project deleted successfully!");
        setToastVariant("default");
        setToastOpen(true);
        setIsConfirmDialogOpen(false);
        setProjectToDelete(null); // Clear the selected project for deletion
      } else {
        const errorMessage =
          resultAction.payload?.message || "Failed to delete project.";
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      setToastMessage(
        error.message || "An error occurred while deleting the project."
      );
      setToastVariant("destructive");
      setToastOpen(true);
    }
  };

  const onSelectPortfolio = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const portfolioId = e.target.value;
    setSelectedPortfolio(portfolioId);
  };

  const onEditProject = (project: any) => {
    setValue("name", project.name);
    setValue("liveUrl", project.liveUrl);
    setValue("imageUrl", project.imageUrl);
    setValue("description", project.description);

    setSelectedProject(project);
    setIsEditMode(true);
    setIsDialogOpen(true); // Open the dialog when editing
  };

  const onDeleteClick = (projectId: string) => {
    setProjectToDelete(projectId);
    setIsConfirmDialogOpen(true);
  };

  return (
    <ToastProvider swipeDirection="right">
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-semibold mb-4">Projects</h1>

        {/* Select Portfolio */}
        {portfolioLoading ? (
          <p>Loading portfolios...</p>
        ) : portfolios.length > 0 ? (
          <div className="mb-4">
            <Label htmlFor="portfolioSelect">Select Portfolio</Label>
            <select
              id="portfolioSelect"
              className="border p-2 rounded-md w-full"
              onChange={onSelectPortfolio}
              value={selectedPortfolio || ""}
            >
              <option value="">Select a portfolio</option>
              {portfolios.map((portfolio) => (
                <option key={portfolio.id} value={portfolio.id}>
                  {portfolio.fullName}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <p>You have no portfolios. Please create one first.</p>
        )}

        {/* Project Table */}
        {projectLoading ? (
          <p className="text-center text-gray-500">Loading projects...</p>
        ) : projects.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg mb-6">
              <thead>
                <tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Live URL</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {projects.map((project) => (
                  <tr
                    key={project.id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-left">
                      <span className="font-medium">{project.name}</span>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {project.liveUrl}
                      </a>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex justify-center items-center">
                        <Button
                          variant="outline"
                          className="mr-2 text-xs py-1 px-3"
                          onClick={() => onEditProject(project)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          className="text-xs py-1 px-3"
                          onClick={() => onDeleteClick(project.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No projects found for this portfolio.
          </p>
        )}

        {/* Create / Edit Project Dialog */}
        {selectedPortfolio && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setIsEditMode(false); // Reset to create mode
                  setIsDialogOpen(true); // Open dialog for new project creation
                  reset(); // Clear form
                }}
              >
                Create New Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {isEditMode ? "Edit Project" : "Create New Project"}
                </DialogTitle>
              </DialogHeader>
              <form
                onSubmit={handleSubmit(
                  isEditMode ? onUpdateProject : onCreateProject
                )}
                className="grid gap-4"
              >
                <div>
                  <Label htmlFor="name">Project Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter project name"
                    {...register("name", { required: true })}
                  />
                </div>
                <div>
                  <Label htmlFor="liveUrl">Live URL</Label>
                  <Input
                    id="liveUrl"
                    placeholder="Enter live URL"
                    {...register("liveUrl", { required: true })}
                  />
                </div>
                <div>
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    placeholder="Enter image URL"
                    {...register("imageUrl")}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="Enter project description"
                    {...register("description")}
                  />
                </div>
                <DialogFooter>
                  <Button type="submit">
                    {isEditMode ? "Update Project" : "Create Project"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}

        {/* Confirm Delete Dialog */}
        <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Delete</DialogTitle>
            </DialogHeader>
            <p>Are you sure you want to delete this project?</p>
            <DialogFooter>
              <Button variant="destructive" onClick={onDeleteProject}>
                Yes, Delete
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsConfirmDialogOpen(false)}
              >
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Toast Notifications */}
        <Toast open={toastOpen} onOpenChange={setToastOpen} variant={toastVariant}>
          <ToastTitle>{toastMessage}</ToastTitle>
        </Toast>
        <ToastViewport />
      </div>
    </ToastProvider>
  );
};

export default ProjectPage;
