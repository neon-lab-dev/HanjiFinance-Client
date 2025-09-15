import { useState } from "react";
import DashboardContainer from "../../SharedComponents/DashboardContainer/DashboardContainer";
import ConsultationsCard from "../ConsultationsCard/ConsultationsCard";
import { useGetMyBookingsQuery } from "../../../../redux/Features/ChatAndChill/chatAndChillApi";
import type { TChatAndChill } from "../../../../types/chatAndChill.types";
import { formatDate } from "../../../../utils/formatDate";
import { MdEventBusy } from "react-icons/md";
import Loader from "../../../Shared/Loader/Loader";

const ConsultationsSection = () => {
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, isFetching } = useGetMyBookingsQuery({
    page,
  });

  const pagination = data?.data?.pagination;
  const bookings = data?.data?.bookings || [];

  return (
    <DashboardContainer headerText="Upcoming Sessions">
      <div className="flex flex-col gap-4">
        {/* Loader */}
        {isLoading || isFetching ? (
          <div className="flex justify-center py-10">
            <Loader />
          </div>
        ) : bookings.length === 0 ? (
          // Empty state
          <div className="flex flex-col items-center justify-center py-10 text-gray-500">
            <MdEventBusy className="text-6xl mb-3 text-gray-400" />
            <p className="text-lg font-medium">No upcoming consultations</p>
          </div>
        ) : (
          <>
            {bookings.map((item: TChatAndChill, index: number) => (
              <ConsultationsCard
                key={index}
                title={item?.title as string}
                subtitle={item?.topicsToDiscuss as string}
                date={formatDate(item.bookingDate)}
                time={"7:00 PM - 7:30 PM"}
                duration={"30 min"}
                status={item.status}
                meetingLink={item.meetingLink}
                onCancel={() => console.log(`Cancelled: ${item.title}`)}
              />
            ))}

            {/* Pagination */}
            {pagination && (
              <div className="flex items-center justify-center gap-2">
                {/* Prev button */}
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="px-2 py-2 size-[38px] flex items-center justify-center rounded hover:bg-primary-10 transition duration-300 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                >
                  &laquo;
                </button>

                {/* Page numbers */}
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(
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
                  onClick={() =>
                    setPage((p) => Math.min(pagination.pages, p + 1))
                  }
                  className="px-2 py-2 size-[38px] flex items-center justify-center rounded hover:bg-primary-10 transition duration-300 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                >
                  &raquo;
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardContainer>
  );
};

export default ConsultationsSection;
