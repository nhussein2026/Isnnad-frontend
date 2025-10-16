import { ListTodo } from 'lucide-react';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const SiteStatus = () => {
  const data = [
    { name: 'مكتملة', value: 25 },
    { name: 'قيد الإنجاز', value: 20 },
    { name: 'قيد الآن', value: 15 },
    { name: 'مستبعدة', value: 10 },
    { name: 'جديدة', value: 30 },
  ];

  const COLORS = ['#A63D5A', '#7A1C38', '#4A0E23', '#C07A8C', '#E4B8C1'];

  const cards = [
    {
      title: 'حالة المهام وعددها',
      subtitle: 'يناير - يونيو 2025',
      type: 'المهام',
    },
    {
      title: 'الطلاب في المنصة',
      subtitle: 'يناير - يونيو 2025',
      type: 'الطلاب',
    },
    {
      title: 'حالة المهام وعددها',
      subtitle: 'يناير - يونيو 2025',
      type: 'المعلم',
    },
    {
      title: 'حالة المهام وعددها',
      subtitle: 'يناير - يونيو 2025',
      type: 'المعلم',
    },
  ];

  return (
    <div className="space-y-6 [direction:rtl]">
      <h2 className="text-2xl font-semibold text-gray-800">حالة الموقع</h2>
      <hr className="text-gray-300 mb-10" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 ">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-0 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-start gap-2 px-4 pt-3 pb-2 border-b border-gray-100">
              <ListTodo color="#737373" size={18} />
              <span className="text-sm text-[#737373]">{card.type}</span>
            </div>

            {/* Content */}
            <div className="flex flex-col items-start p-4">
              <h3 className="text-base font-semibold text-gray-800 mb-1">
                {card.title}
              </h3>
              <p className="text-sm text-gray-500 mb-4">{card.subtitle}</p>

              <div className="w-full h-44">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={data}
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {data.map((_, i) => (
                        <Cell
                          key={`cell-${i}`}
                          fill={COLORS[i % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="flex flex-wrap justify-center mt-3 md:p-5 p-2 gap-x-3 gap-y-1 text-xs">
                {data.map((item, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <span
                      className="inline-block w-2 h-2 rounded-sm"
                      style={{ backgroundColor: COLORS[i] }}
                    ></span>
                    <span className="text-gray-600">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SiteStatus;
