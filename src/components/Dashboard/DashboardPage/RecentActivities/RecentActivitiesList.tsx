import DashboardContainer from "../../SharedComponents/DashboardContainer/DashboardContainer";
import React from "react";
import RecentActivitiesCard from "./RecentActivitiesCard/RecentActivitiesCard";
import { ICONS } from "../../../../assets";

const activitiesData = [
  {
    icon: ICONS.email,
    title: "Payment Received",
    description: "You have received ₹5,000 from Ramesh.",
    date: "1 Aug 2024",
  },
  {
    icon: ICONS.email,
    title: "Invoice Generated",
    description: "Invoice #INV-101 has been generated successfully.",
    date: "30 Jul 2024",
  },
  {
    icon: ICONS.email,
    title: "New Client Added",
    description: "You added Suresh Traders as a new client.",
    date: "28 Jul 2024",
  },
];

const RecentActivitiesList: React.FC = () => {
  return (
    <DashboardContainer
      headerText="User Dashboard"
      btn="View All"
      btnLink="recent-activities"
    >
      <div className="space-y-4">
        {activitiesData.map((activity, index) => (
          <RecentActivitiesCard
            key={index}
            icon={activity.icon}
            title={activity.title}
            description={activity.description}
            date={activity.date} 
          />
        ))}
      </div>
    </DashboardContainer>
  );
};

export default RecentActivitiesList;
