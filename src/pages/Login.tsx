import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/images/Isnnad-logo-red-white.svg';
import { Mail, Lock } from 'lucide-react';
import type { AppDispatch, RootState } from '../redux/store';
import { loginUser } from '../redux/slices/authSlice';
import { toast } from 'sonner';

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((s: RootState) => s.auth);
  const [form, setForm] = useState({ email: '', password: '' });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await dispatch(loginUser(form)).unwrap();
      toast.success('Logged in');
      const role = result.user?.role;
      // You can customize routes based on actual roles
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else if (role === 'manager') {
        navigate('/manager/dashboard');
      } else if (role === 'user') {
        navigate('/user/dashboard');
      } else {
        navigate('/dashboard'); // default for regular users
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('Login failed');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4 relative overflow-hidden">
      {/* Top-left SVG icon - Page level */}
      <div className="absolute top-0 right-0 m-0 opacity-80">
        <svg
          width="238"
          height="240"
          viewBox="0 0 538 540"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M538 0V538C438.658 438.287 282.454 404 282.454 281.5C282.454 159 111.979 110.389 2 0H538Z"
            fill="#8D1B3D"
            stroke="black"
          />
        </svg>
      </div>

      {/* Bottom-right SVG icon - Page level */}
      <div className="absolute bottom-0 left-0 m-0 opacity-80">
        <svg
          width="238"
          height="240"
          viewBox="0 0 538 540"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 540L0 2C99.342 101.713 255.546 136 255.546 258.5C255.546 381 426.021 429.611 536 540L0 540Z"
            fill="#8D1B3D"
            stroke="black"
          />
        </svg>
      </div>

      {/* Main form card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex justify-center">
          <img src={logo} alt="Logo" className="w-auto h-36" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          تسجيل الدخول
        </h1>
        <p className="text-gray-600 text-center mb-8">
          مرحبًا بعودتك! يرجى تسجيل الدخول إلى حسابك
        </p>

        <form onSubmit={submit} className="space-y-5">
          {/* Email Input */}
          <div className="w-full flex flex-col gap-2">
            {/* Label */}
            <label className="text-right font-bold text-gray-800 text-sm sm:text-base">
              البريد الإلكتروني
            </label>

            <div className="relative w-full">
              {/* Email Icon on the right */}
              <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />

              {/* Input */}
              <input
                type="email"
                placeholder="example@gmail.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="
                  w-full flex items-center justify-end gap-2 
                  pr-12 pl-3 py-2 
                  border border-slate-300 bg-[#F3F3F3] rounded 
                  text-right placeholder-gray-400 text-gray-700 
                  focus:outline-none focus:ring-2 focus:ring-slate-400
                "
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="w-full flex flex-col gap-2">
            {/* Label */}
            <label
              htmlFor="password"
              className="text-right font-bold text-gray-800 text-sm sm:text-base"
            >
              كلمة المرور
            </label>

            {/* Input wrapper */}
            <div className="relative w-full">
              {/* Lock Icon on the right */}
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />

              {/* Input */}
              <input
                id="password"
                type="password"
                placeholder="أدخل كلمة المرور"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="
            w-full pr-12 pl-3 py-2 
            border border-slate-300 bg-[#F3F3F3] rounded-md 
            text-right placeholder-gray-400 text-gray-700 
            focus:outline-none focus:ring-2 focus:ring-slate-400
          "
              />
            </div>

            {/* Forget password link */}
            <a
              href="#"
              className="text-xs sm:text-sm text-left text-blue-600 hover:underline"
            >
              هل نسيت كلمة المرور؟
            </a>
          </div>

          {error && <div className="text-red-600 mb-2">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="bg-[var(--primary-color)] w-full text-white font-bold flex h-[57px] px-4 py-2 justify-center items-center gap-[10px] self-stretch rounded-[6px]"
          >
            {loading ? '... جار تسجيل الدخول' : 'تسجيل الدخول'}
          </button>

          <p className="mt-3 text-sm text-center">
            ليس لديك حساب؟!{' '}
            <Link to="/register" className="text-sky-600">
              قم بإنشاء حسابك الآن
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
