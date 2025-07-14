import React from "react";
import { twMerge } from "tailwind-merge";

interface GoalCardProps {
  icon: React.ReactNode;
  title: string;
  className?: string;
}

const GoalCard: React.FC<GoalCardProps> = ({ icon, title, className = "" }) => {
  const baseClasses =
    "py-4 px-2 rounded-lg bg-surface-40 text-center font-Montserrat text-[14px] font-medium flex flex-col items-center gap-3 w-full";

  return (
    <div className={twMerge(baseClasses, className)}>
      <img
        src={typeof icon === "string" ? icon : undefined}
        className="size-8 m-2"
      />
      <p className="pb-4 text-black ">{title}</p>
    </div>
  );
};

export default GoalCard;
