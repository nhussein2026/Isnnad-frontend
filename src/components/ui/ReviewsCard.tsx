import { Review } from '../../types/review';
import { Star } from 'lucide-react';

export function ReviewsCard({ item }: { item: Review }) {
  return (
    <div className="bg-[#F4E8EC] w-full sm:w-[45%] lg:w-[30%] max-w-md rounded-2xl shadow-md hover:shadow-lg p-6 flex flex-col justify-between transition text-right">
      <p className="text-gray-700 text-sm mb-6 leading-relaxed">
        {item.comment}
      </p>

      <div className="flex items-center justify-end gap-3">
        <div className="flex flex-col items-end">
          <span className="text-[#7b1d25] font-semibold">{item.name}</span>
          <div className="flex flex-row-reverse">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${star <= item.rating ? 'text-[#1B8D6B] fill-[#1B8D6B]' : 'text-gray-300'}`}
              />
            ))}
          </div>
        </div>
        <img
          src={item.image}
          alt="profile"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </div>
  );
}
