import api from '../../lib/axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Types
export interface Course {
  id: number;
  name: string;
  image: string;
}

interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: CourseState = {
  courses: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/courses');
      return response.data.courses;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch courses'
      );
    }
  }
);

export const addCourse = createAsyncThunk(
  'courses/addCourse',
  async (courseData: { name: string; image: string }, { rejectWithValue }) => {
    try {
      const response = await api.post('/courses', courseData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to add course'
      );
    }
  }
);

export const updateCourse = createAsyncThunk(
  'courses/updateCourse',
  async (
    courseData: { id: number; name: string; image?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put(`/courses/${courseData.id}`, {
        name: courseData.name,
        image: courseData.image,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update course'
      );
    }
  }
);

export const deleteCourse = createAsyncThunk(
  'courses/deleteCourse',
  async (courseId: number, { rejectWithValue }) => {
    try {
      await api.delete(`/courses/${courseId}`);
      return courseId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete course'
      );
    }
  }
);

// Slice
const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch courses
    builder.addCase(fetchCourses.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchCourses.fulfilled,
      (state, action: PayloadAction<Course[]>) => {
        state.loading = false;
        state.courses = action.payload;
      }
    );
    builder.addCase(fetchCourses.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Add course
    builder.addCase(addCourse.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      addCourse.fulfilled,
      (state, action: PayloadAction<Course>) => {
        state.loading = false;
        state.courses.push(action.payload);
      }
    );
    builder.addCase(addCourse.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Update course
    builder.addCase(updateCourse.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      updateCourse.fulfilled,
      (state, action: PayloadAction<Course>) => {
        state.loading = false;
        const index = state.courses.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) {
          state.courses[index] = action.payload;
        }
      }
    );
    builder.addCase(updateCourse.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Delete course
    builder.addCase(deleteCourse.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      deleteCourse.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.courses = state.courses.filter((c) => c.id !== action.payload);
      }
    );
    builder.addCase(deleteCourse.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearError } = courseSlice.actions;
export default courseSlice.reducer;
