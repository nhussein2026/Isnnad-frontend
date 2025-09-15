import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Menu, User, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary">
          TaskSolver
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-primary">
            الرئيسية
          </Link>
          <Link to="/offers" className="text-gray-700 hover:text-primary">
            العروض
          </Link>
          <Link to="/support" className="text-gray-700 hover:text-primary">
            الدعم
          </Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="text-gray-700 hover:text-primary">
            <User className="h-5 w-5" />
          </Link>
          <Link to="/checkout" className="text-gray-700 hover:text-primary">
            <ShoppingCart className="h-5 w-5" />
          </Link>
          <Button asChild variant="default" className="hidden md:inline-flex">
            <Link to="/login">تسجيل / دخول</Link>
          </Button>
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setOpen(!open)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col space-y-2 p-4">
            <Link to="/" className="text-gray-700 hover:text-primary">
              الرئيسية
            </Link>
            <Link to="/offers" className="text-gray-700 hover:text-primary">
              العروض
            </Link>
            <Link to="/support" className="text-gray-700 hover:text-primary">
              الدعم
            </Link>
            <Link to="/login" className="text-gray-700 hover:text-primary">
              تسجيل / دخول
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
