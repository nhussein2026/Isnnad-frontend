// src/redux/slices/courseSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from '../../lib/courseApi';

export const fetchCourses = createAsyncThunk('courses/fetchAll', async () => {
  const { data } = await getCourses();
  return data.courses;
});

export const fetchCourseById = createAsyncThunk(
  'courses/fetchById',
  async (id: string) => {
    const { data } = await getCourseById(id);
    return data.course;
  }
);

export const addCourse = createAsyncThunk(
  'courses/add',
  async (courseData: any) => {
    const { data } = await createCourse(courseData);
    return data.course;
  }
);

export const editCourse = createAsyncThunk(
  'courses/edit',
  async ({ id, updates }: { id: string; updates: any }) => {
    const { data } = await updateCourse(id, updates);
    return data.course;
  }
);

export const removeCourse = createAsyncThunk(
  'courses/delete',
  async (id: string) => {
    await deleteCourse(id);
    return id;
  }
);

const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    items: [] as any[],
    selected: null as any,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error fetching courses';
      })

      // Fetch one
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.selected = action.payload;
      })

      // Add
      .addCase(addCourse.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // Edit
      .addCase(editCourse.fulfilled, (state, action) => {
        const idx = state.items.findIndex((c) => c._id === action.payload._id);
        if (idx >= 0) state.items[idx] = action.payload;
      })

      // Delete
      .addCase(removeCourse.fulfilled, (state, action) => {
        state.items = state.items.filter((c) => c._id !== action.payload);
      });
  },
});

export default courseSlice.reducer;
