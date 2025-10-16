const ServicesStatus = () => {
  const cards = [
    {
      title: 'عدد الخدمات المقترحة',
      count: 50,
      description:
        'هناك مجموعة من المهمات الجديدة استعرضها الآن تخص في البحث العلمي وترتيب أوراق البحث.',
    },
    {
      title: 'عدد الخدمات المرفوضة',
      count: 0,
      description:
        'هناك مجموعة من المهمات الجديدة استعرضها الآن تخص في البحث العلمي وترتيب أوراق البحث.',
    },
    {
      title: 'عدد الخدمات المقدمة',
      count: 150,
      description:
        'هناك مجموعة من المهمات الجديدة استعرضها الآن تخص في البحث العلمي وترتيب أوراق البحث.',
    },
  ];

  return (
    <div className="space-y-8 [direction:rtl]">
      {/* العنوان الرئيسي */}
      <h2 className="text-2xl font-semibold text-gray-800">الخدمات</h2>
      <hr className="text-gray-300 mb-10" />

      {/* البطاقات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-[#178A63] text-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 w-full max-w-sm  p-6 text-center"
          >
            <p className="text-4xl font-bold mb-2">{card.count}</p>
            <h3 className="text-lg font-semibold mb-3">{card.title}</h3>
            <p className="text-sm opacity-90 leading-relaxed">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesStatus;
