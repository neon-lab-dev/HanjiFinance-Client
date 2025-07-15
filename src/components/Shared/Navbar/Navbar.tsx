import { Link, useLocation } from "react-router-dom";
import Container from "../../Reusable/Container/Container";
import { ICONS } from "../../../assets";
import { IoChevronDownSharp } from "react-icons/io5";
import Button from "../../Reusable/Button/Button";

const Navbar = () => {
  const location = useLocation();
  const navLinks = [
    {
      label: "Home",
      path: "/",
      isDropDown: false,
    },
    {
      label: "Services",
      path: "/services",
      isDropDown: true,
    },
    {
      label: "Contact Us",
      path: "/contact-us",
      isDropDown: false,
    },
  ];
  const iconNavLinks = [
    {
      icons: ICONS.cartPlus,
      path: "cart",
    },
    {
      icons: ICONS.user,
      path: "/profile",
    },
  ];
  return (
    <div className="py-4 bg-white shadow-navbar font-Montserrat">
      <Container>
        <div className="flex items-center justify-between">
          <Link to={"/"}>
            <img
              src={ICONS.logoWithName}
              alt="HanjiFinance"
              className="w-[85px] h-[58px]"
            />
          </Link>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6">
              {navLinks?.map((item) => (
                <Link
                  key={item.label}
                  to={item?.path}
                  className={`text-[15px] leading-[18px] hover:text-primary-10 transition duration-300 flex items-center gap-1 ${
                    location.pathname === item?.path
                      ? "text-primary-10 font-bold"
                      : "text-neutral-15 font-medium"
                  }`}
                >
                  {item.label}
                  {/* {item.isDropDown && <img src={ICONS.arrowDown} alt="down-arrow" className="size-5" />} */}
                  {item.isDropDown && (
                    <IoChevronDownSharp className="text-[20px]" />
                  )}
                </Link>
              ))}
            </div>

            {iconNavLinks?.map((item) => (
              <Link key={item.icons} to={item?.path} className={``}>
                <img src={item.icons} alt="down-arrow" className="size-6" />
              </Link>
            ))}
            <div className="hidden md:block">
              <Button label="Book a Call" variant="secondary" />
            </div>
            <div className="md:hidden">
              <img src={ICONS.hamburgerMenu} alt="down-arrow" className="size-6" />
  </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
