import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  // Utility to combine class names
  return twMerge(clsx(inputs)); // Merge Tailwind classes with clsx
}
