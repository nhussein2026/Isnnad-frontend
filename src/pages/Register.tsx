import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/images/Isnnad-logo-red-white.svg";
import type { AppDispatch, RootState } from "../redux/store";
import { registerUser } from "../redux/slices/authSlice";
import { toast } from "sonner";
import { User, Mail, Phone, Lock } from "lucide-react";

export default function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((s: RootState) => s.auth);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Local validation
    if (!form.name || !form.email || !form.phone || !form.password) {
      toast.error("الرجاء ملء جميع الحقول المطلوبة");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("كلمة المرور وتأكيدها غير متطابقتين");
      return;
    }

    try {
      await dispatch(
        registerUser({
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
        })
      ).unwrap();
      toast.success("تم إنشاء الحساب — يرجى تسجيل الدخول");
      navigate("/login");
    } catch (err: any) {
      toast.error(err || "فشل في إنشاء الحساب");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 relative overflow-hidden">
      {/* Top-left SVG */}
      <div className="absolute top-0 left-0 m-0 opacity-80">
        <svg
          width="238"
          height="240"
          viewBox="0 0 538 540"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="scale(-1,1) translate(-538,0)">
            <path
              d="M538 0V538C438.658 438.287 282.454 404 282.454 281.5C282.454 159 111.979 110.389 2 0H538Z"
              fill="#8D1B3D"
              stroke="black"
            />
          </g>
        </svg>
      </div>

      {/* Bottom-right SVG */}
      <div className="absolute bottom-0 right-0 m-0 opacity-80">
        <svg
          width="238"
          height="240"
          viewBox="0 0 538 540"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="scale(-1,1) translate(-538,0)">
            <path
              d="M0 540L0 2C99.342 101.713 255.546 136 255.546 258.5C255.546 381 426.021 429.611 536 540L0 540Z"
              fill="#8D1B3D"
              stroke="black"
            />
          </g>
        </svg>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex justify-center">
          <img src={logo} alt="Logo" className="w-auto h-36" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          إنشاء حساب جديد
        </h1>
        <p className="text-gray-600 text-center mb-8">
          يرجى إدخال بياناتك لإنشاء حساب
        </p>

        <form onSubmit={submit} className="space-y-5">
          {/* Name */}
          <div className="w-full flex flex-col gap-2">
            <label className="text-right font-bold text-gray-800 text-sm sm:text-base">
              الاسم الكامل
            </label>
            <div className="relative w-full">
              <User className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                required
                placeholder="أدخل اسمك الكامل"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full pr-12 pl-3 py-2 border border-slate-300 bg-[#F3F3F3] rounded text-right placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
          </div>

          {/* Email */}
          <div className="w-full flex flex-col gap-2">
            <label className="text-right font-bold text-gray-800 text-sm sm:text-base">
              البريد الإلكتروني
            </label>
            <div className="relative w-full">
              <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                required
                type="email"
                placeholder="example@gmail.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full pr-12 pl-3 py-2 border border-slate-300 bg-[#F3F3F3] rounded text-right placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="w-full flex flex-col gap-2">
            <label className="text-right font-bold text-gray-800 text-sm sm:text-base">
              رقم الهاتف
            </label>
            <div className="relative w-full">
              <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                required
                placeholder="05xxxxxxxx"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full pr-12 pl-3 py-2 border border-slate-300 bg-[#F3F3F3] rounded text-right placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
          </div>

          {/* Password */}
          <div className="w-full flex flex-col gap-2">
            <label className="text-right font-bold text-gray-800 text-sm sm:text-base">
              كلمة المرور
            </label>
            <div className="relative w-full">
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                required
                type="password"
                placeholder="أدخل كلمة المرور"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full pr-12 pl-3 py-2 border border-slate-300 bg-[#F3F3F3] rounded text-right placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="w-full flex flex-col gap-2">
            <label className="text-right font-bold text-gray-800 text-sm sm:text-base">
              تأكيد كلمة المرور
            </label>
            <div className="relative w-full">
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                required
                type="password"
                placeholder="أعد كتابة كلمة المرور"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
                className="w-full pr-12 pl-3 py-2 border border-slate-300 bg-[#F3F3F3] rounded text-right placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
          </div>

          {/* Error */}
          {error && <div className="text-red-600 mb-2">{error}</div>}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="bg-[var(--primary-color)] w-full text-white font-bold flex h-[57px] px-4 py-2 justify-center items-center gap-[10px] self-stretch rounded-[6px]"
          >
            {loading ? "جارٍ إنشاء الحساب..." : "إنشاء الحساب"}
          </button>

          {/* Link to login */}
          <p className="mt-3 text-sm text-center">
            لديك حساب بالفعل؟{" "}
            <Link to="/login" className="text-sky-600">
              تسجيل الدخول
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
