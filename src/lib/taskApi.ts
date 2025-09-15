import api from './axios';

export const getTasks = () => api.get('/tasks');
export const getTaskById = (id: string) => api.get(`/tasks/${id}`);
export const createTask = (data: any) => api.post('/tasks', data);
export const updateTask = (id: string, data: any) =>
  api.put(`/tasks/${id}`, data);
export const deleteTask = (id: string) => api.delete(`/tasks/${id}`);
