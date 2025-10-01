// hooks/useRoleAccess.ts
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface RolePermissions {
  canManageUsers?: boolean;
  canAccessAnalytics?: boolean;
  canModifySystem?: boolean;
  canViewAllData?: boolean;
  canManageTeam?: boolean;
  canViewReports?: boolean;
  canAssignTasks?: boolean;
  canManageStudents?: boolean;
  canCreateCourses?: boolean;
  canGrade?: boolean;
  canViewStudentData?: boolean;
  canManageProjects?: boolean;
  canReviewCode?: boolean;
  canTrackTasks?: boolean;
  canAccessRepository?: boolean;
  canManageTickets?: boolean;
  canSupportUsers?: boolean;
  canAccessKnowledge?: boolean;
  canViewUserIssues?: boolean;
  canViewCourses?: boolean;
  canManageProfile?: boolean;
  canPurchase?: boolean;
  canTrackProgress?: boolean;
}

export const useRoleAccess = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const getRolePermissions = (userRole: string): RolePermissions => {
    const permissions: Record<string, RolePermissions> = {
      admin: {
        canManageUsers: true,
        canAccessAnalytics: true,
        canModifySystem: true,
        canViewAllData: true,
      },
      manager: {
        canManageTeam: true,
        canViewReports: true,
        canAssignTasks: true,
        canViewAllData: false,
      },
      tutor: {
        canManageStudents: true,
        canCreateCourses: true,
        canGrade: true,
        canViewStudentData: true,
      },
      programmer: {
        canManageProjects: true,
        canReviewCode: true,
        canTrackTasks: true,
        canAccessRepository: true,
      },
      Assistant: {
        canManageTickets: true,
        canSupportUsers: true,
        canAccessKnowledge: true,
        canViewUserIssues: true,
      },
      user: {
        canViewCourses: true,
        canManageProfile: true,
        canPurchase: true,
        canTrackProgress: true,
      },
    };

    return permissions[userRole] || permissions.user;
  };

  const hasPermission = (permission: keyof RolePermissions): boolean => {
    if (!user) return false;
    const permissions = getRolePermissions(user.role);
    return permissions[permission] || false;
  };

  const canAccess = (requiredRoles: string[]): boolean => {
    if (!user) return false;
    return requiredRoles.includes(user.role);
  };

  const isRole = (role: string): boolean => {
    return user?.role === role;
  };

  const hasAnyRole = (roles: string[]): boolean => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  return {
    user,
    userRole: user?.role,
    permissions: user ? getRolePermissions(user.role) : {},
    hasPermission,
    canAccess,
    isRole,
    hasAnyRole,
  };
};
