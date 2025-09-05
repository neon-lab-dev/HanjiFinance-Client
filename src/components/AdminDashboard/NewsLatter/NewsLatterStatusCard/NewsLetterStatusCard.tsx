import { FiList } from "react-icons/fi";
import StatusCard from "../../../Dashboard/SharedComponents/StatusCard/StatusCard";

const NewsLetterStatusCard = () => {
  return (
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Total Products */}
          <StatusCard
            icon={<FiList size={28} />}
            value={120}
            label="Total Newsletters"
            badgeText="All"
            badgeBg="bg-blue-100"
            badgeBorder="border-blue-400"
            badgeTextColor="text-blue-600"
          />
        </div>
      </div>
  );
};

export default NewsLetterStatusCard;
