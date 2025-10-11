import { ReviewsCard } from '../ui/ReviewsCard';
7;
import img from '../../assets/images/Ellipse 5.png';

export default function TestimonialsSection() {
  const comment =
    'وسع نطاق خدماتنا بشكل مدروس نقوم بمقارنة الخبرات والوظائف المتعددة ونطرح حلولاً مبتكرة يجب أن تكون فعالة وتلبي احتياجات العملاء.';

  const testimonials = [
    { name: 'علي بن زيد', rating: 4, comment: comment, image: img },
    { name: 'يوسف القاسمي', rating: 2, comment: comment, image: img },
    { name: 'أحمد العيدروس', rating: 5, comment: comment, image: img },
    { name: 'عمر السعيد', rating: 4, comment: comment, image: img },
    { name: 'فاطمة الزهراء', rating: 5, comment: comment, image: img },
    { name: 'سارة العمودي', rating: 1, comment: comment, image: img },
    { name: 'ليلى العمري', rating: 2, comment: comment, image: img },
  ];

  return (
    <section className="min-h-screen bg-white flex flex-col items-center py-16 px-10 md:px-12">
      {/* الصف الأول - بطاقتان */}
      <div className="flex flex-wrap justify-center gap-6 w-full max-w-6xl mb-6">
        {testimonials.slice(0, 2).map((item, index) => (
          <ReviewsCard key={index} item={item} />
        ))}
      </div>

      {/* الصف الثاني - ثلاث بطاقات */}
      <div className="flex flex-wrap justify-center gap-6 w-full max-w-6xl mb-6">
        {testimonials.slice(2, 5).map((item, index) => (
          <ReviewsCard key={index} item={item} />
        ))}
      </div>

      {/* الصف الثالث - بطاقتان */}
      <div className="flex flex-wrap justify-center gap-6 w-full max-w-6xl">
        {testimonials.slice(5, 7).map((item, index) => (
          <ReviewsCard key={index} item={item} />
        ))}
      </div>
    </section>
  );
}
