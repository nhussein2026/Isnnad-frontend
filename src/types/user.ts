export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  avatar?: string;
  referralCode?: string;
  referredBy?: string;
  subjects: object[];
  role:
    | 'student'
    | 'admin'
    | 'admin'
    | 'user'
    | 'manager'
    | 'tutor'
    | 'programmer'
    | 'Assistant';
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
