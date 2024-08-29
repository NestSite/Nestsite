import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTotalBookings, getTotalMerchants, getTotalCommunities } from '@/app/api/dashboard/totals';

interface TotalsState {
  totalBookings: number | null;
  totalMerchants: number | null;
  totalCommunities: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: TotalsState = {
  totalBookings: null,
  totalMerchants: null,
  totalCommunities: null,
  loading: false,
  error: null,
};

export const fetchTotals = createAsyncThunk('totals/fetchTotals', async () => {
  const bookingsResponse = await getTotalBookings();
  const merchantsResponse = await getTotalMerchants();
  const communitiesResponse = await getTotalCommunities();

  if (
    bookingsResponse.status !== 200 ||
    merchantsResponse.status !== 200 ||
    communitiesResponse.status !== 200
  ) {
    throw new Error('Failed to fetch totals');
  }

  return {
    totalBookings: bookingsResponse.data.totalBookings,
    totalMerchants: merchantsResponse.data.totalMerchants,
    totalCommunities: communitiesResponse.data.totalCommunities,
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
        state.totalBookings = action.payload.totalBookings;
        state.totalMerchants = action.payload.totalMerchants;
        state.totalCommunities = action.payload.totalCommunities;
        state.loading = false;
      })
      .addCase(fetchTotals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch totals';
      });
  },
});

export default totalsSlice.reducer;
