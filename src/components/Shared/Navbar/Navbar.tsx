import { Link, useLocation } from "react-router-dom";
import Container from "../../Reusable/Container/Container";
import { ICONS } from "../../../assets";
import { IoChevronDownSharp } from "react-icons/io5";

const Navbar = () => {
  const location = useLocation();
  const navlinks = [
    {
      label: "Home",
      path: "/",
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
            {navlinks?.map((item) => (
              <Link
                key={item.label}
                to={item?.path}
                className={`text-[15px] leading-[18px] hover:text-primary-10 transition duration-300 ${
                  location.pathname === item?.path
                    ? "text-primary-10 font-bold"
                    : "text-neutral-15 font-medium"
                }`}
              >
                Home
              </Link>
            ))}

            <button
              className={`text-[15px] leading-[18px] text-neutral-15 hover:text-primary-10 transition duration-300 font-medium cursor-pointer flex items-center gap-1`}
            >
              Services
              <IoChevronDownSharp className="text-lg" />
              {/* <img src={ICONS.arrowDown} alt="down-arrow" className="size-5" /> */}
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
