import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Mail, Phone, Lock, CheckCircle, XCircle, Save } from 'lucide-react';

const UserSettings = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [password, setPassword] = useState('');
  const [emailVerified, setEmailVerified] = useState(user?.isEmailVerified);
  const [phoneVerified, setPhoneVerified] = useState(user?.isPhoneVerified);

  const handleSave = () => {
    // TODO: ربط مع API لتحديث بيانات المستخدم
    console.log({ email, phone, password });
    alert('تم حفظ الإعدادات بنجاح ✅');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4" dir="rtl">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          إعدادات المستخدم
        </h1>

        {/* قسم البريد الإلكتروني */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-800">
                البريد الإلكتروني
              </h2>
            </div>
            {emailVerified ? (
              <span className="flex items-center text-green-600 text-sm font-medium">
                <CheckCircle className="w-4 h-4 ml-1" /> تم التحقق
              </span>
            ) : (
              <span className="flex items-center text-red-500 text-sm font-medium">
                <XCircle className="w-4 h-4 ml-1" /> غير مُتحقق
              </span>
            )}
          </div>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 text-gray-800"
          />

          {!emailVerified && (
            <button
              onClick={() => setEmailVerified(true)} // محاكاة عملية التحقق
              className="text-sm text-blue-600 hover:underline font-medium"
            >
              التحقق من البريد الإلكتروني
            </button>
          )}
        </div>

        {/* قسم رقم الجوال */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-800">
                رقم الجوال
              </h2>
            </div>
            {phoneVerified ? (
              <span className="flex items-center text-green-600 text-sm font-medium">
                <CheckCircle className="w-4 h-4 ml-1" /> تم التحقق
              </span>
            ) : (
              <span className="flex items-center text-red-500 text-sm font-medium">
                <XCircle className="w-4 h-4 ml-1" /> غير مُتحقق
              </span>
            )}
          </div>

          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 text-gray-800"
          />

          {!phoneVerified && (
            <button
              onClick={() => setPhoneVerified(true)} // محاكاة عملية التحقق
              className="text-sm text-blue-600 hover:underline font-medium"
            >
              التحقق من رقم الجوال
            </button>
          )}
        </div>

        {/* قسم كلمة المرور */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">
              تغيير كلمة المرور
            </h2>
          </div>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="أدخل كلمة مرور جديدة"
            className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 text-gray-800"
          />

          <p className="text-sm text-gray-500">
            يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل، وتشمل رقمًا ورمزًا.
          </p>
        </div>

        {/* زر الحفظ */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition"
          >
            <Save className="w-5 h-5" />
            حفظ التغييرات
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
