// layouts/dashboards/UserDashboardLayout.jsx
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import UserSidebar from '../../components/dashboard/sidebars/UserSidebar';
import UserHeader from '../../components/dashboard/headers/UserHeader';

const UserDashboardLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'dark' : ''}`}>
      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        <UserHeader
          toggleSidebar={toggleSidebar}
          toggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
        />

        <main className="flex-1 p-6 bg-gray-200  overflow-auto">
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <UserSidebar
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
      />
    </div>
  );
};

export default UserDashboardLayout;
