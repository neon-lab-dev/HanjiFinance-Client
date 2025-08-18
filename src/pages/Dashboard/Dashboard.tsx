import React from "react";
import WelcomeSection from "../../components/Dashboard/DashboardPage/WelcomeSectoin/WelcomeSection";
import StatusSectoin from "../../components/Dashboard/SharedComponents/StatusSectoin/StatusSectoin";
import DashboardContainer from "../../components/Dashboard/SharedComponents/DashboardContainer/DashboardContainer";
import QuickAction from "../../components/Dashboard/DashboardPage/QuickAction/QuickActionList";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <WelcomeSection />
      <StatusSectoin />
      <div className="flex justify-center w-full flex-row gap-[18px]">
        <div className="w-[40%]">
          
        <QuickAction/>
        </div>
        <div className="w-[60%]">
          <DashboardContainer
        headerText="User Dashboard"
        btn="Add New"
        btnLink="/add-new"
      >
        <p>This is inside the dashboard container.</p>
        <div className="mt-4">
          <p>More content here...</p>
        </div>
      </DashboardContainer>
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;
