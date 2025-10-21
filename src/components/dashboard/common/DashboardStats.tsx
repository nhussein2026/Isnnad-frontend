// src/components/DashboardStats.tsx
import { fetchDashboardStats } from '../../../redux/slices/dashboardSlice';
import { AppDispatch, RootState } from '@/redux/store';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const DashboardStats: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { stats, loading, error } = useSelector(
    (state: RootState) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  if (loading)
    return <p className="text-gray-500">Loading dashboard data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
      <div className="bg-white shadow rounded-xl p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-700">Users</h3>
        <p className="text-3xl font-bold text-blue-600">{stats?.users}</p>
      </div>
      <div className="bg-white shadow rounded-xl p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-700">Courses</h3>
        <p className="text-3xl font-bold text-green-600">{stats?.courses}</p>
      </div>
      <div className="bg-white shadow rounded-xl p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-700">Tasks</h3>
        <p className="text-3xl font-bold text-purple-600">{stats?.tasks}</p>
      </div>
    </div>
  );
};

export default DashboardStats;
