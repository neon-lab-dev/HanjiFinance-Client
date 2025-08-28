import { ICONS } from "../../../../assets";
import StatusCard from "../StatusCard/StatusCard"

const StatusSectoin = () => {
     const cardsData = [
    {
      icon: ICONS.email,
      value: 2,
      label: "Upcoming Consultations",
      badgeText: "This Week",
      badgeBg: "bg-amber-200",
      badgeBorder: "border-amber-500",
      badgeTextColor: "text-amber-500",
    },
    {
      icon: ICONS.user,
      value: 10,
      label: "Active Courses",
      badgeText: "Today",
      badgeBg: "bg-green-200",
      badgeBorder: "border-green-500",
      badgeTextColor: "text-green-500",
    },
    {
      icon: ICONS.cartPlus,
      value: 5,
      label: "Private Group Access",
      badgeText: "This Month",
      badgeBg: "bg-blue-200",
      badgeBorder: "border-blue-500",
      badgeTextColor: "text-blue-500",
    },
  ];
  return (
     <div className="flex gap-4 w-full">
      {cardsData.map((card, index) => (
        <StatusCard key={index} {...card} />
      ))}
    </div>
  )
}

export default StatusSectoin