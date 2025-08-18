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
    <div className="bg-white rounded-2xl py-4 px-4">
      {(headerText || btn) && (
        <div className="flex justify-between items-center mb-4">
          {headerText && <h2 className="text-lg font-semibold mt-2">{headerText}</h2>}
          {btn && btnLink && (
            <Link
              to={btnLink}
              className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"
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
