
import { Link, useLocation, } from "react-router-dom";
import { ICONS } from "../../../../assets";

const Sidebar: React.FC = () => {
  const location = useLocation();

  // Helper function to check if the link is active
  const isActive = (path: string): boolean => location.pathname === path;

  // Objects to store the menus and their links
  const userMenus = [
    { name: "Dashboard", link: "/dashboard" },
    {
      name: "My Courses",
      link: "/dashboard/my-courses",
    },
    {
      name: "My Orders",
      link: "/dashboard/my-orders",
    },
    {
      name: "Consultations",
      link: "/dashboard/consultations",
    },
    {
      name: "Private Group Access",
      link: "/dashboard/my-profile",
    },
    {
      name: "My Profile",
      link: "/dashboard/certificates",
    },
    {
      name: "Fashion & Apparel",
      link: "/dashboard/fashion",
    },
  ];





  return (
    <div className="w-60 min-w-60 h-screen font-Inter flex flex-col justify-between sticky left-0 top-0 font-Montserrat overflow-auto">
      <div className="space-y-2">
        <Link to="/" className="flex items-center justify-center gap-2 w-full p-5 border-b border-b-neutral-98 border-r border-r-neutral-98 ">
          <img src={ICONS.logoWithName} alt="HanjiFinance" className="w-20 h-[58p]" />

        </Link>
        <div className="px-4">
          <ul className="flex flex-col gap-2">
            { userMenus.map((menu) => (
              <li
                key={menu.link}
                className={`px-3 py-2 ${
                  isActive(menu.link)
                    ? "bg-primary-30 text-primary-20 font-semibold"
                    : "text-neutral-20 "
                } hover:bg-neutral-155 rounded-lg text-neutral-20 font-medium`}
              >
                <Link to={menu.link} className="flex items-center gap-2">
                {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="rounded-xl mx-4 mb-6">
        <button
        //   onClick={handleLogout}
          className="hover:bg-primary-30 hover:text-primary-20 font-medium leading-[22px] w-full rounded-lg text-center flex items-center gap-2 justify-between py-2 px-3"
        >
          Logout
          <img src={ICONS.arrowLogout} alt="logout-icon" className="size-[18px]" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;