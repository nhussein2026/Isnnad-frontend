// hooks/useLogout.js - Custom hook for logout functionality
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';
import { toast } from 'sonner';

export const useLogout = (options = {}) => {
  const {
    redirectTo = '/login',
    showSuccessMessage = true,
    showConfirmation = false,
    onSuccess = null,
    onError = null,
  } = options;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const performLogout = async () => {
    if (showConfirmation) {
      const confirmed = window.confirm('هل أنت متأكد من تسجيل الخروج؟');
      if (!confirmed) return false;
    }

    try {
      // Dispatch logout action
      dispatch(logout());

      // Show success message if enabled
      if (showSuccessMessage) {
        toast.success('تم تسجيل الخروج بنجاح');
      }

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }

      // Navigate to redirect page
      navigate(redirectTo);

      return true;
    } catch (error) {
      console.error('Logout error:', error);

      if (onError) {
        onError(error);
      } else {
        toast.error('حدث خطأ أثناء تسجيل الخروج');
      }

      return false;
    }
  };

  return performLogout;
};
