import { useState } from 'react';
import '../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/images/Isnnad-logo-red-white.svg';
import type { AppDispatch, RootState } from '../redux/store';
import { registerUser } from '../redux/slices/authSlice';
import { toast } from 'sonner';
import { User, Mail, Phone, Lock } from 'lucide-react';

const COUNTRY_CODE = '+974';

export default function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((s: RootState) => s.auth);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Local validation
    if (!form.name || !form.email || !form.phone || !form.password) {
      toast.error('الرجاء ملء جميع الحقول المطلوبة');
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error('كلمة المرور وتأكيدها غير متطابقتين');
      return;
    }

    try {
      await dispatch(
        registerUser({
          name: form.name,
          email: form.email,
          phone: `${COUNTRY_CODE}${form.phone}`,
          password: form.password,
        })
      ).unwrap();
      toast.success('تم إنشاء الحساب — يرجى تسجيل الدخول');
      navigate('/login');
    } catch (err: any) {
      toast.error(err || 'فشل في إنشاء الحساب');
    }
  };

  return (
    <div className="min-h-5/6 flex items-center justify-center bg-white relative overflow-hidden">
      {/* Top-left SVG */}
      <div className="absolute top-0 left-0 m-0 opacity-80 ">
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
          إنشاء حساب
        </h1>
        <span className="block border-b border-b-[#94A3B84D] my-4 p-2" />

        <form onSubmit={submit} className="space-y-5">
          {/* Name */}
          <div className="w-full flex flex-col">
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
          <div className="w-full flex flex-col">
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

          {/* Phone with Country Code */}
          <div className="w-full flex flex-col">
            <label className="text-right font-bold text-gray-800 text-sm sm:text-base">
              رقم الهاتف
            </label>
            <div className="relative w-full flex items-center">
              {/* Country Code with Flag - Static Display */}
              <div className="flex items-center justify-center w-24 h-10.5 pr-2 pl-2 py-2 border border-slate-300 bg-gray-200 rounded-l gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="37"
                  height="29"
                  viewBox="0 0 37 29"
                  fill="none"
                >
                  <g clip-path="url(#clip0_479_1402)">
                    <path
                      d="M0 0.594971H37V28.595H0V0.594971Z"
                      fill="#8D1B3D"
                    />
                    <path
                      d="M0 0.594971V28.595H9.1575L14.8116 27.0375L9.1575 25.4858L14.8058 23.9283L9.1575 22.3708L14.8058 20.8191L9.1575 19.2616L14.8116 17.7041L9.1575 16.1525L14.8058 14.595L9.1575 13.0375L14.8058 11.4858L9.1575 9.9283L14.8116 8.3708L9.1575 6.81914L14.8058 5.26164L9.1575 3.70414L14.8116 2.15247L9.15172 0.594971H0Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_479_1402">
                      <rect
                        width="37"
                        height="28"
                        fill="white"
                        transform="translate(0 0.594971)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <span className="text-gray-700 font-medium">
                  {COUNTRY_CODE}
                </span>
              </div>
              {/* Phone Number */}
              <div className="relative flex-1">
                <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  required
                  type="number"
                  placeholder="3xxx xxxx"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full pr-12 pl-3 py-2 border border-slate-300 border-l-0 bg-[#F3F3F3] rounded-r text-right placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-400 no-spinner"
                />
              </div>
            </div>
          </div>

          {/* Password */}
          <div className="w-full flex flex-col">
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
          <div className="w-full flex flex-col">
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
            className="bg-[var(--primary-color)] w-full text-white font-bold flex h-[48px] px-4 py-2 justify-center items-center gap-[10px] self-stretch rounded-[6px]"
          >
            {loading ? 'جارٍ إنشاء الحساب...' : 'إنشاء الحساب'}
          </button>

          {/* Link to login */}
          <p className="mt-3 text-sm text-center">
            لديك حساب بالفعل؟{' '}
            <Link to="/login" className="text-sky-600">
              تسجيل الدخول
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
