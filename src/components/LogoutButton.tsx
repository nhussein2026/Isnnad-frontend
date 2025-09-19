// components/LogoutButton.jsx - Reusable logout button component
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { logout } from '../redux/slices/authSlice';
import { handleLogout } from '../lib/authUtils';

export const LogoutButton = ({ 
  className = '', 
  showIcon = true, 
  showText = true,
  confirmBeforeLogout = false,
  variant = 'default' // 'default', 'danger', 'ghost'
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getButtonClasses = () => {
    const baseClasses = 'flex items-center transition-colors duration-200';
    
    switch (variant) {
      case 'danger':
        return `${baseClasses} text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-2 rounded-md`;
      case 'ghost':
        return `${baseClasses} text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-md`;
      default:
        return `${baseClasses} text-gray-700 hover:text-gray-900`;
    }
  };

  const onLogout = async () => {
    if (confirmBeforeLogout) {
      const confirmed = window.confirm('هل أنت متأكد من تسجيل الخروج؟');
      if (!confirmed) return;
    }

    try {
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <button
      onClick={onLogout}
      className={`${getButtonClasses()} ${className}`}
      title="تسجيل الخروج"
    >
      {showIcon && <LogOut size={18} className={showText ? 'ml-2' : ''} />}
      {showText && <span>تسجيل الخروج</span>}
    </button>
  );
};

