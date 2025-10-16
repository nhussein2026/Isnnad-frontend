import { ICourse } from './course';
import { IUser } from './user';

export interface ITask {
  _id?: string;
  studentName: string;
  studentId: string;
  doctorName: string;
  course: ICourse;
  question: string;
  type?: 'homework' | 'project' | 'quiz' | 'other';
  description?: string;
  timeToComplete: number;
  status?: 'in_progress' | 'achieved' | 'pending' | 'overdue';
  attachments?: string[];
  additionalInfo?: string;
  createdBy: string | IUser;
  createdAt?: Date;
  updatedAt?: Date;
}
