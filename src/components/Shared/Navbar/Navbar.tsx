/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../../Reusable/Container/Container";
import { ICONS } from "../../../assets";
import { IoChevronDownSharp, IoClose } from "react-icons/io5";
import Button from "../../Reusable/Button/Button";
import MegaMenu from "./MegaMenu";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../../redux/Features/Auth/authModalSlice";
import { getCartProducts } from "../../../redux/Features/Cart/cartSlice";
import { useCurrentUser } from "../../../redux/Features/Auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartProducts = useSelector(getCartProducts);
  const cartCount = cartProducts.length;

  const user = useSelector(useCurrentUser);

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
          path: "/advisor-services",
        },
        {
          label: "Chat & Chill",
          path: "/services/chat-and-chill",
        },
      ],
    },
    {
      label: "Contact Us",
      path: "/contact-us",
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
        setIsMobileMenuOpen(false);
      },
    },
    {
      icons: ICONS.user,
      path: "/",
      onClick: () => {
        if (!user) {
          dispatch(openModal("login"));
        } else {
          navigate("/dashboard");
        }
        setIsMobileMenuOpen(false);
      },
    },
  ];

  // Animation variants
  const mobileMenuVariants:any = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const menuItemVariants:any = {
    closed: {
      opacity: 0,
      x: 50,
      transition: {
        duration: 0.2
      }
    },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  const dropdownVariants:any = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveDropdown(null);
  };

  const handleNavLinkClick = (item: any) => {
    if (!item.isDropDown) {
      setIsMobileMenuOpen(false);
    }
  };

  const toggleServicesDropdown = () => {
    setActiveDropdown(activeDropdown === "Services" ? null : "Services");
  };

  return (
    <div className="sticky top-0 py-4 bg-white shadow-navbar font-Montserrat w-full z-50">
      <Container>
        <div className="flex items-center justify-between">
          <a href={"/"}>
            <img
              src={ICONS.logoWithName}
              alt="HanjiFinance"
              className="w-[52px] md:w-[85px] h-9 md:h-[58px]"
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
                  <div className="absolute -top-1 -right-1 bg-primary-10 size-3.4 rounded-full flex items-center justify-center text-xs text-white">
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
            
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden cursor-pointer"
            >
              <img src={ICONS.hamburgerMenu} alt="menu" className="size-6" />
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
              className="fixed inset-0 bg-black/20 z-40 md:hidden"
            />
            
            {/* Mobile Menu Panel */}
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 md:hidden overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <img
                  src={ICONS.logoWithName}
                  alt="HanjiFinance"
                  className="w-16 h-12"
                />
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <IoClose className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Menu Items */}
              <div className="p-6 space-y-4">
                {navLinks.map((item, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={menuItemVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    {item.isDropDown ? (
                      <div className="space-y-2">
                        <button
                          onClick={toggleServicesDropdown}
                          className={`w-full text-left flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                            activeDropdown === item.label
                              ? "bg-primary-10 text-white"
                              : "bg-gray-50 text-gray-900 hover:bg-gray-100"
                          }`}
                        >
                          <span className="font-medium">{item.label}</span>
                          <IoChevronDownSharp
                            className={`w-4 h-4 transition-transform duration-200 ${
                              activeDropdown === item.label ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {activeDropdown === item.label && (
                            <motion.div
                              variants={dropdownVariants}
                              initial="closed"
                              animate="open"
                              exit="closed"
                              className="overflow-hidden"
                            >
                              <div className="ml-4 space-y-2 border-l-2 border-gray-200 pl-4 py-2">
                                {item.dropdownLinks.map((dropdownItem, idx) => (
                                  <motion.a
                                    key={idx}
                                    href={dropdownItem.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block p-2 text-gray-700 hover:text-primary-10 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                  >
                                    {dropdownItem.label}
                                  </motion.a>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <a
                        href={item.path}
                        onClick={() => handleNavLinkClick(item)}
                        className={`block p-3 rounded-lg transition-all duration-200 font-medium ${
                          location.pathname === item.path
                            ? "bg-primary-10 text-white"
                            : "bg-gray-50 text-gray-900 hover:bg-gray-100"
                        }`}
                      >
                        {item.label}
                      </a>
                    )}
                  </motion.div>
                ))}

                {/* Mobile Book a Call Button */}
                <motion.div
                  custom={navLinks.length}
                  variants={menuItemVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="pt-4"
                >
                  <Link 
                    to="/services/chat-and-chill#chat-chill-booking"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button 
                      label="Book a Call" 
                      variant="secondary"
                    />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;