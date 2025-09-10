import axios from "axios";

const api = axios.create({
  baseURL: "/api", // dev proxy -> http://localhost:5000/api
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token from localStorage on each request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
