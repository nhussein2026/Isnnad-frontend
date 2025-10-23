// layouts/dashboards/AdminDashboardLayout.jsx
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/dashboard/sidebars/AdminSidebar';
import AdminHeader from '../../components/dashboard/headers/AdminHeader';

const AdminDashboardLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="min-h-screen flex ">
      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader toggleSidebar={toggleSidebar} />

        <main className="flex-1 p-6 bg-gray-50  overflow-auto">
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <AdminSidebar
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
      />
    </div>
  );
};

export default AdminDashboardLayout;
