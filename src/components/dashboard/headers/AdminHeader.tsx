// components/dashboard/headers/AdminHeader.jsx
import { useState } from 'react';
import { Menu, Bell } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/types/user';

interface AdminHeaderProps {
  toggleSidebar: () => void;
}
const AdminHeader = ({ toggleSidebar }: AdminHeaderProps) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  //first letter of user name
  const firstLetter = user?.name?.[0]?.toUpperCase() || '?';

  const notifications = [
    {
      id: 1,
      title: 'رسالة جديدة',
      description: 'لديك رسالة من أحمد',
      time: 'منذ 10 دقائق',
    },
    {
      id: 2,
      title: 'طلب جديد',
      description: 'تم استلام طلبك رقم #1234',
      time: 'منذ ساعة',
    },
    {
      id: 3,
      title: 'تذكير',
      description: 'موعد التسليم غداً',
      time: 'منذ يوم',
    },
  ];

  return (
    <header className="bg-gray-200 shadow-md py-4 px-6">
      <div className="flex items-center justify-between">
        {/* Left side - Menu button and Search */}
        <div className="flex items-center space-x-4 space-x-reverse">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-black  hover:bg-gray-100 transition-colors duration-200"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Right side - Dark mode, Notifications and Profile */}
        <div className="flex items-center space-x-4 space-x-reverse">
          {/* Notification icon with dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 rounded-full text-gray-700  hover:bg-gray-100 transition-colors duration-200 relative"
            >
              <Bell size={20} />
              <span className="absolute top-0 left-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>

            {isNotificationsOpen && (
              <div className="absolute left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-bold text-gray-800 dark:text-white">
                    الإشعارات
                  </h3>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {notifications.map((notification) => (
                    <a
                      key={notification.id}
                      href="#"
                      className="block p-4 border-b border-gray-100 hover:bg-gray-50"
                    >
                      <p className="font-medium text-gray-800">
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {notification.description}
                      </p>
                      <p className="text-xs text-gray-400">
                        {notification.time}
                      </p>
                    </a>
                  ))}
                </div>
                <div className="p-2 border-t border-gray-200 text-center">
                  <a
                    href="#"
                    className="block py-2 text-blue-600 hover:underline"
                  >
                    عرض جميع الإشعارات
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="flex items-center">
            {user?.profilePic && !imageError ? (
              <img
                src={user?.profilePic}
                alt="Profile"
                onError={() => setImageError(true)}
                className="w-10 h-10 rounded-full border-2 border-gray-300 object-cover"
              />
            ) : (
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-gray-700 font-semibold text-sm">
                {firstLetter}
              </div>
            )}
            <div className="mr-2 hidden md:block">
              <p className="text-sm font-medium text-gray-800">{user?.name}</p>
              <p className="text-xs text-gray-500">
                {user?.role || 'مدير النظام'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
