import api from '../../lib/axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { IUser } from '../../types/user';

// Define slice state
interface UserState {
  users: IUser[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

// ====== ASYNC THUNKS ======

// Fetch all users
export const fetchUsers = createAsyncThunk<
  IUser[],
  void,
  { rejectValue: string }
>('users/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/users');
    console.log('users slice', res.data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || 'Failed to fetch users'
    );
  }
});

// Add new user
export const addUser = createAsyncThunk<
  IUser,
  Partial<IUser>,
  { rejectValue: string }
>('users/add', async (userData, { rejectWithValue }) => {
  try {
    const res = await api.post('/users', userData);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Failed to add user');
  }
});

// Edit user
export const editUser = createAsyncThunk<
  IUser,
  { id: string; data: Partial<IUser> }
>('users/edit', async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await api.put(`/users/${id}`, data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || 'Failed to edit user'
    );
  }
});

// Delete user
export const deleteUser = createAsyncThunk<string, string>(
  'users/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/users/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to delete user'
      );
    }
  }
);

// ====== SLICE ======

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<IUser[]>) => {
          state.loading = false;
          state.users = action.payload;
        }
      )
      .addCase(fetchUsers.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add User
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Edit User
      .addCase(editUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.loading = false;
        const index = state.users.findIndex(
          (u) => u._id === action.payload._id
        );
        if (index !== -1) state.users[index] = action.payload;
      })
      .addCase(editUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.users = state.users.filter((u) => u._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
