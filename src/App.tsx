import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgetPass from './pages/ForgetPass';
import OffersPage from './pages/OffersPage';
import SupportPage from './pages/SupportPage';
import { Toaster } from 'sonner';

// Dashboard Layouts for different user types
import AdminDashboardLayout from './layouts/dashboards/AdminDashboardLayout';
import UserDashboardLayout from './layouts/dashboards/UserDashboardLayout';
import ManagerDashboardLayout from './layouts/dashboards/ManagerDashboardLayout';
import ProgrammerDashboardLayout from './layouts/dashboards/ProgrammerDashboardLayout';

// Admin Dashboard Pages
import AdminHome from './pages/dashboards/admin/AdminHome';
import UserManagement from './pages/dashboards/admin/UserManagement';
import SystemSettings from './pages/dashboards/admin/SystemSettings';
import Analytics from './pages/dashboards/admin/Analytics';

// User Dashboard Pages
import UserHome from './pages/dashboards/user/UserHome';
import UserProfile from './pages/dashboards/user/UserProfile';
import UserCourses from './pages/dashboards/user/UserCourses';
import UserCourse from './pages/dashboards/user/UserCourse';
import UserCart from './pages/dashboards/user/UserCart';

// Manager Dashboard Pages
// import ManagerHome from './pages/dashboards/manager/ManagerHome';
// import TeamManagement from './pages/dashboards/manager/TeamManagement';
// import ProjectOverview from './pages/dashboards/manager/ProjectOverview';
// import Reports from './pages/dashboards/manager/Reports';

// Programmer Dashboard Pages
// import ProgrammerHome from './pages/dashboards/programmer/ProgrammerHome';
// import ProjectManagement from './pages/dashboards/programmer/ProjectManagement';
// import CodeReview from './pages/dashboards/programmer/CodeReview';
// import TaskTracker from './pages/dashboards/programmer/TaskTracker';

// Assistant Dashboard Pages
// import AssistantHome from './pages/dashboards/assistant/AssistantHome';
// import SupportTickets from './pages/dashboards/assistant/SupportTickets';
// import UserSupport from './pages/dashboards/assistant/UserSupport';
// import Knowledge from './pages/dashboards/assistant/Knowledge';

// Common Dashboard Pages
// import SettingsPage from './pages/dashboard/SettingsPage';

// Route Protection Component
import ProtectedRoute from './components/ProtectedRoute';
import RoleBasedRoute from './components/RoleBasedRoute';
import DevNavigation from './pages/DevNavigation';
import AssistantDashboardLayout from './layouts/dashboards/AssistantDashboardLayout';
import UserTask from './pages/dashboards/user/UserTask';
import CourseManagement from './pages/dashboards/admin/CourseManagement';
import TasksManagement from './pages/dashboards/admin/TasksManagement';
import AdminProfile from './pages/dashboards/admin/AdminProfile';
import MyTasks from './pages/dashboards/user/MyTasks';
import UserSettings from './pages/dashboards/user/UserSetting';
import AssistantHome from './pages/dashboards/assistant/AsistantHome';
import AssistantTasksManagement from './pages/dashboards/assistant/AssistantTasksManagment';

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget-password" element={<ForgetPass />} />
          <Route path="/dev-nav" element={<DevNavigation />} />
        </Route>

        {/* Admin Dashboard Routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={['admin']}>
                <AdminDashboardLayout />
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminHome />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="system-settings" element={<SystemSettings />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="courses" element={<CourseManagement />} />
          <Route path="tasks" element={<TasksManagement />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>

        {/* User Dashboard Routes */}
        <Route
          path="/user/*"
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={['user']}>
                <UserDashboardLayout />
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<UserHome />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="courses" element={<UserCourses />} />
          <Route path="courses/:CourseId" element={<UserCourse />} />
          <Route path="cart" element={<UserCart />} />
          <Route path="new-task" element={<UserTask />} />
          <Route path="my-tasks" element={<MyTasks />} />
          <Route path="settings" element={<UserSettings />} />
        </Route>

        {/* Manager Dashboard Routes */}
        <Route
          path="/manager/*"
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={['manager']}>
                <ManagerDashboardLayout />
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          {/* <Route path="dashboard" element={<ManagerHome />} />
          <Route path="team" element={<TeamManagement />} />
          <Route path="projects" element={<ProjectOverview />} />
          <Route path="reports" element={<Reports />} /> */}
          {/* <Route path="settings" element={<SettingsPage />} /> */}
        </Route>

        {/* Programmer Dashboard Routes */}
        <Route
          path="/programmer/*"
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={['programmer']}>
                <ProgrammerDashboardLayout />
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        >
          {/* <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<ProgrammerHome />} />
          <Route path="projects" element={<ProjectManagement />} />
          <Route path="code-review" element={<CodeReview />} />
          <Route path="tasks" element={<TaskTracker />} />
          <Route path="settings" element={<SettingsPage />} /> */}
        </Route>

        {/* Assistant Dashboard Routes */}
        <Route
          path="/assistant/*"
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={['Assistant']}>
                <AssistantDashboardLayout />
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AssistantHome />} />
          <Route path="tasks" element={<AssistantTasksManagement />} />
        </Route>

        {/* Legacy Dashboard Redirect - for backward compatibility */}
        <Route
          path="/dashboard"
          element={<Navigate to="/user/dashboard" replace />}
        />

        {/* 404 Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#f4f4f4',
            color: '#8D1B3D',
          },
        }}
      />
    </>
  );
}

export default App;
