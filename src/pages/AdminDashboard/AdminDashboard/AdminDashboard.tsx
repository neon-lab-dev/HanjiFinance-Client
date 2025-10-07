// import UpcomingConsultationCard from "../../../components/AdminDashboard/AdmindashboardPage/UpcomingConsultationCard/UpcomingConsultationCard";
import WelcomeSection from "../../../components/Dashboard/DashboardPage/WelcomeSection/WelcomeSection";
import StatusCard from "../../../components/Dashboard/SharedComponents/StatusCard/StatusCard";
import {
  FiBook,
  FiLayers,
  FiMail,
  FiPackage,
  FiShoppingCart,
  FiTag,
  FiUsers,
  FiHelpCircle,
} from "react-icons/fi";

const AdminDashboard = () => {
  return (
    <div className="flex flex-col gap-5">
      <WelcomeSection />

      {/* Status Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatusCard
          icon={<FiMail size={28} />}
          value={120}
          label="Newsletters"
          badgeText="All"
          badgeBg="bg-purple-100"
          badgeBorder="border-purple-400"
          badgeTextColor="text-purple-600"
        />
        <StatusCard
          icon={<FiLayers size={28} />}
          value={15}
          label="Categories"
          badgeText="All"
          badgeBg="bg-yellow-100"
          badgeBorder="border-yellow-400"
          badgeTextColor="text-yellow-600"
        />
        <StatusCard
          icon={<FiPackage size={28} />}
          value={340}
          label="Products"
          badgeText="All"
          badgeBg="bg-green-100"
          badgeBorder="border-green-400"
          badgeTextColor="text-green-600"
        />
        <StatusCard
          icon={<FiShoppingCart size={28} />}
          value={95}
          label="Product Orders"
          badgeText="All"
          badgeBg="bg-blue-100"
          badgeBorder="border-blue-400"
          badgeTextColor="text-blue-600"
        />
        <StatusCard
          icon={<FiBook size={28} />}
          value={42}
          label="Courses"
          badgeText="All"
          badgeBg="bg-pink-100"
          badgeBorder="border-pink-400"
          badgeTextColor="text-pink-600"
        />
        <StatusCard
          icon={<FiBook size={28} />}
          value={20}
          label="Course Orders"
          badgeText="All"
          badgeBg="bg-indigo-100"
          badgeBorder="border-indigo-400"
          badgeTextColor="text-indigo-600"
        />
        <StatusCard
          icon={<FiUsers size={28} />}
          value={18}
          label="Consultations"
          badgeText="All"
          badgeBg="bg-teal-100"
          badgeBorder="border-teal-400"
          badgeTextColor="text-teal-600"
        />
        <StatusCard
          icon={<FiUsers size={28} />}
          value={220}
          label="Subscriptions"
          badgeText="All"
          badgeBg="bg-cyan-100"
          badgeBorder="border-cyan-400"
          badgeTextColor="text-cyan-600"
        />
        <StatusCard
          icon={<FiTag size={28} />}
          value={8}
          label="Coupon Codes"
          badgeText="All"
          badgeBg="bg-orange-100"
          badgeBorder="border-orange-400"
          badgeTextColor="text-orange-600"
        />
        <StatusCard
          icon={<FiHelpCircle size={28} />}
          value={12}
          label="Pending Queries"
          badgeText="All"
          badgeBg="bg-red-100"
          badgeBorder="border-red-400"
          badgeTextColor="text-red-600"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
