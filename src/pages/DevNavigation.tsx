interface Route {
  path: string;
  label: string;
  description: string;
}

interface RouteSectionProps {
  title: string;
  routes: Route[];
  available?: boolean;
}

const DevNavigation = () => {
  const routes = {
    public: [
      { path: '/', label: 'Home', description: 'Landing page' },
      { path: '/offers', label: 'Offers', description: 'Offers page' },
      { path: '/support', label: 'Support', description: 'Support page' },
      { path: '/login', label: 'Login', description: 'Login page' },
      {
        path: '/register',
        label: 'Register',
        description: 'Registration page',
      },
      {
        path: '/forget-password',
        label: 'Forget Password',
        description: 'Password reset page',
      },
    ],
    admin: [
      {
        path: '/admin/dashboard',
        label: 'Admin Dashboard',
        description: 'Admin home page',
      },
      {
        path: '/admin/users',
        label: 'User Management',
        description: 'Manage all users',
      },
      {
        path: '/admin/system-settings',
        label: 'System Settings',
        description: 'System configuration',
      },
      {
        path: '/admin/analytics',
        label: 'Analytics',
        description: 'System analytics',
      },
      {
        path: '/admin/settings',
        label: 'Admin Settings',
        description: 'Admin account settings',
      },
    ],
    user: [
      {
        path: '/user/dashboard',
        label: 'User Dashboard',
        description: 'User home page',
      },
      {
        path: '/user/profile',
        label: 'User Profile',
        description: 'Edit profile information',
      },
      {
        path: '/user/courses',
        label: 'My Courses',
        description: 'View enrolled courses',
      },
      {
        path: '/user/cart',
        label: 'Shopping Cart',
        description: 'Course shopping cart',
      },
      {
        path: '/user/settings',
        label: 'User Settings',
        description: 'User account settings',
      },
    ],
    tutor: [
      {
        path: '/tutor/dashboard',
        label: 'Tutor Dashboard',
        description: 'Tutor home page',
      },
      {
        path: '/tutor/students',
        label: 'Student Management',
        description: 'Manage students',
      },
      {
        path: '/tutor/courses/create',
        label: 'Create Course',
        description: 'Create new course',
      },
      {
        path: '/tutor/settings',
        label: 'Tutor Settings',
        description: 'Tutor account settings',
      },
    ],
    manager: [
      {
        path: '/manager/settings',
        label: 'Manager Settings',
        description: 'Manager account settings',
      },
    ],
    assistant: [
      {
        path: '/assistant/settings',
        label: 'Assistant Settings',
        description: 'Assistant account settings',
      },
    ],
  };

  const handleNavigation = (path: string) => {
    window.location.href = path;
  };

  const getStatusColor = (available: boolean) => {
    return available ? 'text-green-600' : 'text-red-500';
  };

  const getStatusIcon = (available: boolean) => {
    return available ? '✅' : '❌';
  };

  const RouteSection = ({
    title,
    routes: sectionRoutes,
    available = true,
  }: RouteSectionProps) => (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4 text-gray-800 border-b-2 border-gray-200 pb-2">
        {title} Routes
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sectionRoutes.map((route, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-800">{route.label}</h3>
              <span className={`text-sm ${getStatusColor(available)}`}>
                {getStatusIcon(available)}{' '}
                {available ? 'Available' : 'Coming Soon'}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">{route.description}</p>
            <div className="text-xs text-gray-500 mb-3 bg-gray-100 p-2 rounded font-mono">
              {route.path}
            </div>
            {available ? (
              <button
                onClick={() => handleNavigation(route.path)}
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors inline-block cursor-pointer"
              >
                Visit Page
              </button>
            ) : (
              <button
                disabled
                className="bg-gray-300 text-gray-500 px-3 py-1 rounded text-sm cursor-not-allowed inline-block"
              >
                Not Available
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🚧 Development Navigation Hub
          </h1>
          <p className="text-gray-600 mb-4">
            Quick access to all available routes during development. This page
            will be removed in production.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-sm">
              <strong>Note:</strong> Some routes may redirect based on
              authentication and role permissions.
              <br />
              <strong>Tip:</strong> Test different user roles by logging in with
              different accounts or modify your Redux state.
            </p>
          </div>
        </div>

        {/* Route Sections */}
        <RouteSection title="Public" routes={routes.public} available={true} />
        <RouteSection title="Admin" routes={routes.admin} available={true} />
        <RouteSection title="User" routes={routes.user} available={true} />
        <RouteSection title="Tutor" routes={routes.tutor} available={true} />
        <RouteSection
          title="Manager"
          routes={routes.manager}
          available={true}
        />
        <RouteSection
          title="Assistant"
          routes={routes.assistant}
          available={true}
        />

        {/* Coming Soon Sections */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Coming Soon (Commented Routes)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-3">
                Manager Routes (Planned)
              </h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• /manager/dashboard - Manager Dashboard</li>
                <li>• /manager/team - Team Management</li>
                <li>• /manager/projects - Project Overview</li>
                <li>• /manager/reports - Reports</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-3">
                Tutor Routes (Planned)
              </h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• /tutor/grading - Grading Center</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-semibent text-yellow-800 mb-3">
                Programmer Routes (Planned)
              </h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• /programmer/dashboard - Programmer Dashboard</li>
                <li>• /programmer/projects - Project Management</li>
                <li>• /programmer/code-review - Code Review</li>
                <li>• /programmer/tasks - Task Tracker</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-3">
                Assistant Routes (Planned)
              </h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• /assistant/dashboard - Assistant Dashboard</li>
                <li>• /assistant/tickets - Support Tickets</li>
                <li>• /assistant/user-support - User Support</li>
                <li>• /assistant/knowledge - Knowledge Base</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Quick Actions
          </h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleNavigation('/login')}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
            >
              Test Login Flow
            </button>
            <button
              onClick={() => handleNavigation('/register')}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors"
            >
              Test Registration
            </button>
            <button
              onClick={() => handleNavigation('/dashboard')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Test Dashboard Redirect
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>

        {/* Development Tips */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Development Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Testing Different Roles:
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>1. Login with different user accounts</li>
                <li>2. Use Redux DevTools to change user role in state</li>
                <li>3. Modify the mock user in components for testing</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Route Protection Testing:
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>1. Try accessing protected routes without login</li>
                <li>2. Access routes with wrong user role</li>
                <li>3. Test the 403 error pages</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>
            🔧 Development Mode - Remember to remove this page before
            production!
          </p>
          <p className="mt-2">
            <strong>File Location:</strong> pages/DevNavigation.tsx or
            components/DevNavigation.tsx
          </p>
        </div>
      </div>
    </div>
  );
};

export default DevNavigation;
