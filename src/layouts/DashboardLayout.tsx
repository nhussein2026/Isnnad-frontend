import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import UserDashboardHeader from '../components/dashboard/UserDashboardHeader';
import { Outlet } from 'react-router-dom';

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <UserDashboardHeader /> {/* الهيدر في أعلى المحتوى */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
