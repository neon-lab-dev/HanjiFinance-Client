import React from "react";
import { ICONS } from "../../../../assets";
import { formatDate } from "../../../../utils/formatDate";
import { CgCalendarDates } from "react-icons/cg";
import type { TProductOrder } from "../../../../types/productOrder.types";

interface MyOrdersCardProps {
  order: TProductOrder;
}

const MyOrdersCard: React.FC<MyOrdersCardProps> = ({ order }) => {
  return (
    <div className="flex items-center justify-between rounded-lg border-[1px] w-full border-neutral-98 bg-surface-30 p-4 font-Montserrat">
      <div className="gap-4 flex items-center justify-center w-fit">
        <div className=" bg-secondary-25 rounded-lg size-[72px] text-sm font-semibold">
          <div className="h-[54px] flex items-center justify-center text-secondary-10 text-4xl font-medium">
            {" "}
            {order.orderedItems?.length || 0}
          </div>
          <div className="text-[11px] font-medium leading-[14px] text-center bg-neutral-120 w-full px-1 py-[2px] rounded-b-lg">
            Total Item{order?.orderedItems?.length > 1 ? "s" : ""}
          </div>
        </div>
        <div className="text-neutral-20 w-[452px]">
          <h2 className="font-medium leading-[22px] text-base truncate">
            Fashion and Apparels
          </h2>

          <p className="text-[13px] text-neutral-20">
            Order #{order.orderId} | ₹{order.totalAmount}
          </p>

          <p className="flex items-center gap-2 mt-2 text-neutral-85 text-[11px]">
            <CgCalendarDates />
            {formatDate(order?.createdAt)}
          </p>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-md ml-[300px] h-fit
    ${
      order.status === "shipped"
        ? "bg-green-50 text-green-600"
        : order.status === "pending"
        ? "bg-yellow-50 text-yellow-600"
        : order.status === "cancelled"
        ? "bg-red-50 text-red-600"
        : ""
    }`}
        >
          {order.status}
        </span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Action Icons */}
        <img src={ICONS.eye} alt="view" className="size-6 cursor-pointer" />
        <img
          src={ICONS.download}
          alt="download"
          className="size-6 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default MyOrdersCard;
