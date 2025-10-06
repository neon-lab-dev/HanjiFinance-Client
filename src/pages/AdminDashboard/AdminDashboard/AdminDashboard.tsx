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
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";

const AdminDashboard = () => {
  // const productPurchaseData = [
  //   { month: "Jan", products: 65, courses: 28 },
  //   { month: "Feb", products: 78, courses: 32 },
  //   { month: "Mar", products: 92, courses: 45 },
  //   { month: "Apr", products: 81, courses: 38 },
  //   { month: "May", products: 105, courses: 52 },
  //   { month: "Jun", products: 120, courses: 48 },
  // ];

  // const revenueData = [
  //   { name: "Products", value: 12500 },
  //   { name: "Courses", value: 8900 },
  //   { name: "Consultations", value: 4500 },
  //   { name: "Subscriptions", value: 3200 },
  // ];

  // const COLORS = ["#b91c1c", "#00C49F", "#FFBB28", "#9d6100"];

  // const consultations = [
  //   {
  //     id: "1",
  //     name: "John Doe",
  //     email: "john.doe@example.com",
  //     phone: "+1 (555) 123-4567",
  //     bookingDate: "2024-01-20T14:30:00",
  //     meetingLink: "https://meet.google.com/abc-def-ghi",
  //     topics: ["Product Consultation", "Technical Support", "Pricing"],
  //   },
  //   {
  //     id: "2",
  //     name: "Sarah Smith",
  //     email: "sarah.smith@example.com",
  //     phone: "+1 (555) 987-6543",
  //     bookingDate: "2024-01-21T10:00:00",
  //     meetingLink: "https://zoom.us/j/123456789",
  //     topics: ["General Inquiry"],
  //   },
  //   {
  //     id: "3",
  //     name: "Mike Johnson",
  //     email: "mike.j@example.com",
  //     phone: "+1 (555) 456-7890",
  //     bookingDate: "2024-01-22T16:15:00",
  //     meetingLink: "https://teams.microsoft.com/l/meetup-join/19:meeting_XYZ",
  //   },
  // ];

  return (
    <div className="flex flex-col gap-5">
      <WelcomeSection />

      {/* Status Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
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

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
        {/* Charts Section */}
        {/* <div className="flex flex-col gap-6 col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FiTrendingUp className="text-blue-500" />
                Purchases Overview
              </h3>
              <span className="text-sm text-gray-500">Last 6 Months</span>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productPurchaseData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e5e5",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="products"
                    name="Product Purchases"
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="courses"
                    name="Course Purchases"
                    fill="#9d6100"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FiBarChart2 className="text-green-500" />
                Revenue Distribution
              </h3>
              <span className="text-sm text-gray-500">Total: $29,100</span>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value, percent }) =>
                      `${name}: $${value.toLocaleString()} (${(
                        percent * 100
                      ).toFixed(0)}%)`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {revenueData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [
                      `$${value.toLocaleString()}`,
                      "Revenue",
                    ]}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e5e5",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div> */}

        {/* Right side data */}
        {/* <div className="col-span-1 flex flex-col gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 h-fit">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <FiMessageCircle className="text-blue-500" />
              Upcoming Consultations This Week
            </h3>

            <div className="flex flex-col gap-4 mt-4">
              {consultations.map((consultation) => (
                <UpcomingConsultationCard
                  key={consultation.id}
                  consultation={consultation}
                />
              ))}
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default AdminDashboard;
