import { ITask } from '../types/task';
import { IUser } from '../types/user';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  // Utility to combine class names
  return twMerge(clsx(inputs)); // Merge Tailwind classes with clsx
}

// Function to normalize user id
export function normalizeUser(user: any): IUser {
  return {
    ...user,
    _id: user._id || user.id,
    // If you want to keep only _id and remove id:
    // remove 'id' key to avoid confusion
    // you can do that by destructuring if necessary
  };
}

// group tasks by status
type GroupedTasks = {
  [status: string]: ITask[];
};
// Function to group tasks by their status
export function groupTasksByStatus(tasks: ITask[]): GroupedTasks {
  return tasks.reduce((acc, task) => {
    const status = task.status || 'بدون حالة';
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(task);
    return acc;
  }, {} as GroupedTasks);
}
