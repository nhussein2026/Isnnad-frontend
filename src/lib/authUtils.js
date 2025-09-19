//authUtils.js - Logout utility functions
import { toast } from 'sonner';

export const handleLogout = (dispatch, navigate, logoutAction) => {
  return async () => {
    try {
      // Dispatch logout action
      dispatch(logoutAction());

      // Show success message
      toast.success('تم تسجيل الخروج بنجاح');

      // Navigate to login page
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('حدث خطأ أثناء تسجيل الخروج');
    }
  };
};

// Alternative version with confirmation dialog
export const handleLogoutWithConfirmation = (
  dispatch,
  navigate,
  logoutAction
) => {
  return async () => {
    const confirmed = window.confirm('هل أنت متأكد من تسجيل الخروج؟');

    if (!confirmed) {
      return;
    }

    try {
      dispatch(logoutAction());
      toast.success('تم تسجيل الخروج بنجاح');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('حدث خطأ أثناء تسجيل الخروج');
    }
  };
};
