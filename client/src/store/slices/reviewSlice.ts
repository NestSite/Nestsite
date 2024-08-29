import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiRequest } from '@/app/api/api';
import { NextApiRequest, NextApiResponse } from 'next';

interface Review {
  id: string;
  noOfStars: number;
  note: string;
  taskType: string;
  productImages: string[];
  serviceId: string;
  reviewerId: string;
  createdAt: string;
  updatedAt: string;
  service: {
    id: string;
    title: string;
    tasks: string[];
    gender: string;
    standardHourlyRate: number;
    discountedRate: number;
    createdAt: string;
    updatedAt: string;
    status: string;
    merchantId: string;
    merchant: {
      id: string;
      username: string | null;
      email: string;
      profilePhoto: string | null;
      role: string;
      status: string;
      emailVerified: boolean;
      phoneNumber: string | null;
      address: string | null;
      countryRegion: string | null;
      twoFactorEnabled: boolean;
      createdAt: string;
      updatedAt: string;
    };
  };
  reviewer: {
    id: string;
    username: string | null;
    email: string;
    profilePhoto: string | null;
    role: string;
    status: string;
    emailVerified: boolean;
    phoneNumber: string | null;
    address: string | null;
    countryRegion: string | null;
    twoFactorEnabled: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

interface ReviewState {
  reviews: Review[];
  loading: boolean;
  error: string | null;
}

const initialState: ReviewState = {
  reviews: [],
  loading: false,
  error: null,
};

// Async thunk to fetch reviews
export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async (_, { rejectWithValue }) => {
    const req = {} as NextApiRequest;
    const res = {} as NextApiResponse;

    const response = await apiRequest(req, res, '/api/v1/admin/reviews/all', 'GET');

    if (response.status === 200) {
      return response.data;
    } else {
      return rejectWithValue(response.message);
    }
  }
);

// Async thunk to delete a review
export const deleteReview = createAsyncThunk(
  'reviews/deleteReview',
  async (reviewId: string, { rejectWithValue }) => {
    const req = {} as NextApiRequest;
    const res = {} as NextApiResponse;

    const response = await apiRequest(req, res, `/api/v1/admin/reviews/${reviewId}`, 'DELETE');

    if (response.status === 200) {
      return reviewId;
    } else {
      return rejectWithValue(response.message);
    }
  }
);

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action: PayloadAction<Review[]>) => {
        state.reviews = action.payload;
        state.loading = false;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteReview.fulfilled, (state, action: PayloadAction<string>) => {
        state.reviews = state.reviews.filter((review) => review.id !== action.payload);
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default reviewSlice.reducer;
