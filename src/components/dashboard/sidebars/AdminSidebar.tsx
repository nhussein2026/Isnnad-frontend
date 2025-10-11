// components/dashboard/sidebars/AdminSidebar.jsx
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  Users,
  Settings,
  CreditCard,
  FileText,
  LogOut,
  ChevronRight,
  ChevronLeft,
  LucideIcon,
} from 'lucide-react';
import { logout } from '../../../redux/slices/authSlice';
import { toast } from 'sonner';
import logo from '../../../assets/images/Isnnad-logo-red-white.svg';
import { RootState } from '@/types/user';

interface AdminSidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

interface MenuItem {
  id: number;
  name: string;
  icon: LucideIcon;
  href: string | null;
  action: (() => void) | null;
  className?: string;
}

const AdminSidebar = ({ isCollapsed, toggleSidebar }: AdminSidebarProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = async () => {
    try {
      // Dispatch logout action
      dispatch(logout());

      // Show success message
      toast.success('تم تسجيل الخروج بنجاح');

      // Navigate to login page
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('حدث خطأ أثناء تسجيل الخروج');
    }
  };

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: 'لوحة التحكم',
      icon: Home,
      href: '/admin/dashboard',
      action: null,
    },
    {
      id: 2,
      name: 'المستخدمين',
      icon: Users,
      href: '/admin/users',
      action: null,
    },
    {
      id: 4,
      name: 'المواد',
      icon: CreditCard,
      href: '/admin/courses',
      action: null,
    },
    {
      id: 5,
      name: 'المهام',
      icon: FileText,
      href: '/admin/tasks',
      action: null,
    },
    {
      id: 6,
      name: 'الإعدادات',
      icon: Settings,
      href: '/admin/settings',
      action: null,
    },
    {
      id: 8,
      name: 'تسجيل الخروج',
      icon: LogOut,
      href: null,
      action: handleLogout,
      className: 'text-red-300 hover:text-red-100 hover:bg-red-800/20',
    },
  ];

  const renderMenuItem = (item: MenuItem) => {
    const isActive = item.href && location.pathname === item.href;
    const baseClasses = `flex items-center justify-end p-3 rounded-lg transition-colors duration-200 group ${
      isActive ? 'bg-blue-800 text-white' : 'hover:bg-gray-400 hover:text-white'
    }`;

    const itemClasses = item.className
      ? `${baseClasses} ${item.className}`
      : baseClasses;

    // If it's the logout item or has an action
    if (item.action) {
      return (
        <button
          key={item.id}
          onClick={item.action}
          className={`w-full text-right ${itemClasses}`}
        >
          <item.icon
            size={20}
            className={`${isCollapsed ? 'mx-auto' : 'ml-2'} flex-shrink-0`}
          />
          {!isCollapsed && <span className="mr-3">{item.name}</span>}
          {isCollapsed && (
            <div className="absolute right-12 bg-gray-300 text-white text-sm py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
              {item.name}
            </div>
          )}
        </button>
      );
    }

    // Regular navigation item
    return (
      <NavLink
        key={item.id}
        to={item.href || '#'}
        className={({ isActive: navIsActive }) =>
          `${itemClasses} ${navIsActive ? 'bg-gray-400 text-white' : ''}`
        }
      >
        {!isCollapsed && <span className="mr-3">{item.name}</span>}

        <item.icon
          size={20}
          className={`${isCollapsed ? 'mx-auto' : 'ml-2'} flex-shrink-0`}
        />
        {isCollapsed && (
          <div className="absolute right-12 bg-gray-600 text-white text-sm py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
            {item.name}
          </div>
        )}
      </NavLink>
    );
  };

  return (
    <div
      className={`h-screen bg-gray-300 text-gray-900 flex flex-col transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b flex items-center justify-center">
        {!isCollapsed && (
          <div className="flex items-center">
            {/* Logo */}
            <img
              src={logo}
              alt="Website Logo"
              className="w-[83.228px] aspect-[83.23/48] self-stretch object-cover"
            />
          </div>
        )}
        {isCollapsed && (
          <div className=" w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xl mx-auto">
            {/* Logo */}
            <img
              src={logo}
              alt="Website Logo"
              className="w-[83.228px] aspect-[83.23/48] self-stretch object-cover"
            />
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="text-blue-200 hover:text-white transition-colors duration-200"
        >
          {isCollapsed ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {/* Sidebar Menu */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2 ">
          {menuItems.map((item) => (
            <li key={item.id}>{renderMenuItem(item)}</li>
          ))}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-blue-800">
        <div
          className={`flex items-center ${
            isCollapsed ? 'justify-center' : 'justify-between'
          }`}
        >
          {!isCollapsed && (
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full border-2 border-gray-500 bg-gray-400 flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                </span>
              </div>
              <div className="mr-3">
                <p className="text-sm font-medium ml-1">{user?.name}</p>
                <p className="text-xs text-gray-900 capitalize ml-1">
                  {user?.role === 'admin' ? 'مدير النظام' : user?.role}
                </p>
              </div>
            </div>
          )}
          {isCollapsed && (
            <div className="w-8 h-8 rounded-full border-2 border-blue-700 bg-blue-600 flex items-center justify-center mx-auto">
              <span className="text-white text-sm font-medium">
                {user?.name?.charAt(0)?.toUpperCase() || 'A'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
