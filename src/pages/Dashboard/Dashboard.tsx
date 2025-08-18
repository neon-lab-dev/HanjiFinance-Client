import WelcomeSection from "../../components/Dashboard/DashboardPage/WelcomeSectoin/WelcomeSection";
import StatusSectoin from "../../components/Dashboard/SharedComponents/StatusSectoin/StatusSectoin";
import QuickAction from "../../components/Dashboard/DashboardPage/QuickAction/QuickActionList";
import RecentActivitiesList from "../../components/Dashboard/DashboardPage/RecentActivities/RecentActivitiesList";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <WelcomeSection />
      <StatusSectoin />
      <div className="flex justify-center w-full flex-row gap-[18px]">
        <div className="w-[40%]">
          <QuickAction />
        </div>
        <div className="w-[60%]">
          <RecentActivitiesList/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
