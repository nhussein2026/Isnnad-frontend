// components/DashboardRedirect.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';

export default function DashboardRedirect() {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role-based dashboard routing
  const getDashboardPath = (role: string): string => {
    const roleRoutes = {
      admin: '/admin/dashboard',
      user: '/user/dashboard', 
      manager: '/manager/dashboard',
      tutor: '/tutor/dashboard',
      programmer: '/programmer/dashboard',
      Assistant: '/assistant/dashboard'
    };
    
    return roleRoutes[role as keyof typeof roleRoutes] || '/user/dashboard';
  };

  return <Navigate to={getDashboardPath(user.role)} replace />;
}
