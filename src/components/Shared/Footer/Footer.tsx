import { RiTwitterXLine } from "react-icons/ri";
import { ICONS } from "../../../assets";
import Container from "../../Reusable/Container/Container";
import { RxInstagramLogo } from "react-icons/rx";
import { CiLinkedin } from "react-icons/ci";
import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";

const Footer = () => {
  const socialMediaDetails = [
    {
      icon: <RiTwitterXLine />,
      href: "https://www.instagram.com/hanjifinance/",
    },
    {
      icon: <RxInstagramLogo />,
      href: "https://www.instagram.com/hanjifinance/",
    },
    {
      icon: <CiLinkedin className="text-[28px]" />,
      href: "https://www.instagram.com/hanjifinance/",
    },
  ];

  const quickLinks = [
    {
      label: "About Us",
      path: "/about-us",
    },
    {
      label: "Terms and Conditions",
      path: "/terms-and-conditions",
    },
    {
      label: "Privacy Policy",
      path: "/privacy-policy",
    },
    {
      label: "Refund & Cancellation policy",
      path: "/refund-cancellation-policy",
    },
    {
      label: "Client Grievance Redressal Mechanism",
      path: "/client-grievance-mechanism",
    },
    // {
    //   label: "Wall Street Weekly",
    //   path: "/wall-street-weekly",
    // },
    // {
    //   label: "Boardroom Banter",
    //   path: "/boardroom-banter",
    // },
    // {
    //   label: "Financial Fashion",
    //   path: "/financial-fashion",
    // },
    // {
    //   label: "Brain Gains",
    //   path: "/brain-gains",
    // },
    // {
    //   label: "Fund Management",
    //   path: "/fund-management",
    // },
  ];

  const contactDetails = [
    {
      icon: ICONS.location,
      text: "1234 Financial District, Mumbai, Maharashtra 400001, India",
    },
    {
      icon: ICONS.phone,
      text: "+91 98765 00000",
      href: "tel:+919876500000",
    },
    {
      icon: ICONS.emailGray,
      text: "info@hanjifinance.com",
      href: "mailto:info@hanjifinance.com",
    },
  ];

  const accordingData = [
    {
      title: "SEBI Disclaimer",
      description:
        "Registration granted by the Securities and Exchange Board of India (SEBI) does not imply approval or guarantee of performance. Investments in securities markets are subject to market risks. Read all scheme-related documents carefully.",
    },
    {
      title: "Investment Risk Disclosure",
      description:
        "Past performance is not indicative of future results. All returns are illustrative and not assured. Users should evaluate their risk appetite before acting on any information provided by Hanjifinance.",
    },
  ];

  const [isAccordingOpen, setIsAccordingOpen] = useState<boolean>(false);

  const handleToggle = () => setIsAccordingOpen(!isAccordingOpen);

  const footerContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const columnVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
  return (
    <motion.div
      className="bg-gradient-footer py-14 font-Montserrat"
      variants={footerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <Container>
        <div className="flex flex-col xl:flex-row gap-[76px] xl:gap-0 justify-between">
          {/* Left Column */}
          <motion.div variants={columnVariants}>
            <img
              src={ICONS.logoWithName}
              alt="Hanjifinance"
              className="w-20 h-[58px]"
            />
            <p className="text-neutral-90 text-sm leading-5 mt-8 max-w-[412px]">
              Your trusted partner on the journey to financial freedom. We
              provide expert guidance, education, and personalized strategies to
              help you achieve your financial goals.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-6 mt-9">
              {socialMediaDetails?.map((item, index) => (
                <a
                  key={index}
                  href={item?.href}
                  target="_blank"
                  className="text-2xl text-neutral-90 hover:text-primary-20 transition-all duration-300 delay-100 transform hover:-translate-y-1"
                >
                  {item?.icon}
                </a>
              ))}
            </div>

            {/* Accordion */}
            <div className="flex flex-col w-fit max-w-[412px] mt-[76px]">
              <article>
                <div className="cursor-pointer" onClick={handleToggle}>
                  <h2 className="text-primary-25 text-[15px] font-semibold leading-[18px]">
                    SEBI Disclaimer / Legal Notice
                  </h2>
                </div>
                <AnimatePresence initial={false}>
                  {isAccordingOpen && (
                    <motion.div
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: "auto", marginTop: "40px" },
                        collapsed: { opacity: 0, height: 0, marginTop: "0px" },
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-4">
                        {accordingData.map((item, idx) => (
                          <div key={idx}>
                            <h3 className="text-neutral-90 text-[15px] font-semibold leading-[18px]">
                              {item.title}
                            </h3>
                            <p className="text-neutral-90 text-sm leading-5 mt-2">
                              {item.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            </div>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div variants={columnVariants}>
            <h1 className="text-neutral-90 text-[17px] font-semibold leading-5">
              Quick Links
            </h1>
            <div className="mt-8 flex flex-col gap-4">
              {quickLinks?.map((item) => (
                <a
                  key={item?.label}
                  href={item?.path}
                  className="text-neutral-90 text-[15px] leading-6 hover:underline w-fit max-w-[230px]"
                >
                  {item?.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact Info Column */}
          <motion.div variants={columnVariants}>
            <h1 className="text-neutral-90 text-[17px] font-semibold leading-5">
              Contact Us
            </h1>
            <div className="mt-8 flex flex-col gap-4">
              {contactDetails?.map((item, index) =>
                item?.href ? (
                  <a
                    key={index}
                    href={item?.href}
                    className={`text-neutral-90 text-[15px] leading-[18px] w-fit max-w-[372px] hover:underline flex gap-4 ${
                      index === 0 ? "items-start" : "items-center"
                    }`}
                  >
                    <img src={item?.icon} alt="" className="size-6" />
                    {item?.text}
                  </a>
                ) : (
                  <div
                    key={index}
                    className={`text-neutral-90 text-[15px] leading-6 max-w-[372px] flex gap-4 ${
                      index === 0 ? "items-start" : "items-center"
                    }`}
                  >
                    <img src={item?.icon} alt="" className="size-6" />
                    {item?.text}
                  </div>
                )
              )}
            </div>
          </motion.div>
        </div>
      </Container>
    </motion.div>
  );
};

export default Footer;
