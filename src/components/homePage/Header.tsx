import React from "react";
import illustration from "../../assets/images/Research paper-amico.svg"; // ضع مسار الرسم التوضيحي هنا
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="w-full h-[85vh] mx-auto px-4 flex flex-col-reverse md:flex-row-reverse items-center justify-center">
            {/* النص على الجهة اليمنى */}
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-end justify-center mt-6 md:mt-0 text-center md:text-right md:px-10 md:pr-17 px-4">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 leading-relaxed">
                    <span className="text-[#8d1b3d]">منصة أسناد</span> تساعدك في الوصول إلى هدفك من خلال مساعدتك في إنجاز مهامك مهما كانت
                </h1>
                <Link to={"/register"}>
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
        </header>


    );
};

export default Header;
