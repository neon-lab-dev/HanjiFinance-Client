import AvailableSlotsCard from "../AvailableSlotsCard/AvailableSlotsCard";
import DashboardContainer from "../../SharedComponents/DashboardContainer/DashboardContainer";

const AvailableSlotsList = () => {
  const slots = [
    { date: "June 31", day: "Sunday", slots: 1 },
    { date: "June 3", day: "Monday", slots: 3 },
    { date: "June 4", day: "Tuesday", slots: 2 },
  ];
  return (
    <DashboardContainer headerText="Available Slots">
      <div className="space-y-4">
        {slots.map((slot, index) => (
          <AvailableSlotsCard
            key={index}
            date={slot.date}
            day={slot.day}
            slots={slot.slots}
          />
        ))}
      </div>
    </DashboardContainer>
  );
};

export default AvailableSlotsList;
