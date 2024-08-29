import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Biodata {
    id: string;
    firstName: string;
    lastName: string;
    gender: string;
    dateOfBirth: string;
    emailAddress: string;
    phoneNumber: string;
    country: string;
    state: string;
    city: string;
    address: string;
    postalCode: string;
    merchantId: string;
}

interface Merchant {
    id: string;
    username: string | null;
    email: string;
    secondaryEmail: string | null;
    role: string;
    status: string;
    emailVerified: boolean;
    profilePhoto:string;
    phoneNumber: string | null;
    address: string | null;
    countryRegion: string | null;
    twoFactorEnabled: boolean;
    createdAt: string;
    updatedAt: string;
    subscriptionPlanId: string | null;
    biodata: Biodata;
}

interface AuthState {
    token: string | null;
    merchant: Merchant | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    token: null,
    merchant: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<{ token: string; merchant: Merchant }>) => {
            state.token = action.payload.token;
            state.merchant = action.payload.merchant;
            state.isAuthenticated = true;
        },
        clearAuthData: (state) => {
            state.token = null;
            state.merchant = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setAuthData, clearAuthData } = authSlice.actions;

export default authSlice.reducer;
