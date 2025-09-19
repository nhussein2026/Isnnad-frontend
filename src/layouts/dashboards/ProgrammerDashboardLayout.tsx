
// layouts/dashboards/programmerDashboardLayout.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/dashboard/sidebars/AdminSidebar';
import AdminHeader from '../../components/dashboard/headers/AdminHeader';

const programmerDashboardLayout = () => {
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
        <AdminHeader 
          toggleSidebar={toggleSidebar} 
          toggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
        />
        
        <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900 overflow-auto">
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

export default programmerDashboardLayout;