import AvailableSlotsCard from "../AvailableSlotsCard/AvailableSlotsCard";
import DashboardContainer from "../../SharedComponents/DashboardContainer/DashboardContainer";
import { formatDate } from "../../../../utils/formatDate";
import type { TAvailability } from "../../../../types/availability.types";
import Loader from "../../../Shared/Loader/Loader";
import { useGetAllAvailabilityQuery } from "../../../../redux/Features/Availability/availabilityApi";

const AvailableSlotsList = () => {
  const { data, isLoading } = useGetAllAvailabilityQuery({});

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

  const availabilities = data?.data?.availabilities?.filter(
    (slot: TAvailability) =>
      slot?.isBooked === false &&
      slot?.isAvailable === true &&
      new Date(slot.date) >= startOfMonth &&
      new Date(slot.date) <= endOfMonth
  );

  return (
    <DashboardContainer headerText="Available Slots This Month">
      <div className="space-y-4">
        {isLoading ? (
          <div className="mt-6">
            <Loader />
          </div>
        ) : availabilities?.length < 1 ? (
          <p>No slots are available this month!</p>
        ) : (
          availabilities?.map((slot: TAvailability, index: number) => (
            <AvailableSlotsCard key={index} date={formatDate(slot.date)} />
          ))
        )}
      </div>
    </DashboardContainer>
  );
};

export default AvailableSlotsList;

