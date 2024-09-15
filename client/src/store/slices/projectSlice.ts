import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiRequest } from '@/app/api/api';
import { NextApiRequest, NextApiResponse } from 'next';

interface Project {
  id: string;
  portfolioId: string;
  name: string;
  liveUrl: string;
  imageUrl: string;
  description: string;
}

interface ProjectState {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  loading: false,
  error: null,
};

// Fetch projects by portfolio
export const fetchProjects = createAsyncThunk<Project[], string, { rejectValue: { message: string } }>(
  'project/fetchProjects',
  async (portfolioId, { rejectWithValue }) => {
    const req = {} as NextApiRequest;
    const res = {} as NextApiResponse;

    const response = await apiRequest(req, res, `/api/v1/${portfolioId}/projects`, 'GET');

    if (response.status === 200) {
      return response.data.projects;
    } else {
      return rejectWithValue({
        message: response.message || 'Failed to fetch projects',
      });
    }
  }
);

// Create a new project
export const createProject = createAsyncThunk<Project, { portfolioId: string; newProject: Project }, { rejectValue: { message: string } }>(
  'project/createProject',
  async ({ portfolioId, newProject }, { rejectWithValue }) => {
    const req = {} as NextApiRequest;
    const res = {} as NextApiResponse;

    const response = await apiRequest(req, res, `/api/v1/${portfolioId}/projects`, 'POST', newProject);

    if (response.status === 201) {
      return response.data.project;
    } else {
      return rejectWithValue({
        message: response.message || 'Failed to create project',
      });
    }
  }
);

// Update an existing project
export const updateProject = createAsyncThunk<Project, { portfolioId: string; projectId: string; updatedProject: Project }, { rejectValue: { message: string } }>(
  'project/updateProject',
  async ({ portfolioId, projectId, updatedProject }, { rejectWithValue }) => {
    const req = {} as NextApiRequest;
    const res = {} as NextApiResponse;

    const response = await apiRequest(req, res, `/api/v1/${portfolioId}/projects/${projectId}`, 'PUT', updatedProject);

    if (response.status === 200) {
      return response.data.project;
    } else {
      return rejectWithValue({
        message: response.message || 'Failed to update project',
      });
    }
  }
);

// Delete a project
export const deleteProject = createAsyncThunk<string, { portfolioId: string; projectId: string }, { rejectValue: { message: string } }>(
  'project/deleteProject',
  async ({ portfolioId, projectId }, { rejectWithValue }) => {
    const req = {} as NextApiRequest;
    const res = {} as NextApiResponse;

    const response = await apiRequest(req, res, `/api/v1/${portfolioId}/projects/${projectId}`, 'DELETE');

    if (response.status === 200) {
      return projectId; // Return the ID of the deleted project to remove it from the state
    } else {
      return rejectWithValue({
        message: response.message || 'Failed to delete project',
      });
    }
  }
);

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch projects
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action: PayloadAction<Project[]>) => {
        state.projects = action.payload;
        state.loading = false;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch projects';
      })

      // Create project
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action: PayloadAction<Project>) => {
        state.projects.push(action.payload);
        state.loading = false;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create project';
      })

      // Update project
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action: PayloadAction<Project>) => {
        const index = state.projects.findIndex(project => project.id === action.payload.id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update project';
      })

      // Delete project
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action: PayloadAction<string>) => {
        state.projects = state.projects.filter(project => project.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to delete project';
      });
  },
});

export default projectSlice.reducer;
