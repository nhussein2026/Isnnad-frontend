// src/api/courseApi.ts
import api from '../lib/axios';

// All course-related API calls
export const getCourses = () => api.get('/courses');
export const getCourseById = (id: string) => api.get(`/courses/${id}`);
export const createCourse = (data: any) => api.post('/courses/add', data);
console.log('courseApi loaded', createCourse);
export const updateCourse = (id: string, data: any) =>
  api.put(`/courses/${id}`, data);
export const deleteCourse = (id: string) => api.delete(`/courses/${id}`);
