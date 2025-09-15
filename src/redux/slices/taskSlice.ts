import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as taskApi from '../../lib/taskApi';

export const fetchTasks = createAsyncThunk('tasks/fetchAll', async () => {
  const { data } = await taskApi.getTasks();
  return data.tasks;
});

export const addTask = createAsyncThunk('tasks/add', async (taskData: any) => {
  const { data } = await taskApi.createTask(taskData);
  return data.task;
});

export const editTask = createAsyncThunk(
  'tasks/edit',
  async ({ id, updates }: { id: string; updates: any }) => {
    const { data } = await taskApi.updateTask(id, updates);
    return data.task;
  }
);

export const removeTask = createAsyncThunk(
  'tasks/delete',
  async (id: string) => {
    await taskApi.deleteTask(id);
    return id;
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [] as any[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (s, action) => {
        s.loading = false;
        s.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (s, action) => {
        s.loading = false;
        s.error = action.error.message ?? 'Error fetching tasks';
      })
      .addCase(addTask.fulfilled, (s, action) => {
        s.items.push(action.payload);
      })
      .addCase(editTask.fulfilled, (s, action) => {
        const i = s.items.findIndex((t) => t._id === action.payload._id);
        if (i >= 0) s.items[i] = action.payload;
      })
      .addCase(removeTask.fulfilled, (s, action) => {
        s.items = s.items.filter((t) => t._id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
