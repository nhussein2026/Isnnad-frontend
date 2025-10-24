// layouts/dashboards/AssistantDashboardLayout.jsx
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AssistantHeader from '../../components/dashboard/headers/AssistantHeader';
import AssistantSidebar from '../../components/dashboard/sidebars/AssistantSidebar';

const AssistantDashboardLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="min-h-screen flex">
      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AssistantHeader toggleSidebar={toggleSidebar} />

        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <AssistantSidebar
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
      />
    </div>
  );
};

export default AssistantDashboardLayout;
