import DashboardStats from '../../../components/dashboard/common/DashboardStats';

export default function AdminHome() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Dashboard Overview
      </h1>
      <DashboardStats />
    </div>
  );
}
