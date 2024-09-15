import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiRequest } from '@/app/api/api';
import { NextApiRequest, NextApiResponse } from 'next';

interface Storefront {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
}

interface StorefrontState {
  storefronts: Storefront[];
  storefront: Storefront | null; // Added to store single storefront data
  loading: boolean;
  error: string | null;
}

const initialState: StorefrontState = {
  storefronts: [],
  storefront: null, // Initialize storefront as null
  loading: false,
  error: null,
};

// Fetch all storefronts
export const fetchStorefronts = createAsyncThunk<Storefront[], void, { rejectValue: { message: string } }>(
  'storefront/fetchStorefronts',
  async (_, { rejectWithValue }) => {
    const req = {} as NextApiRequest;
    const res = {} as NextApiResponse;

    const response = await apiRequest(req, res, '/api/v1/storefront', 'GET');

    if (response.status === 200) {
      return response.data.storefronts;
    } else {
      return rejectWithValue({
        message: response.message || 'Failed to fetch storefronts',
      });
    }
  }
);

// Fetch a single storefront by ID
export const fetchStorefrontById = createAsyncThunk<Storefront, string, { rejectValue: { message: string } }>(
  'storefront/fetchStorefrontById',
  async (storefrontId, { rejectWithValue }) => {
    const req = {} as NextApiRequest;
    const res = {} as NextApiResponse;

    const response = await apiRequest(req, res, `/api/v1/storefront/${storefrontId}`, 'GET');

    if (response.status === 200) {
      return response.data.storefront;
    } else {
      return rejectWithValue({
        message: response.message || 'Failed to fetch storefront',
      });
    }
  }
);

// Create a storefront
export const createStorefront = createAsyncThunk<Storefront, Storefront, { rejectValue: { message: string } }>(
  'storefront/createStorefront',
  async (newStorefront: Storefront, { rejectWithValue }) => {
    const req = {} as NextApiRequest;
    const res = {} as NextApiResponse;

    const response = await apiRequest(req, res, '/api/v1/storefront', 'POST', newStorefront);

    if (response.status === 201) {
      return response.data.storefront;
    } else {
      return rejectWithValue({
        message: response.message || 'Failed to create storefront',
      });
    }
  }
);

// Update a storefront by ID
export const updateStorefront = createAsyncThunk<Storefront, { storefrontId: string; updatedData: Storefront }, { rejectValue: { message: string } }>(
  'storefront/updateStorefront',
  async ({ storefrontId, updatedData }, { rejectWithValue }) => {
    const req = {} as NextApiRequest;
    const res = {} as NextApiResponse;

    const response = await apiRequest(req, res, `/api/v1/storefront/${storefrontId}`, 'PUT', updatedData);

    if (response.status === 200) {
      return response.data.storefront;
    } else {
      return rejectWithValue({
        message: response.message || 'Failed to update storefront',
      });
    }
  }
);

// Delete a storefront by ID
export const deleteStorefront = createAsyncThunk<string, string, { rejectValue: { message: string } }>(
  'storefront/deleteStorefront',
  async (storefrontId, { rejectWithValue }) => {
    const req = {} as NextApiRequest;
    const res = {} as NextApiResponse;

    const response = await apiRequest(req, res, `/api/v1/storefront/${storefrontId}`, 'DELETE');

    if (response.status === 200) {
      return storefrontId;
    } else {
      return rejectWithValue({
        message: response.message || 'Failed to delete storefront',
      });
    }
  }
);

const storefrontSlice = createSlice({
  name: 'storefront',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all storefronts
      .addCase(fetchStorefronts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStorefronts.fulfilled, (state, action: PayloadAction<Storefront[]>) => {
        state.storefronts = action.payload;
        state.loading = false;
      })
      .addCase(fetchStorefronts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch storefronts';
      })

      // Fetch single storefront
      .addCase(fetchStorefrontById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.storefront = null; // Reset storefront before fetching
      })
      .addCase(fetchStorefrontById.fulfilled, (state, action: PayloadAction<Storefront>) => {
        state.storefront = action.payload; // Set the fetched storefront
        state.loading = false;
      })
      .addCase(fetchStorefrontById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch storefront';
      })

      // Create storefront
      .addCase(createStorefront.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStorefront.fulfilled, (state, action: PayloadAction<Storefront>) => {
        state.storefronts.push(action.payload);
        state.loading = false;
      })
      .addCase(createStorefront.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create storefront';
      })

      // Update storefront
      .addCase(updateStorefront.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStorefront.fulfilled, (state, action: PayloadAction<Storefront>) => {
        const index = state.storefronts.findIndex((storefront) => storefront.id === action.payload.id);
        if (index !== -1) {
          state.storefronts[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateStorefront.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update storefront';
      })

      // Delete storefront
      .addCase(deleteStorefront.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStorefront.fulfilled, (state, action: PayloadAction<string>) => {
        state.storefronts = state.storefronts.filter(storefront => storefront.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteStorefront.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to delete storefront';
      });
  },
});

export default storefrontSlice.reducer;
