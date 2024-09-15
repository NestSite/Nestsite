import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiRequest } from '@/app/api/api';
import { NextApiRequest, NextApiResponse } from 'next';

interface Portfolio {
  id: string;
  fullName: string;
  skill: string;
  description: string;
  profilePhoto: string;
}

interface PortfolioState {
  portfolios: Portfolio[];
  portfolio: Portfolio | null; // For fetching a single portfolio
  loading: boolean;
  error: string | null;
}

const initialState: PortfolioState = {
  portfolios: [],
  portfolio: null, // To store a single fetched portfolio
  loading: false,
  error: null,
};

// Fetch all portfolios
export const fetchPortfolios = createAsyncThunk<Portfolio[], void, { rejectValue: { message: string } }>(
  'portfolio/fetchPortfolios',
  async (_, { rejectWithValue }) => {
    const req = {} as NextApiRequest;
    const res = {} as NextApiResponse;

    const response = await apiRequest(req, res, '/api/v1/portfolio/', 'GET');

    if (response.status === 200) {
      return response.data.portfolios;
    } else {
      return rejectWithValue({
        message: response.message || 'Failed to fetch portfolios',
      });
    }
  }
);

// Fetch single portfolio by ID
export const fetchPortfolioById = createAsyncThunk<Portfolio, string, { rejectValue: { message: string } }>(
  'portfolio/fetchPortfolioById',
  async (portfolioId, { rejectWithValue }) => {
    const req = {} as NextApiRequest;
    const res = {} as NextApiResponse;

    const response = await apiRequest(req, res, `/api/v1/portfolio/${portfolioId}`, 'GET');

    if (response.status === 200) {
      return response.data.portfolio;
    } else {
      return rejectWithValue({
        message: response.message || 'Failed to fetch portfolio',
      });
    }
  }
);

// Create a portfolio
export const createPortfolio = createAsyncThunk<Portfolio, Portfolio, { rejectValue: { message: string } }>(
  'portfolio/createPortfolio',
  async (newPortfolio: Portfolio, { rejectWithValue }) => {
    const req = {} as NextApiRequest;
    const res = {} as NextApiResponse;

    const response = await apiRequest(req, res, '/api/v1/portfolio/', 'POST', newPortfolio);

    if (response.status === 201) {
      return response.data.portfolio;
    } else {
      return rejectWithValue({
        message: response.message || 'Failed to create portfolio',
      });
    }
  }
);

// Update a portfolio by ID
// Update a portfolio by ID (Allow partial updates)
export const updatePortfolio = createAsyncThunk<
  Portfolio, 
  { portfolioId: string; updatedData: Partial<Portfolio> }, // Use Partial<Portfolio> for updates
  { rejectValue: { message: string } }
>(
  'portfolio/updatePortfolio',
  async ({ portfolioId, updatedData }, { rejectWithValue }) => {
    const req = {} as NextApiRequest;
    const res = {} as NextApiResponse;

    const response = await apiRequest(req, res, `/api/v1/portfolio/${portfolioId}`, 'PUT', updatedData);

    if (response.status === 200) {
      return response.data.portfolio;
    } else {
      return rejectWithValue({
        message: response.message || 'Failed to update portfolio',
      });
    }
  }
);



const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all portfolios
      .addCase(fetchPortfolios.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPortfolios.fulfilled, (state, action: PayloadAction<Portfolio[]>) => {
        state.portfolios = action.payload;
        state.loading = false;
      })
      .addCase(fetchPortfolios.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch portfolios';
      })

      // Fetch single portfolio by ID
      .addCase(fetchPortfolioById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.portfolio = null;
      })
      .addCase(fetchPortfolioById.fulfilled, (state, action: PayloadAction<Portfolio>) => {
        state.portfolio = action.payload;
        state.loading = false;
      })
      .addCase(fetchPortfolioById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch portfolio';
      })

      // Create portfolio
      .addCase(createPortfolio.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPortfolio.fulfilled, (state, action: PayloadAction<Portfolio>) => {
        state.portfolios.push(action.payload);
        state.loading = false;
      })
      .addCase(createPortfolio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create portfolio';
      })

      // Update portfolio
      .addCase(updatePortfolio.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePortfolio.fulfilled, (state, action: PayloadAction<Portfolio>) => {
        // Update the portfolio in the portfolios array
        const index = state.portfolios.findIndex(
          (portfolio) => portfolio.id === action.payload.id
        );
        if (index !== -1) {
          state.portfolios[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updatePortfolio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update portfolio';
      });
  },
});

export default portfolioSlice.reducer;
