import WelcomeSection from "../../components/Dashboard/DashboardPage/WelcomeSection/WelcomeSection";
import QuickAction from "../../components/Dashboard/DashboardPage/QuickAction/QuickActionList";
import RecentActivitiesList from "../../components/Dashboard/DashboardPage/RecentActivities/RecentActivitiesList";
import StatusSection from "../../components/Dashboard/SharedComponents/StatusSection/StatusSection";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <WelcomeSection />
      <StatusSection />
      <div className="flex flex-col lg:flex-row justify-center w-full gap-[18px]">
        <div className="w-full lg:w-[40%]">
          <QuickAction />
        </div>
        <div className="w-full lg:w-[60%]">
          <RecentActivitiesList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
