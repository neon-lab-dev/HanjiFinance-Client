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
import { useGetAdminStatsQuery } from "../../../redux/Features/Admin/adminApi";
import StatusCardSkeleton from "../../../components/Dashboard/SharedComponents/StatusCard/StatusCardSkeleton";

const AdminDashboard = () => {
  const { data, isLoading } = useGetAdminStatsQuery({});
  const stats = data?.data;

  const cards = [
    {
      icon: <FiMail size={28} />,
      value: stats?.totalNewsletters,
      label: "Newsletters",
      badgeBg: "bg-purple-100",
      badgeBorder: "border-purple-400",
      badgeTextColor: "text-purple-600",
    },
    {
      icon: <FiLayers size={28} />,
      value: stats?.totalCategories,
      label: "Categories",
      badgeBg: "bg-yellow-100",
      badgeBorder: "border-yellow-400",
      badgeTextColor: "text-yellow-600",
    },
    {
      icon: <FiPackage size={28} />,
      value: stats?.totalProducts,
      label: "Products",
      badgeBg: "bg-green-100",
      badgeBorder: "border-green-400",
      badgeTextColor: "text-green-600",
    },
    {
      icon: <FiShoppingCart size={28} />,
      value: stats?.totalProductOrders,
      label: "Product Orders",
      badgeBg: "bg-blue-100",
      badgeBorder: "border-blue-400",
      badgeTextColor: "text-blue-600",
    },
    {
      icon: <FiBook size={28} />,
      value: stats?.totalCourses,
      label: "Courses",
      badgeBg: "bg-pink-100",
      badgeBorder: "border-pink-400",
      badgeTextColor: "text-pink-600",
    },
    {
      icon: <FiBook size={28} />,
      value: stats?.totalCourseOrders,
      label: "Course Orders",
      badgeBg: "bg-indigo-100",
      badgeBorder: "border-indigo-400",
      badgeTextColor: "text-indigo-600",
    },
    {
      icon: <FiUsers size={28} />,
      value: stats?.totalConsultations,
      label: "Consultations",
      badgeBg: "bg-teal-100",
      badgeBorder: "border-teal-400",
      badgeTextColor: "text-teal-600",
    },
    {
      icon: <FiUsers size={28} />,
      value: stats?.totalSubscriptions,
      label: "Subscriptions",
      badgeBg: "bg-cyan-100",
      badgeBorder: "border-cyan-400",
      badgeTextColor: "text-cyan-600",
    },
    {
      icon: <FiTag size={28} />,
      value: stats?.totalCoupons,
      label: "Coupon Codes",
      badgeBg: "bg-orange-100",
      badgeBorder: "border-orange-400",
      badgeTextColor: "text-orange-600",
    },
    {
      icon: <FiHelpCircle size={28} />,
      value: stats?.totalPendingQueries,
      label: "Pending Queries",
      badgeBg: "bg-red-100",
      badgeBorder: "border-red-400",
      badgeTextColor: "text-red-600",
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <WelcomeSection />

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => (
              <StatusCardSkeleton key={i} />
            ))
          : cards.map((item, index) => (
              <StatusCard
                key={index}
                icon={item.icon}
                value={item.value}
                label={item.label}
                badgeText="All"
                badgeBg={item.badgeBg}
                badgeBorder={item.badgeBorder}
                badgeTextColor={item.badgeTextColor}
              />
            ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
