import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  PlusCircle,
  ShoppingCart,
  Settings,
  LogOut,
  Menu,
} from 'lucide-react';
import { useState } from 'react';

export default function DashboardSidebar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const links = [
    {
      to: '/dashboard',
      label: 'لوحة التحكم',
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      to: '/dashboard/courses',
      label: 'المواد',
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      to: '/dashboard/new-task',
      label: 'إنشاء مهمة جديدة',
      icon: <PlusCircle className="h-5 w-5" />,
    },
    {
      to: '/dashboard/cart',
      label: 'سلة المهام',
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      to: '/dashboard/settings',
      label: 'الإعدادات',
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <div className="flex">
      {/* Sidebar desktop */}
      <aside className="hidden md:flex md:flex-col w-64 h-screen bg-white border-r">
        <div className="p-4 text-2xl font-bold text-primary">TaskSolver</div>
        <nav className="flex-1 flex flex-col gap-1 p-2">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 ${
                location.pathname === link.to
                  ? 'bg-gray-100 text-primary'
                  : 'text-gray-700'
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="p-4">
          <button className="flex items-center gap-3 w-full text-gray-700 hover:text-red-500">
            <LogOut className="h-5 w-5" />
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Mobile toggle */}
      <div className="md:hidden">
        <button
          className="p-2 m-2 rounded-md border text-gray-700"
          onClick={() => setOpen(!open)}
        >
          <Menu className="h-6 w-6" />
        </button>
        {open && (
          <div className="absolute z-50 top-0 left-0 w-64 h-screen bg-white border-r shadow-lg">
            <div className="p-4 text-2xl font-bold text-primary">
              TaskSolver
            </div>
            <nav className="flex-1 flex flex-col gap-1 p-2">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 ${
                    location.pathname === link.to
                      ? 'bg-gray-100 text-primary'
                      : 'text-gray-700'
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="p-4">
              <button className="flex items-center gap-3 w-full text-gray-700 hover:text-red-500">
                <LogOut className="h-5 w-5" />
                تسجيل الخروج
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
