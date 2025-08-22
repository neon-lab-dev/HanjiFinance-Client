import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ICONS } from "../../../../assets";
const HeaderDashboard = () => {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);

  // Set isAdmin based on the current route
  useEffect(() => {
    setIsAdmin(location.pathname.startsWith("/admin"));
  }, [location.pathname]);
  const pageTitles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/dashboard/my-courses": "My Courses",
    "/dashboard/my-orders": "My Orders",
    "/dashboard/consultations": "Consultations",
    "/dashboard/my-profile": "Private Group Access",
    "/dashboard/certificates": "My Profile",
    "/dashboard/fashion": "Fashion & Apparel",
    "/dashboard/recent-activities": "Dashboard",
    "/dashboard/book-new-session": "Consultations",
    "/dashboard/my-subscriptions": "My Subscriptions",
    "/dashboard/pause-subscription": "My Subscriptions",
    "/dashboard/reactivate-subscription": "My Subscriptions",
    "/dashboard/cancel-subscription": "My Subscriptions",
    "/dashboard/update-subscription": "My Subscriptions",
  };
  
  useEffect(() => {
    setIsAdmin(location.pathname.startsWith("/admin"));
  }, [location.pathname]);

  let currentTitle = pageTitles[location.pathname] || "";
    if (location.pathname.startsWith("/dashboard/my-courses/")) {
    currentTitle = "My Courses";
  }


  return (
    <div className="bg-white p-6 h-[97.5px] border-b border-b-neutral-98 text-3xl flex justify-between items-center pr-4 sticky top-0 z-20 font-Montserrat">
      <div className="text-neutral-20 space-y-1 flex flex-col">
        <h2 className="font-medium text-2xl">{currentTitle}</h2>
        <span className="text-[13px]">Friday, August 1, 2025</span>
      </div>
      <ul className="flex gap-5">
        {!isAdmin && (
          <>
            <li className="relative">
              <Link to="/cart">
                <img src={ICONS.cartPlus} className="size-6" />
              </Link>
              <div className="size-4 rounded-full bg-blue-10 text-white flex items-center justify-center text-xs absolute -top-2 -right-2">
                {1}
              </div>
            </li>
          </>
        )}
        <li>
          <Link to="/dashboard">
            <img src={ICONS.bell} className="size-6" />
          </Link>
        </li>
        <li>
          <Link to="/dashboard">
            <img src={ICONS.user} className="size-6" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default HeaderDashboard;
