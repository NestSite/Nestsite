import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '@/app/api/api'; 
import { IBooking } from '@/interfaces';

export interface BookingState {
  bookings: IBooking[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BookingState = {
  bookings: [],
  status: 'idle',
  error: null,
};

export const fetchAllBookings = createAsyncThunk(
  'bookings/fetchAll',
  async () => {
    const response = await apiRequest({} as any, {} as any, '/api/v1/admin/bookings/all', 'GET');
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.message);
    }
  }
);

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBookings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllBookings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bookings = action.payload;
      })
      .addCase(fetchAllBookings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch bookings';
      });
  },
});

export default bookingSlice.reducer;
