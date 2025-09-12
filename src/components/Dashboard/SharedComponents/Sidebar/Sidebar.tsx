
import { Link, useLocation, useNavigate, } from "react-router-dom";
import { ICONS } from "../../../../assets";
import { useDispatch, useSelector } from "react-redux";
import { logout, useCurrentUser } from "../../../../redux/Features/Auth/authSlice";
import type { TUser } from "../../../../types/user.types";
import Cookies from "js-cookie";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate= useNavigate();
  const user= useSelector(useCurrentUser) as TUser;
  const dispatch =useDispatch();
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
      name: "My Subscriptions",
      link: "/dashboard/my-subscriptions",
    },
    {
      name: "My Profile",
      link: "/dashboard/certificates",
    },
  ];
  const adminMenus = [
    { name: "Dashboard", link: "/dashboard/admin" },
    {
      name: "Products",
      link: "/dashboard/admin/products",
    },
    {
      name: "Newsletters",
      link: "/dashboard/admin/newsletter",
    },
    {
      name: "Orders",
      link: "/dashboard/admin/orders",
    },
    {
      name: "Courses",
      link: "/dashboard/admin/courses",
    },
    {
      name: "Consultations",
      link: "/dashboard/admin/manage-consultations",
    },
    {
      name: "Subscriptions",
      link: "/dashboard/admin/manage-subscriptions",
    },
    {
      name: "My Profile",
      link: "/dashboard/certificates",
    },
  ];

  const sidebarLinks = user?.role === "admin" ? adminMenus : userMenus;




 const handleLogout = async () => {
    Cookies.remove("accessToken");
    Cookies.remove("role");
    dispatch(logout());
    localStorage.clear();
    navigate("/auth/signin");
  };

  return (
    <div className="w-60 min-w-60 h-screen font-Inter flex flex-col justify-between sticky left-0 top-0 font-Montserrat overflow-auto">
      <div className="space-y-2">
        <Link to="/" className="flex items-center justify-center gap-2 w-full p-5 border-b border-b-neutral-98 border-r border-r-neutral-98 ">
          <img src={ICONS.logoWithName} alt="HanjiFinance" className="w-20 h-[58p]" />

        </Link>
        <div className="px-4">
          <ul className="flex flex-col gap-2">
            { sidebarLinks.map((menu) => (
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
          onClick={handleLogout}
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