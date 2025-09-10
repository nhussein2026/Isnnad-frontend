export interface IUser {
  id: string;
  name: string;
  email: string;
  username?: string;
  phone?: string;
  role?: string;
  // other safe fields returned by backend
}
