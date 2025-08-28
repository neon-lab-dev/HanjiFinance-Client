import { ICONS } from "../../../../assets";
import DashboardContainer from "../../SharedComponents/DashboardContainer/DashboardContainer";
import QuickActionCard from "./QuickActionCard/QuickActionCard";

const quickActions = [
  {
    icon: ICONS.email,
    title: "Chat & Chill",
    description: "Book 1 on 1 meet",
  },
  {
    icon: ICONS.author,
    title: "Schedule",
    description: "Plan your tasks",
  },
  {
    icon: ICONS.bell,
    title: "Notifications",
    description: "Check recent alerts",
  },
];

const QuickActionsList = () => {
  return (
    <DashboardContainer headerText="User Dashboard">
      <div className="space-y-4">
        {quickActions.map((action, index) => (
          <QuickActionCard
            key={index}
            icon={action.icon}
            title={action.title}
            description={action.description}
          />
        ))}
      </div>
    </DashboardContainer>
  );
};

export default QuickActionsList;
