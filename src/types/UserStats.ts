export interface IUserStats {
  totalTasks: number;
  byStatus: Record<string, number>;
  byType: Record<string, number>;
  avgTimeToComplete: string | number;
  recentTasks: any[];
}
