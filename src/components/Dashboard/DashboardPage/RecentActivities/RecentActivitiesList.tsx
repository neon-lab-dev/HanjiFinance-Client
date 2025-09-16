import DashboardContainer from "../../SharedComponents/DashboardContainer/DashboardContainer";
import React from "react";
import RecentActivitiesCard from "./RecentActivitiesCard/RecentActivitiesCard";
import { ICONS } from "../../../../assets";
import { useGetMyActivityQuery } from "../../../../redux/Features/User/userApi";
import { formatDate } from "../../../../utils/formatDate";
import type { TActivity } from "../../../../types/activities.types";

const RecentActivitiesList: React.FC = () => {
  const { data } = useGetMyActivityQuery({});

  const activities = data?.data?.activities
    ? [...data.data.activities].reverse()
    : [];

  return (
    <DashboardContainer
      headerText="Recent Activities"
      btn="View All"
      btnLink="recent-activities"
    >
      <div className="space-y-4">
        {activities.map((activity: TActivity, index: number) => (
          <RecentActivitiesCard
            key={index}
            icon={ICONS.email}
            title={activity.title}
            description={activity.description}
            date={formatDate(activity.createdAt)}
          />
        ))}
      </div>
    </DashboardContainer>
  );
};

export default RecentActivitiesList;
