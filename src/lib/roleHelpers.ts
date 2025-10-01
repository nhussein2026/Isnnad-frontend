// utils/roleHelpers.ts
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  MANAGER: 'manager',
  TUTOR: 'tutor',
  PROGRAMMER: 'programmer',
  ASSISTANT: 'Assistant',
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export const getRoleDisplayName = (role: string): string => {
  const roleNames: Record<string, string> = {
    admin: 'Administrator',
    user: 'User',
    manager: 'Manager',
    tutor: 'Tutor',
    programmer: 'Programmer',
    Assistant: 'Assistant',
  };

  return roleNames[role] || 'User';
};

export const getRoleBadgeColor = (role: string): string => {
  const colors: Record<string, string> = {
    admin: 'bg-red-100 text-red-800',
    manager: 'bg-purple-100 text-purple-800',
    tutor: 'bg-blue-100 text-blue-800',
    programmer: 'bg-green-100 text-green-800',
    Assistant: 'bg-yellow-100 text-yellow-800',
    user: 'bg-gray-100 text-gray-800',
  };

  return colors[role] || colors.user;
};
