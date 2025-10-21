import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';
import { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { fetchDashboardStats } from '../../../redux/slices/dashboardSlice';

const AnalyticsSection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { stats, chartData, loading, error } = useSelector(
    (state: RootState) => state.dashboard
  );

  const [period, setPeriod] = useState('آخر ثلاثة أشهر');

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  // 🧮 Filter chart data by period (optional)
  const filteredData = useMemo(() => {
    if (!chartData?.length) return [];
    const totalWeeks = chartData.length;

    switch (period) {
      case 'آخر أسبوع':
        return chartData.slice(-1);
      case 'آخر شهر':
        return chartData.slice(-4);
      default:
        return chartData.slice(-12, totalWeeks); // last 3 months approx
    }
  }, [chartData, period]);

  // 🧩 Totals
  const totalUsers = stats?.users ?? 0;
  const totalCourses = stats?.courses ?? 0;
  const totalTasks = stats?.tasks ?? 0;

  return (
    <div className="bg-white rounded-2xl shadow p-6 w-full mb-15">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="border border-gray-300 rounded-3xl md:px-5 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>آخر أسبوع</option>
          <option>آخر شهر</option>
          <option>آخر ثلاثة أشهر</option>
        </select>

        <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 text-center sm:text-right">
          <div>
            <p className="text-gray-500 text-sm">عدد المستخدمين</p>
            <p className="text-2xl font-bold">{totalUsers.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">عدد الدورات</p>
            <p className="text-2xl font-bold">
              {totalCourses.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">عدد المهام</p>
            <p className="text-2xl font-bold">{totalTasks.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Loading & Error States */}
      {loading && (
        <div className="flex items-center justify-center h-64 text-gray-400">
          جاري تحميل البيانات...
        </div>
      )}

      {error && !loading && (
        <div className="flex items-center justify-center h-64 text-red-500">
          {error}
        </div>
      )}

      {!loading && !error && filteredData.length > 0 && (
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="usersColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="coursesColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="tasksColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f87171" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />

              <Area
                type="monotone"
                dataKey="users"
                name="المستخدمين"
                stroke="#60a5fa"
                fill="url(#usersColor)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="courses"
                name="الدورات"
                stroke="#34d399"
                fill="url(#coursesColor)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="tasks"
                name="المهام"
                stroke="#f87171"
                fill="url(#tasksColor)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default AnalyticsSection;
