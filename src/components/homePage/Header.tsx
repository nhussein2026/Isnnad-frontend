import illustration from '../../assets/images/Research paper-amico.svg'; // ضع مسار الرسم التوضيحي هنا
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const phrases = ['فيديو', 'عرض تقديمي', 'مشروع', 'بحث علمي'];
  const typingSpeed = 100; // سرعة كتابة الحروف
  const erasingSpeed = 50; // سرعة مسح الحروف
  const delayBeforeErase = 1000; // الانتظار بعد اكتمال النص قبل المسح

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    let timeout: number | undefined;

    if (!isDeleting && charIndex < phrases[currentPhraseIndex].length) {
      // كتابة النص حرف حرف
      timeout = setTimeout(() => {
        setCharIndex((prev) => prev + 1);
        setDisplayedText(phrases[currentPhraseIndex].slice(0, charIndex + 1));
      }, typingSpeed);
    } else if (
      !isDeleting &&
      charIndex === phrases[currentPhraseIndex].length
    ) {
      // انتظر قبل البدء بالمسح
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, delayBeforeErase);
    } else if (isDeleting && charIndex > 0) {
      // مسح النص حرف حرف
      timeout = setTimeout(() => {
        setCharIndex((prev) => prev - 1);
        setDisplayedText(phrases[currentPhraseIndex].slice(0, charIndex - 1));
      }, erasingSpeed);
    } else if (isDeleting && charIndex === 0) {
      // انتقل للنص التالي
      setIsDeleting(false);
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentPhraseIndex, phrases]);

  return (
    <header className="w-full h-[85vh] mx-auto px-4 flex flex-col-reverse md:flex-row-reverse items-center justify-center">
      {/* النص على الجهة اليمنى */}
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-end justify-center mt-6 md:mt-0 text-center md:text-right md:px-10 md:pr-17 px-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 leading-relaxed">
          <span className="text-[#8d1b3d]">منصة أسناد</span> تساعدك في الوصول
         إلى هدفك من خلال مساعدتك في إنجاز مهامك مهما كانت{' '} <br />
          <span className="inline-block w-[2px] md:h-8 h-6 bg-[#8d1b3d] ml-1 animate-blink"></span>
          <span className="text-[#8d1b3d]">{displayedText}</span>
        </h1>
        <Link to={'/register'}>
          <button className="bg-[#8d1b3d] text-white px-5 py-2.5 rounded-lg hover:bg-[#ac224b] transition cursor-pointer">
            ابدأ الآن
          </button>
        </Link>
      </div>

      {/* الرسم التوضيحي على الجهة اليسرى */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-center px-4">
        <img
          src={illustration}
          alt="Illustration"
          className="w-2/3 md:w-3/4 max-w-md"
        />
      </div>

      {/* زر التمرير للأسفل */}
      <button className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-[#8d1b3d] text-white p-3 rounded-full shadow-lg hover:bg-[#ac224b] transition animate-bounce cursor-pointer">
        ⬇
      </button>

      {/* TailwindCSS animation للـ Cursor */}
      <style>
        {`
          @keyframes blink {
            0%, 50%, 100% { opacity: 1; }
            25%, 75% { opacity: 0; }
          }
          .animate-blink {
            animation: blink 1s infinite;
          }
        `}
      </style>
    </header>
  );
}
