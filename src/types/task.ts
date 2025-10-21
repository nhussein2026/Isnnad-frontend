import { ICourse } from './course';
import { IUser } from './user';

export interface ITask {
  _id?: string;
  studentName: string;
  studentId: string;
  doctorName: string;
  course: ICourse;
  question: string;
  type?: 'واجب منزلي' | 'مشروع' | 'اختبار' | 'أخرى';
  description?: string;
  timeToComplete: number;
  status: 'قيد التنفيذ' | 'تم الإنجاز' | 'قيد الانتظار' | 'متأخر';
  attachments?: string[];
  additionalInfo?: string;
  createdBy: string | IUser;
  createdAt?: Date;
  updatedAt?: Date;
}
