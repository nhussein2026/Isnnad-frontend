// components/dashboard/sidebars/ManagerSidebar.jsx
import {
  Home,
  Users,
  Settings,
  BarChart3,
  CreditCard,
  FileText,
  HelpCircle,
  LogOut,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import logo from '../../../assets/images/Isnnad-logo-red-white.svg';

interface ManagerSidebarProps {
  toggleSidebar: () => void;
  toggleDarkMode: () => void;
  isCollapsed: boolean;
}
const ManagerSidebar = ({
  isCollapsed,
  toggleSidebar,
}: ManagerSidebarProps) => {
  const menuItems = [
    { id: 1, name: 'لوحة التحكم', icon: Home, href: '#' },
    { id: 2, name: 'المستخدمين', icon: Users, href: '#' },
    { id: 3, name: 'التقارير', icon: BarChart3, href: '#' },
    { id: 4, name: 'المدفوعات', icon: CreditCard, href: '#' },
    { id: 5, name: 'المحتوى', icon: FileText, href: '#' },
    { id: 6, name: 'الإعدادات', icon: Settings, href: '#' },
    { id: 7, name: 'المساعدة', icon: HelpCircle, href: '#' },
    { id: 8, name: 'تسجيل الخروج', icon: LogOut, href: '#' },
  ];

  return (
    <div
      className={`h-screen bg-blue-900 text-white flex flex-col transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-blue-800 flex items-center justify-between">
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
          <div className="bg-white text-blue-900 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xl mx-auto">
            ش
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
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                className="flex items-center p-3 rounded-lg hover:bg-blue-800 transition-colors duration-200 group"
              >
                <item.icon
                  size={20}
                  className={`text-blue-200 group-hover:text-white ${isCollapsed ? 'mx-auto' : 'ml-2'}`}
                />
                {!isCollapsed && <span>{item.name}</span>}
                {isCollapsed && (
                  <div className="absolute right-12 bg-blue-800 text-white text-sm py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {item.name}
                  </div>
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-blue-800">
        <div
          className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}
        >
          {!isCollapsed && (
            <div className="flex items-center">
              <img
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="Profile"
                className="w-8 h-8 rounded-full border-2 border-blue-700"
              />
              <div className="mr-2">
                <p className="text-sm font-medium">محمد أحمد</p>
                <p className="text-xs text-blue-300">مدير النظام</p>
              </div>
            </div>
          )}
          {isCollapsed && (
            <img
              src="https://randomuser.me/api/portraits/men/1.jpg"
              alt="Profile"
              className="w-8 h-8 rounded-full border-2 border-blue-700 mx-auto"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagerSidebar;
