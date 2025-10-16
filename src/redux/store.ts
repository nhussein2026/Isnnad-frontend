import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import coursesReducer from './slices/courseSlice';
import taskReducer from './slices/taskSlice';
import userReducer from './slices/userSlice';
import dashboardReducer from './slices/dashboardSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: coursesReducer,
    tasks: taskReducer,
    users: userReducer,
    dashboard: dashboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
