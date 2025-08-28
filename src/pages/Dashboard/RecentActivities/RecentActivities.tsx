import { ICONS } from "../../../assets";
import RecentActivitiesCard from "../../../components/Dashboard/DashboardPage/RecentActivities/RecentActivitiesCard/RecentActivitiesCard";
import DashboardContainer from "../../../components/Dashboard/SharedComponents/DashboardContainer/DashboardContainer";

const RecentActivities = () => {
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
  return (
    <div>
      <div>
        <h2></h2>
      </div>
      <DashboardContainer>
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
    </div>
  );
};

export default RecentActivities;
