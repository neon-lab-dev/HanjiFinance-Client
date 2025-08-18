import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface DashboardContainerProps {
  children: ReactNode;
  headerText?: string;
  btn?: string;
  btnLink?: string;
}

const DashboardContainer = ({ children, headerText, btn, btnLink }: DashboardContainerProps) => {
  return (
    <div className="bg-white rounded-2xl py-4 px-4 font-Montserrat">
      {(headerText || btn) && (
        <div className="flex justify-between items-center mb-4">
          {headerText && <h2 className="text-xl leading-[22px] font-semibold font-semibold mt-2 accent-5">{headerText}</h2>}
          {btn && btnLink && (
            <Link
              to={btnLink}
              className="text-primary-20 font-semibold leading-[22px]"
            >
              {btn}
            </Link>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export default DashboardContainer;
