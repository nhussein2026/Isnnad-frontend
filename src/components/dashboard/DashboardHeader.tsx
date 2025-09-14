import { Link, useLocation } from "react-router-dom";
import { Bell, PlusCircle, User } from "lucide-react";

export default function DashboardHeader() {
  const location = useLocation();

  // استخراج اسم الصفحة من المسار
  const pageTitle = (() => {
    if (location.pathname === "/dashboard") return "لوحة التحكم";
    if (location.pathname.includes("subjects")) return "المواد";
    if (location.pathname.includes("new-task")) return "إنشاء مهمة جديدة";
    if (location.pathname.includes("cart")) return "سلة المهام";
    if (location.pathname.includes("settings")) return "إعدادات الحساب";
    return "";
  })();

  return (
    <header className="flex items-center justify-between border-b bg-white px-4 py-3 shadow-sm">
      <h1 className="text-lg font-semibold text-gray-800">{pageTitle}</h1>
      
      <div className="flex items-center gap-3">
        {/* زر إضافة مهمة جديدة أو مادة حسب الصفحة */}
        <Link
          to="/dashboard/new-task"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-white text-sm hover:bg-primary/90"
        >
          <PlusCircle className="h-4 w-4" />
          مهمة جديدة
        </Link>

        {/* أيقونة الإشعارات */}
        <button className="relative text-gray-700 hover:text-primary">
          <Bell className="h-5 w-5" />
          {/* نقطة الإشعار */}
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* صورة أو أيقونة المستخدم */}
        <Link to="/dashboard/settings" className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="h-4 w-4 text-gray-600" />
          </div>
        </Link>
      </div>
    </header>
  );
}
