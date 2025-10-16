import { ICourse } from '../../types/course';
import api from '../../lib/axios';
import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  AsyncThunkConfig,
} from '@reduxjs/toolkit';

// Types

interface CourseState {
  courses: ICourse[];
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
export const fetchCourses = createAsyncThunk<ICourse[], void, AsyncThunkConfig>(
  'courses/fetchCourses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/courses');
      return response.data.courses as ICourse[];
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch courses'
      );
    }
  }
);

export const addCourse = createAsyncThunk<
  ICourse,
  { name: string; pic: string }
>(
  'courses/addCourse',
  async (courseData: { name: string; pic: string }, { rejectWithValue }) => {
    try {
      const response = await api.post('/courses/add', courseData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to add course'
      );
    }
  }
);

export const updateCourse = createAsyncThunk<
  ICourse,
  { _id: string; name: string; pic: string }
>(
  'courses/updateCourse',
  async (
    courseData: { _id: string; name: string; pic: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put(`/courses/${courseData._id}`, {
        name: courseData.name,
        pic: courseData.pic,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update course'
      );
    }
  }
);

export const deleteCourse = createAsyncThunk<string, string>(
  'courses/deleteCourse',
  async (courseId: string, { rejectWithValue }) => {
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
      (state, action: PayloadAction<ICourse[]>) => {
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
      (state, action: PayloadAction<ICourse>) => {
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
      (state, action: PayloadAction<ICourse>) => {
        state.loading = false;
        const index = state.courses.findIndex(
          (c) => c._id === action.payload._id
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
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.courses = state.courses.filter((c) => c._id !== action.payload);
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
