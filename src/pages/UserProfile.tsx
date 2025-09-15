import { useEffect, useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import {
  User,
  Mail,
  Phone,
  Calendar,
  // Bell,
  Shield,
  AtSign,
} from 'lucide-react';
import type { IUser } from '../types/user';
import api from '../lib/axios';

export default function UserProfile() {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Local settings state
  // const [notifications, setNotifications] = useState(true);

  // Password change state
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log('Fetching user...');
        const { data } = await api.get<IUser>('/user/me');
        console.log('User data received:', data);

        setUser(data);
        console.log('User state updated:', data);
        // Set initial settings from user data if available
        // if (data.notifications !== undefined) setNotifications(data.notifications);
      } catch (err: any) {
        console.error(
          '❌ Failed to fetch user:',
          err.response?.data || err.message
        );
        toast.error('Failed to load profile data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleSaveSettings = async () => {
    setUpdating(true);
    try {
      // await api.put("/user/settings", { language, notifications });
      toast.success('Settings updated successfully!');
    } catch (err: any) {
      console.error('Failed to update settings:', err);
      toast.error('Failed to update settings. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  const handlePasswordChange = async () => {
    // Validation
    if (!passwords.newPassword || !passwords.confirmPassword) {
      toast.error('Please fill in both password fields');
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (passwords.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setUpdating(true);
    try {
      await api.put('/user/change-password', {
        newPassword: passwords.newPassword,
      });

      toast.success('Password updated successfully!');

      // Clear password fields
      setPasswords({ newPassword: '', confirmPassword: '' });
    } catch (err: any) {
      console.error('Failed to update password:', err);
      toast.error('Failed to update password. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  const handlePasswordInputChange = (
    field: 'newPassword' | 'confirmPassword',
    value: string
  ) => {
    setPasswords((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Loading state
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="text-center mt-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  // Error state - if user is still null after loading
  if (!user) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <Card className="shadow-lg rounded-2xl">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Profile Unavailable</h2>
            <p className="text-gray-600 mb-4">
              Unable to load user profile data.
            </p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {/* Profile Section */}
      <Card className="shadow-lg rounded-2xl">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xl font-bold text-white">
              {user.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="space-y-1">
              <p className="flex items-center gap-2 text-lg font-medium">
                <User size={18} className="text-gray-600" />
                {user.name || 'No name provided'}
              </p>

              {user.username && (
                <p className="flex items-center gap-2 text-gray-600">
                  <AtSign size={18} /> {user.username}
                </p>
              )}

              <p className="flex items-center gap-2 text-gray-600">
                <Mail size={18} /> {user.email || 'No email provided'}
              </p>

              {user.phone && (
                <p className="flex items-center gap-2 text-gray-600">
                  <Phone size={18} /> {user.phone}
                </p>
              )}

              {user.role && (
                <p className="flex items-center gap-2 text-gray-600">
                  <Shield size={18} /> Role: {user.role}
                </p>
              )}

              {user.createdAt && (
                <p className="flex items-center gap-2 text-gray-600">
                  <Calendar size={18} />
                  Joined: {new Date(user.createdAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings Section */}
      <Card className="shadow-lg rounded-2xl">
        <CardContent className="p-6 space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Settings</h2>

          {/* Notifications */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              // checked={notifications}
              // onChange={(e) => setNotifications(e.target.checked)}
              // id="notifications"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              disabled={updating}
            />
            {/* <Label htmlFor="notifications" className="flex items-center gap-2 font-medium cursor-pointer">
              <Bell size={18} className="text-gray-600" /> 
              Enable Notifications
            </Label> */}
          </div>

          <Button
            onClick={handleSaveSettings}
            className="w-full"
            disabled={updating}
          >
            {updating ? 'Saving...' : 'Save Settings'}
          </Button>
        </CardContent>
      </Card>

      {/* Change Password Section */}
      <Card className="shadow-lg rounded-2xl">
        <CardContent className="p-6 space-y-4">
          <h3 className="text-xl font-semibold mb-4">Change Password</h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="font-medium">
                New Password
              </Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="Enter new password"
                value={passwords.newPassword}
                onChange={(e) =>
                  handlePasswordInputChange('newPassword', e.target.value)
                }
                disabled={updating}
                className="focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="font-medium">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                value={passwords.confirmPassword}
                onChange={(e) =>
                  handlePasswordInputChange('confirmPassword', e.target.value)
                }
                disabled={updating}
                className="focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <Button
              onClick={handlePasswordChange}
              disabled={
                updating || !passwords.newPassword || !passwords.confirmPassword
              }
              className="w-full"
            >
              {updating ? 'Updating...' : 'Update Password'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
