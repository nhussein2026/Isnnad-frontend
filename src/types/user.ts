export interface IUser {
  name: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  referralCode?: string;
  referredBy?: string;
  subjects: object[];
  role: "student" | "admin";
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
