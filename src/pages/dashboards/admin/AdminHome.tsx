import AnalyticsSection from '../../../components/admin/AnalyticsSection ';
import DashboardStats from '../../../components/dashboard/common/DashboardStats';

export default function AdminHome() {
  return (
    <div className="space-y-8">
      <AnalyticsSection />
      <DashboardStats />
    </div>
  );
}
