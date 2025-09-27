import { Link, useLocation, useNavigate } from "react-router-dom";
import { ICONS } from "../../../../assets";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  setUser,
  useCurrentUser,
} from "../../../../redux/Features/Auth/authSlice";
import type { TUser } from "../../../../types/user.types";
import Cookies from "js-cookie";
import {
  FiHome,
  FiMail,
  FiBox,
  FiShoppingCart,
  FiBookOpen,
  FiUserCheck,
  FiUsers,
  FiKey,
  FiUser,
  FiShoppingBag,
  FiHelpCircle
} from "react-icons/fi";
import { AiOutlineCheckCircle, AiOutlineTag } from "react-icons/ai";


const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector(useCurrentUser) as TUser;
  const dispatch = useDispatch();
  const isActive = (path: string): boolean => location.pathname === path;

  const userMenus = [
  { name: "Dashboard", link: "/dashboard", icon: FiHome },
  {
    name: "My Courses",
    link: "/dashboard/my-courses",
    icon: FiBookOpen,
  },
  {
    name: "My Orders",
    link: "/dashboard/my-orders",
    icon: FiShoppingBag,
  },
  {
    name: "Consultations",
    link: "/dashboard/consultations",
    icon: FiUserCheck,
  },
  {
    name: "My Subscriptions",
    link: "/dashboard/my-subscriptions",
    icon: FiUsers,
  },
  {
    name: "Help Desk",
    link: "/dashboard/helpdesk",
    icon: FiHelpCircle,
  },
  {
    name: "My Profile",
    link: "/dashboard/certificates",
    icon: FiUser,
  },
];
   const adminMenus = [
  { name: "Dashboard", link: "/dashboard/admin", icon: FiHome },
  {
    name: "Newsletters",
    link: "/dashboard/admin/newsletter",
    icon: FiMail,
  },
  {
    name: "Category",
    link: "/dashboard/admin/category",
    icon: AiOutlineTag,
  },
  {
    name: "Products",
    link: "/dashboard/admin/products",
    icon: FiBox,
  },
  {
    name: "Product Orders",
    link: "/dashboard/admin/product-orders",
    icon: FiShoppingCart,
  },
  {
    name: "Course Orders",
    link: "/dashboard/admin/course-orders",
    icon: FiBookOpen,
  },
  {
    name: "Courses",
    link: "/dashboard/admin/courses",
    icon: FiBookOpen,
  },
  {
    name: "Availability",
    link: "/dashboard/admin/manage-availability",
    icon: AiOutlineCheckCircle,
  },
  {
    name: "Consultations",
    link: "/dashboard/admin/manage-consultations",
    icon: FiUserCheck,
  },
  {
    name: "Subscriptions",
    link: "/dashboard/admin/manage-subscriptions",
    icon: FiUsers,
  },
  {
    name: "Coupon Code",
    link: "/dashboard/admin/manage-coupon-codes",
    icon: FiKey,
  },
  {
    name: "Queries",
    link: "/dashboard/admin/queries",
    icon: FiHelpCircle,
  },
];

  const sidebarLinks = user?.role === "admin" ? adminMenus : userMenus;

  const handleLogout = async () => {
    dispatch(setUser({ user:null, token: null }));
    Cookies.remove("accessToken");
    Cookies.remove("role");
    dispatch(logout());
    localStorage.clear();
    navigate("/auth/signin");
  };

  return (
    <div className="w-60 min-w-60 h-screen font-Inter flex flex-col justify-between sticky left-0 top-0 font-Montserrat overflow-auto">
      <div className="space-y-7">
        <Link
          to="/"
          className="flex items-center justify-center gap-2 w-full p-5 border-b border-b-neutral-98 border-r border-r-neutral-98 "
        >
          <img
            src={ICONS.logoWithName}
            alt="HanjiFinance"
            className="w-20 h-[58p]"
          />
        </Link>
        <div className="px-4">
          <ul className="flex flex-col gap-2">
            {sidebarLinks?.map((menu) => (
              <li
                key={menu.link}
                className={`px-3 py-2 ${
                  isActive(menu.link)
                    ? "bg-primary-30 text-primary-20 font-semibold"
                    : "text-neutral-20 "
                } hover:bg-neutral-155 rounded-lg text-neutral-20 font-medium cursor-pointer transition duration-300 ease-in-out`}
              >
                <Link to={menu.link} className="flex items-center gap-3">
                 <menu.icon className="text-lg" /> {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="rounded-xl mx-4 mb-6">
        <button
          onClick={handleLogout}
          className="hover:bg-primary-30 hover:text-primary-20 font-medium leading-[22px] w-full rounded-lg text-center flex items-center gap-2 justify-between py-2 px-3 cursor-pointer"
        >
          Logout
          <img
            src={ICONS.arrowLogout}
            alt="logout-icon"
            className="size-[18px]"
          />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
