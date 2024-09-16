import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '@/app/api/api';
import { NextApiRequest, NextApiResponse } from 'next';

export async function getTotalStats() {
  return apiRequest({} as NextApiRequest, {} as NextApiResponse, '/api/v1/stats/totals', 'GET');
}

interface TotalsState {
  totalPortfolios: number | null;
  totalProjects: number | null;
  totalProducts: number | null;
  totalStorefronts: number | null;
  totalPaymentLinks: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: TotalsState = {
  totalPortfolios: null,
  totalProjects: null,
  totalProducts: null,
  totalStorefronts: null,
  totalPaymentLinks: null,
  loading: false,
  error: null,
};

export const fetchTotals = createAsyncThunk('totals/fetchTotals', async () => {
  const response = await getTotalStats();

  if (response.status !== 200) {
    throw new Error('Failed to fetch totals');
  }

  return {
    totalPortfolios: response.data.totals.portfolios,
    totalProjects: response.data.totals.projects,
    totalProducts: response.data.totals.products,
    totalStorefronts: response.data.totals.storefronts,
    totalPaymentLinks: response.data.totals.paymentLinks,
  };
});

const totalsSlice = createSlice({
  name: 'totals',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTotals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTotals.fulfilled, (state, action) => {
        state.totalPortfolios = action.payload.totalPortfolios;
        state.totalProjects = action.payload.totalProjects;
        state.totalProducts = action.payload.totalProducts;
        state.totalStorefronts = action.payload.totalStorefronts;
        state.totalPaymentLinks = action.payload.totalPaymentLinks;
        state.loading = false;
      })
      .addCase(fetchTotals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch totals';
      });
  },
});

export default totalsSlice.reducer;
