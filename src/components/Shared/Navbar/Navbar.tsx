import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "../../Reusable/Container/Container";
import { ICONS } from "../../../assets";
import { IoChevronDownSharp } from "react-icons/io5";
import Button from "../../Reusable/Button/Button";
import MegaMenu from "./MegaMenu";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../../redux/Features/Auth/authModalSlice";
import { getCartProducts } from "../../../redux/Features/Cart/cartSlice";
import { useAuthToken } from "../../../redux/Features/Auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const cartProducts = useSelector(getCartProducts);
  const cartCount = cartProducts.length;

  const userToken = useSelector(useAuthToken);
  // Type for each nav item
  type IconNavLink = {
    icons: string;
    path: string;
    count?: number;
    onClick?: () => void;
  };

  const navLinks = [
    { label: "Home", path: "/", isDropDown: false, dropdownLinks: [] },
    {
      label: "Services",
      path: "/services",
      isDropDown: true,
      dropdownLinks: [
        {
          label: "Wall Street Weekly",
          path: "/services/wall-street-weekly",
        },
        {
          label: "Boardroom Banter",
          path: "/services/boardroom-banter",
        },
        {
          label: "Financial Fashion",
          path: "/fashion-and-apparels",
        },
        {
          label: "Brain Gains",
          path: "/courses",
        },
        {
          label: "Fund Management",
          path: "/",
        },
        {
          label: "Chat & Chill",
          path: "/services/chat-and-chill",
        },
      ],
    },
    {
      label: "Contact Us",
      path: "/",
      isDropDown: false,
      dropdownLinks: [],
    },
  ];

  const iconNavLinks: IconNavLink[] = [
    {
      icons: ICONS.cartPlus,
      path: "/cart",
      count: cartCount,
      onClick: () => {
        navigate("/cart");
      },
    },
    {
      icons: ICONS.user,
      path: "/",
      onClick: () => {
        if (!userToken) {
          dispatch(openModal("login"));
        } else {
          navigate("/dashboard");
        }
      },
    },
  ];

  return (
    <div className="sticky top-0 py-4 bg-white shadow-navbar font-Montserrat w-full z-50">
      <Container>
        <div className="flex items-center justify-between">
          <a href={"/"}>
            <img
              src={ICONS.logoWithName}
              alt="HanjiFinance"
              className="w-[52px] md:w-[85px] h-[36px] md:h-[58px]"
            />
          </a>

          <div
            className={`items-center gap-6 ${
              location.pathname === "/payment" ||
              location.pathname === "/payment-success" ||
              location.pathname === "/payment-cancelled"
                ? "hidden"
                : "flex"
            }`}
          >
            <div className="hidden md:flex items-center gap-6 relative">
              {navLinks.map((item, index) => (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() =>
                    item.isDropDown && setActiveDropdown(item.label)
                  }
                >
                  {item?.label === "Services" ? (
                    <button
                      onClick={() =>
                        item.isDropDown &&
                        setActiveDropdown((prev) =>
                          prev === item.label ? null : item.label
                        )
                      }
                      className={`text-[15px] leading-[18px] cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 ${
                        activeDropdown === item.label ? "text-primary-10" : ""
                      } hover:text-primary-10 transition duration-300 flex items-center gap-1 ${
                        location.pathname === item.path
                          ? "text-primary-10 font-bold"
                          : "text-neutral-15 font-medium"
                      }`}
                    >
                      {item.label}
                      {item.isDropDown && (
                        <IoChevronDownSharp
                          className={`text-[20px] transition-all duration-300 ease-in-out ${
                            activeDropdown === item.label
                              ? "rotate-180"
                              : "rotate-0"
                          }`}
                        />
                      )}
                    </button>
                  ) : (
                    <a
                      href={item.path}
                      className={`text-[15px] leading-[18px] transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 ${
                        activeDropdown === item.label ? "text-primary-10" : ""
                      } hover:text-primary-10 transition duration-300 flex items-center gap-1 ${
                        location.pathname === item.path
                          ? "text-primary-10 font-bold"
                          : "text-neutral-15 font-medium"
                      }`}
                    >
                      {item.label}
                      {item.isDropDown && (
                        <IoChevronDownSharp
                          className={`text-[20px] transition-all duration-300 ease-in-out ${
                            activeDropdown === item.label
                              ? "rotate-180"
                              : "rotate-0"
                          }`}
                        />
                      )}
                    </a>
                  )}

                  {item.isDropDown && (
                    <MegaMenu
                      isOpen={activeDropdown === item.label}
                      onClose={() => setActiveDropdown(null)}
                      links={item.dropdownLinks}
                    />
                  )}
                </div>
              ))}
            </div>

            {iconNavLinks.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className="cursor-pointer relative"
              >
                <img
                  src={item.icons}
                  alt="icon"
                  className="size-6 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
                />
                {item?.count && item?.count > 0 ? (
                  <div className="absolute -top-1 -right-1 bg-primary-10 size-[14px] rounded-full flex items-center justify-center text-xs text-white">
                    {item.count}
                  </div>
                ) : (
                  ""
                )}
              </button>
            ))}
            <Link to="/services/chat-and-chill#chat-chill-booking">
              <div className="hidden md:block">
                <Button label="Book a Call" variant="secondary" />
              </div>
            </Link>
            <div className="md:hidden">
              <img src={ICONS.hamburgerMenu} alt="menu" className="size-6" />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
