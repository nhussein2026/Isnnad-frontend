import illustration from '../../assets/images/Research paper-amico.svg';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const phrases = ["فيديو", "عرض تقديمي", "مشروع", "بحث علمي"];
  const typingSpeed = 100;
  const erasingSpeed = 50;
  const delayBeforeErase = 1000;

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    let timeout: number | undefined;

    if (!isDeleting && charIndex < phrases[currentPhraseIndex].length) {
      timeout = setTimeout(() => {
        setCharIndex((prev) => prev + 1);
        setDisplayedText(phrases[currentPhraseIndex].slice(0, charIndex + 1));
      }, typingSpeed);
    } else if (!isDeleting && charIndex === phrases[currentPhraseIndex].length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, delayBeforeErase);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setCharIndex((prev) => prev - 1);
        setDisplayedText(phrases[currentPhraseIndex].slice(0, charIndex - 1));
      }, erasingSpeed);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentPhraseIndex, phrases]);

  return (
    <header className="relative w-full min-h-screen flex flex-col-reverse md:flex-row-reverse items-center justify-center overflow-hidden px-4 md:px-8 lg:px-16 py-10 md:py-0">
      
      {/* النص */}
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-end justify-center text-center md:text-right space-y-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 leading-relaxed">
          <span className="text-[#8d1b3d]">منصة أسناد</span> تساعدك في الوصول
          إلى هدفك من خلال مساعدتك في إنجاز مهامك مهما كانت{" "}
          <br className="hidden sm:block" />
          <span className="text-[#8d1b3d]">{displayedText}</span>
          <span className="inline-block w-[2px] md:h-10 h-6 bg-[#8d1b3d] ml-1 animate-blink"></span>
        </h1>

        <Link to="/register">
          <button className="bg-[#8d1b3d] text-white px-6 py-3 rounded-lg hover:bg-[#ac224b] transition cursor-pointer text-lg shadow-md">
            ابدأ الآن
          </button>
        </Link>
      </div>

      {/* الصورة */}
      <div className="w-full md:w-1/2 flex justify-center items-center mb-10 md:mb-0">
        <img
          src={illustration}
          alt="Illustration"
          className="w-3/4 sm:w-2/3 md:w-4/5 lg:w-3/4 max-w-md object-contain"
        />
      </div>

      {/* زر السهم */}
      <button
        className="absolute bottom-4 md:bottom-10 left-1/2 transform -translate-x-1/2 bg-[#8d1b3d] text-white p-3 rounded-full shadow-lg hover:bg-[#ac224b] transition animate-bounce cursor-pointer"
        aria-label="Scroll Down"
      >
        ⬇
      </button>

      {/* أنيميشن المؤشر */}
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
