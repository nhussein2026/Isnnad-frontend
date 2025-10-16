// redux/slices/authSlice.ts - Updated auth slice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { saveAuth, clearAuth, getToken, getStoredUser } from '../../lib/auth';
import api from '../../lib/axios';
import type { IUser } from '../../types/user';
import { normalizeUser } from '../../lib/utils';

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
      const user: IUser = normalizeUser(res.data.user);
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
    payload: {
      name: string;
      email: string;
      phone: string;
      password: string;
      role?:
        | 'admin'
        | 'user'
        | 'manager'
        | 'tutor'
        | 'programmer'
        | 'Assistant';
    },
    thunkAPI
  ) => {
    try {
      const res = await api.post('/auth/register', {
        ...payload,
        role: payload.role || 'user', // Default to user role
      });
      return res.data.user ?? res.data;
    } catch (err: any) {
      const msg = err?.response?.data?.msg || err.message || 'Register failed';
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

// New thunk for updating user profile
export const updateUserProfile = createAsyncThunk(
  'auth/updateProfile',
  async (
    payload: Partial<Pick<IUser, 'name' | 'email' | 'phone' | 'profilePic'>>,
    thunkAPI
  ) => {
    try {
      const res = await api.put('/auth/profile', payload);
      const updatedUser: IUser = res.data.user;

      // Update stored user
      const state = thunkAPI.getState() as { auth: AuthState };
      if (state.auth.token) {
        saveAuth(state.auth.token, updatedUser);
      }

      return updatedUser;
    } catch (err: any) {
      const msg = err?.response?.data?.msg || err.message || 'Update failed';
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

// New thunk for changing password
export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (
    payload: { currentPassword: string; newPassword: string },
    thunkAPI
  ) => {
    try {
      await api.put('/auth/change-password', payload);
      return { success: true };
    } catch (err: any) {
      const msg =
        err?.response?.data?.msg || err.message || 'Password change failed';
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
    updateUserRole(state, action) {
      if (state.user) {
        state.user.role = action.payload;
        // Update stored user
        if (state.token) {
          saveAuth(state.token, state.user);
        }
      }
    },
    setUser(state, action) {
      state.user = action.payload;
      if (state.token) {
        saveAuth(state.token, action.payload);
      }
    },
  },
  extraReducers(builder) {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update profile cases
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Change password cases
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError, updateUserRole, setUser } = slice.actions;

// Selectors
export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectUserRole = (state: { auth: AuthState }) =>
  state.auth.user?.role;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  !!state.auth.token;
export const selectAuthLoading = (state: { auth: AuthState }) =>
  state.auth.loading;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;

export default slice.reducer;
