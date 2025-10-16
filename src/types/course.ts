export interface ICourse {
  _id: string;
  name: string;
  pic: string;
  createdBy: object[];
  isOther?: boolean;
  tasks?: object[];
  createdAt?: Date;
  updatedAt?: Date;
}
