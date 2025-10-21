// src/redux/slices/dashboardSlice.ts
import { IChartData } from '../../types/chartData';
import api from '../../lib/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IUserStats } from '../../types/UserStats';

// --- Async Thunk ---
export const fetchDashboardStats = createAsyncThunk(
  'dashboard/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/dashboard/stats');
      console.log('API Response:', res.data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to load stats'
      );
    }
  }
);

// --- Fetch Logged-in User Stats ---
export const fetchMyStats = createAsyncThunk(
  'dashboard/fetchMyStats',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/dashboard/user-stats');
      return res.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to load user stats'
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
  chartData: IChartData[];
  userStats: IUserStats | null;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  stats: { users: 0, courses: 0, tasks: 0 },
  chartData: [],
  userStats: null,
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // --- Dashboard Stats ---
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.totals; // ✅ map totals correctly
        state.chartData = action.payload.chartData; // ✅ assign chart data
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // --- User Stats ---
      .addCase(fetchMyStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyStats.fulfilled, (state, action) => {
        state.loading = false;
        state.userStats = action.payload;
      })
      .addCase(fetchMyStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default dashboardSlice.reducer;
