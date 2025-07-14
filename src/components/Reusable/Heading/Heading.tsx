import React from "react";
import { twMerge } from "tailwind-merge";

interface SectionTitleProps {
  children: React.ReactNode; 
  subtext?: string;         
  color?: string;            
  subtextColor?: string;     
  className?: string;    
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  subtext,
  color = "text-secondary-15",
  subtextColor = "text-gray-600",
  className = "",
}) => {
  const headingClasses = twMerge(
    "text-center -tracking-[0.16px] text-[32px] font-bold leading-[36px] mb-3",
    color,
    className
  );

  const subtextClasses = twMerge(
    "text-center text-[16px] leading-[24px] font-normal",
    subtextColor
  );

  return (
    <div className="pb-6 font-Montserrat">
      <h1 className={headingClasses}>{children}</h1>
      {subtext && <p className={subtextClasses}>{subtext}</p>}
    </div>
  );
};

export default SectionTitle;
