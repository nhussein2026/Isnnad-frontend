import { ICourse } from './course';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  profilePic?: string;
  referralCode?: string;
  referredBy?: string;
  courses: ICourse[];
  role: 'admin' | 'admin' | 'user' | 'manager' | 'programmer' | 'Assistant';
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface RootState {
  auth: AuthState;
  // Add other slices here
}
