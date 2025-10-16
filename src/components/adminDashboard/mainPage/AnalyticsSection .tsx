import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { useState, useMemo } from 'react';
import { DataPoint } from '../../../types/data';
import { PeriodType } from '../../../types/period';
import { Totals } from '../../../types/totals';

const AnalyticsSection = () => {
  const [period, setPeriod] = useState<PeriodType>('آخر ثلاثة أشهر');

  const allData: DataPoint[] = [
    { date: 'يونيو 20', visitors: 300, orders: 200 },
    { date: 'يونيو 25', visitors: 500, orders: 300 },
    { date: 'يوليو 1', visitors: 800, orders: 450 },
    { date: 'يوليو 10', visitors: 900, orders: 600 },
    { date: 'يوليو 20', visitors: 700, orders: 500 },
    { date: 'أغسطس 5', visitors: 850, orders: 650 },
    { date: 'أغسطس 10', visitors: 600, orders: 400 },
    { date: 'أغسطس 20', visitors: 700, orders: 500 },
    { date: 'سبتمبر 5', visitors: 900, orders: 700 },
    { date: 'أكتوبر 10', visitors: 750, orders: 600 },
  ];

  const filterDataByPeriod = (period: PeriodType): DataPoint[] => {
    if (period === 'آخر أسبوع') return allData.slice(-2);
    if (period === 'آخر شهر') return allData.slice(-4);
    return allData;
  };

  const getTotals = (data: DataPoint[]): Totals => {
    const totalVisitors = data.reduce((sum, item) => sum + item.visitors, 0);
    const totalOrders = data.reduce((sum, item) => sum + item.orders, 0);
    return { totalVisitors, totalOrders };
  };

  const filteredData = useMemo(() => filterDataByPeriod(period), [period]);
  const { totalVisitors, totalOrders } = useMemo(
    () => getTotals(filteredData),
    [filteredData]
  );

  return (
    <div className="bg-white rounded-2xl shadow p-6 w-full mb-15">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value as PeriodType)}
          className="border border-gray-300 rounded-3xl md:px-5 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>آخر أسبوع</option>
          <option>آخر شهر</option>
          <option>آخر ثلاثة أشهر</option>
        </select>

        <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 text-center sm:text-right">
          <div>
            <p className="text-gray-500 text-sm">عدد الزوار</p>
            <p className="text-2xl font-bold">
              {totalVisitors.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">عدد الطلبات</p>
            <p className="text-2xl font-bold">{totalOrders.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="visitorsColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="ordersColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f87171" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="visitors"
              stroke="#60a5fa"
              fill="url(#visitorsColor)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="orders"
              stroke="#f87171"
              fill="url(#ordersColor)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsSection;
