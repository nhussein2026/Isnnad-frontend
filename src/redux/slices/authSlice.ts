import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { saveAuth, clearAuth, getToken, getStoredUser } from '../../lib/auth';
import api from '../../lib/axios';
import type { IUser } from '../../types/user';

interface AuthState {
  user: IUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: getToken(),
  user: getStoredUser(),
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await api.post('/auth/login', credentials);
      const token: string = res.data.token;
      const user: IUser = res.data.user;
      saveAuth(token, user);
      return { token, user };
    } catch (err: any) {
      const msg = err?.response?.data?.msg || err.message || 'Login failed';
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (
    payload: { name: string; email: string; phone: string; password: string },
    thunkAPI
  ) => {
    try {
      const res = await api.post('/auth/register', payload);
      // backend returns created user; we won't auto-login here
      return res.data.user ?? res.data;
    } catch (err: any) {
      const msg = err?.response?.data?.msg || err.message || 'Register failed';
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      clearAuth();
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(loginUser.fulfilled, (s, action) => {
        s.loading = false;
        s.token = action.payload.token;
        s.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (s, action) => {
        s.loading = false;
        s.error = action.payload as string;
      })
      .addCase(registerUser.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(registerUser.fulfilled, (s) => {
        s.loading = false;
      })
      .addCase(registerUser.rejected, (s, action) => {
        s.loading = false;
        s.error = action.payload as string;
      });
  },
});

export const { logout, clearError } = slice.actions;
export default slice.reducer;
