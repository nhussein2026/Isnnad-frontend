import { Link } from 'react-router-dom';
// import { Button } from '../components/ui/button';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import logo from '../assets/images/Isnnad-logo-red-white.svg';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full  bg-[var(--bg-primary)] shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
         {/* Left side btns */}
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="hidden md:inline-flex h-[44px] px-4 py-2 items-center justify-center gap-2 rounded-lg bg-gray-100 shadow-sm text-sm font-medium text-black"
          >
            تسجيل الدخول
          </Link>
                    <Link
            to="/signup"
            className="hidden md:inline-flex px-4 py-3 items-center justify-center gap-2 rounded-lg bg-[#171717] shadow-sm text-sm font-medium text-white hover:bg-[#282727b7]"
          >
            إنشاء حساب
          </Link>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setOpen(!open)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden grid md:flex md:flex-row-reverse items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-primary">
            الرئيسية
          </Link>
          <Link to="/#about" className="text-gray-700 hover:text-primary">
           عن المنصة 
          </Link>
          <Link to="/#our-services" className="text-gray-700 hover:text-primary">
            خدماتنا
          </Link>
          <Link to="/#our-customers-opinions" className="text-gray-700 hover:text-primary">
            آراء العملاء
          </Link>
          <Link to="/#apply-now" className="text-gray-700 hover:text-primary">
            قدم الآن 
          </Link> 
        </nav>

       {/* Logo */}
        <Link to="/" aria-label="Home">
          <img
            src={logo}
            alt="Website Logo"
            className="w-[83.228px] aspect-[83.23/48] self-stretch object-cover"
          />
       </Link>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col space-y-2 p-4">
             <Link to="/" className="text-gray-700 hover:text-primary">
            الرئيسية
          </Link>
          <Link to="/#about" className="text-gray-700 hover:text-primary">
           عن المنصة 
          </Link>
          <Link to="/#our-services" className="text-gray-700 hover:text-primary">
            خدماتنا
          </Link>
          <Link to="/#our-customers-opinions" className="text-gray-700 hover:text-primary">
            آراء العملاء
          </Link>
          <Link to="/#apply-now" className="text-gray-700 hover:text-primary">
            قدم الآن 
          </Link> 
           <Link to="/login" className="text-gray-700 hover:text-primary">
            تسجيل الدخول
          </Link>
          <Link to="/signup" className="text-gray-700 hover:text-primary">
            إنشاء حساب
          </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
