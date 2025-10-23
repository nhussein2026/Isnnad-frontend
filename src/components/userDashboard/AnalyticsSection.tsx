import React, { useEffect } from 'react';
import { fetchMyStats } from '../../redux/slices/dashboardSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';

interface CircularProgressCardProps {
  value: number;
  maxValue?: number;
  label: string;
  type: 'percentage' | 'number';
  color: 'blue' | 'green' | 'purple' | 'red' | 'yellow';
  size?: 'sm' | 'md' | 'lg';
}

const CircularProgressCard: React.FC<CircularProgressCardProps> = ({
  value,
  maxValue = 100,
  label,
  type,
  color,
  size = 'md',
}) => {
  const percentage = Math.min((value / maxValue) * 100, 100);
  const circumference = 2 * Math.PI * 45;

  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-40 h-40',
  };

  const colorClasses = {
    blue: { text: 'text-[#1B8D6B]', stroke: '#1B8D6B' }, // قيد التنفيذ
    green: { text: 'text-[#8D1B3D]', stroke: '#8D1B3D' }, // تم الإنجاز
    purple: { text: 'text-[#1B8D6B]', stroke: '#1B8D6B' }, // إجمالي المهام
    red: { text: 'text-[#E2D2D6]', stroke: '#E2D2D6' }, // متأخر
    yellow: { text: 'text-yellow-600', stroke: 'yellow' }, // optional / fallback
  };

  const displayValue =
    type === 'percentage' ? `${Math.round(percentage)}%` : value.toString();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center">
      {/* الدائرة */}
      <div className={`relative ${sizeClasses[size]} mb-4`}>
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-gray-200"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={
              circumference - (percentage / 100) * circumference
            }
            strokeLinecap="round"
            className={`transition-all duration-500 ease-in-out`}
            style={{ stroke: colorClasses[color].stroke }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-2xl font-bold ${colorClasses[color].text}`}>
            {displayValue}
          </span>
        </div>
      </div>

      {/* العنوان */}
      <div className="text-center">
        <h3 className="font-semibold text-gray-700">{label}</h3>
        {type === 'number' && maxValue && (
          <p className="text-sm text-gray-500 mt-1">من {maxValue}</p>
        )}
      </div>
    </div>
  );
};

const AnalyticsSection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userStats, loading, error } = useSelector(
    (state: RootState) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchMyStats());
  }, [dispatch]);

  if (loading) return <p>جاري التحميل...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!userStats) return <p>لا توجد إحصائيات متاحة حالياً.</p>;

  // البيانات القادمة من الـ API
  const total = userStats.totalTasks || 0;
  const done = userStats.byStatus?.['تم الإنجاز'] || 0;
  const inProgress = userStats.byStatus?.['قيد التنفيذ'] || 0;
  const delayed = userStats.byStatus?.['متأخر'] || 0;

  const analyticsData = [
    {
      value: done,
      maxValue: total || 1,
      label: 'نسبة المهام المنجزة',
      type: 'percentage' as const,
      color: 'green' as const,
    },
    {
      value: inProgress,
      maxValue: total || 1,
      label: 'المهام قيد التنفيذ',
      type: 'number' as const,
      color: 'blue' as const,
    },
    {
      value: delayed,
      maxValue: total || 1,
      label: 'المهام المتأخرة',
      type: 'percentage' as const,
      color: 'red' as const,
    },
    {
      value: total,
      label: 'إجمالي المهام',
      type: 'number' as const,
      color: 'purple' as const,
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-6 mb-2" dir="rtl">
      {/* بطاقات الإحصائيات الرئيسية */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {analyticsData.map((item, index) => (
          <CircularProgressCard
            key={index}
            value={item.value}
            maxValue={item.maxValue}
            label={item.label}
            type={item.type}
            color={item.color}
            size="md"
          />
        ))}
      </div>
    </div>
  );
};

export default AnalyticsSection;
