// src/redux/slices/dashboardSlice.ts
import api from '../../lib/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// --- Async Thunk ---
export const fetchDashboardStats = createAsyncThunk(
  'dashboard/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/dashboard/stats');
      return res.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to load stats'
      );
    }
  }
);

// --- Slice ---
interface DashboardState {
  stats: {
    users: number;
    courses: number;
    tasks: number;
  };
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  stats: { users: 0, courses: 0, tasks: 0 },
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default dashboardSlice.reducer;
