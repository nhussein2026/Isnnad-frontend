import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* add more routes here */}
      </Routes>
    //      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
    //   <div className="bg-white p-8 rounded-lg shadow-xl">
    //     <h1 className="text-3xl font-bold text-gray-800 mb-4">
    //       Hello Tailwind! 🎉
    //     </h1>
    //     <p className="text-gray-600">
    //       If you can see this styled text, Tailwind CSS is working perfectly!
    //     </p>
    //     <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
    //       Click me!
    //     </button>
    //   </div>
    // </div>
  );
}
