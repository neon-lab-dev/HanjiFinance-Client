import { FiActivity } from "react-icons/fi";
import { ICONS } from "../../../assets";
import RecentActivitiesCard from "../../../components/Dashboard/DashboardPage/RecentActivities/RecentActivitiesCard/RecentActivitiesCard";
import DashboardContainer from "../../../components/Dashboard/SharedComponents/DashboardContainer/DashboardContainer";
import Loader from "../../../components/Shared/Loader/Loader";
import { useGetMyActivityQuery } from "../../../redux/Features/User/userApi";
import type { TActivity } from "../../../types/activities.types";
import { formatDate } from "../../../utils/formatDate";
import { useState } from "react";

const RecentActivities = () => {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading } = useGetMyActivityQuery({ page });

  const activities = data?.data?.activities
    ? [...data.data.activities].reverse()
    : [];

  const pagination = data?.data?.pagination;

  return (
    <div>
      <div></div>
      <DashboardContainer>
        {isLoading ? (
          <div className="text-center py-10">
            <Loader />
          </div>
        ) : activities?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-gray-500">
            <FiActivity className="text-4xl mb-4" />
            <p>No recent activities found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities?.map((activity: TActivity, index: number) => (
              <RecentActivitiesCard
                key={index}
                icon={ICONS.email}
                title={activity.title}
                description={activity.description}
                date={formatDate(activity.createdAt)}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination && (
          <div className="flex items-center justify-center gap-2 mt-5">
            {/* Prev button */}
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-2 py-2 size-[38px] flex items-center justify-center rounded hover:bg-primary-10 transition duration-300 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            >
              &laquo;
            </button>

            {/* Page numbers */}
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`px-3 py-2 size-[38px] flex items-center justify-center border rounded hover:bg-primary-15 cursor-pointer transition duration-300 ${
                    page === pageNum ? "bg-primary-10 text-white" : ""
                  }`}
                >
                  {pageNum}
                </button>
              )
            )}

            {/* Next button */}
            <button
              disabled={page === pagination.pages}
              onClick={() => setPage((p) => Math.min(pagination.pages, p + 1))}
              className="px-2 py-2 size-[38px] flex items-center justify-center rounded hover:bg-primary-10 transition duration-300 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            >
              &raquo;
            </button>
          </div>
        )}
      </DashboardContainer>
    </div>
  );
};

export default RecentActivities;
