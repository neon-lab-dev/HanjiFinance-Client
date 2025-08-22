import { ICONS } from "../../../../assets"
import SubscriptionCard from "../SubscriptionCard/SubscriptionCard"

const SubscriptionCardsList = () => {
  const cards = [
    {
      icon: ICONS.medal,
      value: "Active",
      label: "Subscription Status",
    },
    {
      icon: ICONS.calendarMinimalistic,
      value: "21 Aug, 2025",
      label: "Next Billing",
    },
  ]

  return (
    <div className="flex gap-6 mt-4">
      {cards.map((card) => {
        // compute conditional class for the value
        const classNames =
          card.value === "Active"
            ? "text-success-20"
            : card.value === "Paused" || card.value === "Cancelled"
            ? "text-primary-15"
            : card.value === "Not Available"
            ? "text-primary-40"
            : "text-neutral-10";

        return (
          <SubscriptionCard
            key={card.label}
            icon={card.icon}
            value={card.value}
            label={card.label}
            classNames={classNames}
          />
        );
      })}
    </div>
  )
}

export default SubscriptionCardsList
