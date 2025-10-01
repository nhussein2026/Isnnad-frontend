import { useState } from 'react';
import logo from '../assets/images/Isnnad-logo-red-white.svg';
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt with:', { email, password, rememberMe });
    // Add your authentication logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 relative overflow-hidden">
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

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              البريد الإلكتروني
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  ></path>
                </svg>
              </div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="example@gmail.com"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              كلمة المرور
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  ></path>
                </svg>
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="********"
                required
              />
            </div>
          </div>

          {/* Remember me & Forgot password */}
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-700"
              >
                تذكرني
              </label>
            </div>
            <a
              href="#"
              className="text-sm text-blue-600 hover:text-indigo-500 transition"
            >
              نسيت كلمة المرور؟
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="bg-[var(--primary-color)] w-full text-white font-bold flex h-[57px] px-4 py-2 justify-center items-center gap-[10px] self-stretch rounded-[6px]"
          >
            دخول
          </button>

          {/* Register Link */}
          <div className="text-center text-sm text-gray-600">
            ليس لديك حساب؟{' '}
            <a
              href="#"
              className="text-blue-600 font-medium hover:text-indigo-500 transition"
            >
              إنشاء حساب
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
