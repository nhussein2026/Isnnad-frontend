import SiteStatus from '../../../components/adminDashboard/mainPage/SiteStatus';
import AnalyticsSection from '../../../components/adminDashboard/mainPage/AnalyticsSection ';
import DashboardStats from '../../../components/dashboard/common/DashboardStats';
import ServicesStatus from '../../../components/adminDashboard/mainPage/ServicesStatus';

export default function AdminHome() {
  return (
    <div className="space-y-8">
      <AnalyticsSection />
      <SiteStatus />
      <ServicesStatus />
      <DashboardStats />
    </div>
  );
}
