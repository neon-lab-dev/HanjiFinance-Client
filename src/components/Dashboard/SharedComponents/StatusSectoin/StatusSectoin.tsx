import { ICONS } from "../../../../assets";
import StatusCard from "../StatusCard/StatusCard"

const StatusSectoin = () => {
     const cardsData = [
    {
      icon: ICONS.calendarMinimalistic,
      value: 2,
      label: "Upcoming Consultations",
      badgeText: "This Week",
      badgeBg: "bg-surface-40",
      badgeBorder: "border-surface-95",
      badgeTextColor: "text-surface-100",
    },
    {
      icon: ICONS.graduationCap,
      value: 10,
      label: "Active Courses",
      badgeText: "In Progress",
      badgeBg: "bg-surface-40",
      badgeBorder: "border-surface-95",
      badgeTextColor: "text-surface-100",
    },
    {
      icon: ICONS.curatedConversations,
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