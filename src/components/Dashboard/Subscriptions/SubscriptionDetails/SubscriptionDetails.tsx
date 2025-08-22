import React from "react"
import DashboardContainer from "../../SharedComponents/DashboardContainer/DashboardContainer"
import { ICONS } from "../../../../assets"
import { TiTick } from "react-icons/ti"

export interface SubscriptionData {
  plan: string
  status: "Active" | "Paused" | "Inactive"
  monthlyFee: string
  nextBillingDate?: string | null
  autoRenewal: boolean
}

const SubscriptionDetails: React.FC<{ data: SubscriptionData }> = ({ data }) => {
 const details = [
  {
    label: "Plan",
    value: (
      <div className="flex items-center gap-2">
        <span>{data.plan}</span>
        <span
          className={`p-1 text-[13px] leading-4 font-medium rounded-md border
            ${
              data.status === "Active"
                ? "bg-green-50 text-green-600 border-green-200"
                : data.status === "Paused"
                ? "bg-primary-30 text-primary-15 border-primary-35"
                : "bg-gray-100 text-gray-600 border-gray-300"
            }`}
        >
          {data.status}
        </span>
      </div>
    ),
  },
  { label: "Monthly Fee", value: data.monthlyFee },
  { label: "Next Billing Date", value: data.nextBillingDate ?? "Not Available" },
  {
    label: "Auto-Renewal",
    value: (
      <div className="flex items-center gap-2">
        <div className="w-10 h-6 flex items-center rounded-full bg-gray-100 px-1">
          <div className="w-4 h-4 rounded-full transition flex items-center justify-center">
            {data.autoRenewal ? (
              <TiTick className="text-primary-10 text-[10px]" />
            ) : (
              <img src={ICONS.cross} className="size-[10px]" />
            )}
          </div>
        </div>
        {data.autoRenewal ? "On" : "Off"}
      </div>
    ),
  },
]


  return (
    <DashboardContainer headerText="Subscription Details">
      <div className="space-y-6 bg-neutral-100 text-sm p-6 rounded-lg border-[1px] border-neutral-98">
        {details.map((item, index) => (
          <div key={index} className="flex text-neutral-20 justify-between items-center">
            <span className="font-medium ">{item.label}</span>
            <span >{item.value}</span>
          </div>
        ))}
      </div>
    </DashboardContainer>
  )
}

export default SubscriptionDetails
