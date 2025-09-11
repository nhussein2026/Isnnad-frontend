export interface IUser {
  name: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  referralCode?: string;
  referredBy?: string | mongoose.Types.ObjectId | null;
  subjects: mongoose.Types.ObjectId[];
  role: "student" | "admin";
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
