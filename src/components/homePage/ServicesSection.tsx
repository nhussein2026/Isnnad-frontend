import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";


export default function ServicesSection() {
  const services = Array(8).fill({
    title: "البحث العلمي",
    description:
      " نص تجريبي لشرح محتوى الخدمة بشكل عام. يمكنك تعديل هذا النص لاحقًا بما يتناسب مع المحتوى.",
  });

  return (
    <section className="min-h-screen bg-white flex flex-col items-center py-16 px-10 md:px-17">
      {/* العنوان والزر */}
      <div className="flex flex-row-reverse items-center justify-between w-full max-w-6xl mb-12 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">خدماتنا</h2>
        <Link to="/register">
        <button className="bg-[#8d1b3d] text-white px-6 md:py-3 py-2 rounded-2xl hover:bg-[#ac224b] transition cursor-pointer text-lg shadow-md">
          اطلب الخدمة الآن
        </button>
        </Link>
      </div>

      {/* الشبكة */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-[#FFECF2] rounded-2xl shadow-md hover:shadow-lg p-6 text-center flex flex-col items-center transition"
          >
            <div className="bg-[#FFC5D6] p-3 rounded-[8px] mb-4">
              <FaSearch className="text-pink-600 text-xl" />
            </div>
            <h3 className="text-lg font-semibold  text-gray-800">
              {service.title}
            </h3>
            <div className="bg-gray-200 w-[80%] h-[2px] m-3"></div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
