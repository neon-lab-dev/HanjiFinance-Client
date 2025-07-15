import { RiTwitterXLine } from "react-icons/ri";
import { ICONS } from "../../../assets";
import Container from "../../Reusable/Container/Container";
import { Link } from "react-router-dom";
import { RxInstagramLogo } from "react-icons/rx";
import { CiLinkedin } from "react-icons/ci";
import { useState } from "react";

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
    {
      label: "Wall Street Weekly",
      path: "/wall-street-weekly",
    },
    {
      label: "Boardroom Banter",
      path: "/boardroom-banter",
    },
    {
      label: "Financial Fashion",
      path: "/financial-fashion",
    },
    {
      label: "Brain Gains",
      path: "/brain-gains",
    },
    {
      label: "Fund Management",
      path: "/fund-management",
    },
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
  return (
    <div className="bg-gradient-footer py-14 font-Montserrat">
      <Container>
        <div className="flex flex-col xl:flex-row gap-[76px] xl:gap-0 justify-between">
          <div>
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

            {/* Accordian */}
            <div className="flex flex-col w-full max-w-[412px] mt-[76px]">
              <article className="">
                <div className="cursor-pointer" onClick={handleToggle}>
                  <h2 className="text-primary-25 text-[15px] font-semibold leading-[18px]">
                    SEBI Disclaimer / Legal Notice
                  </h2>
                </div>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isAccordingOpen
                      ? "max-h-[1000px] opacity-100 mt-10"
                      : "max-h-0 opacity-0"
                  }`}
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
                </div>
              </article>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h1 className="text-neutral-90 text-[17px] font-semibold leading-5">
              Quick Links
            </h1>
            <div className="mt-8 flex flex-col gap-4">
              {quickLinks?.map((item) => (
                <Link
                  key={item?.label}
                  to={item?.path}
                  className="text-neutral-90 text-[15px] leading-6 hover:underline max-w-[230px]"
                >
                  {item?.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h1 className="text-neutral-90 text-[17px] font-semibold leading-5">
              Contact Us
            </h1>
            <div className="mt-8 flex flex-col gap-4">
              {contactDetails?.map((item, index) =>
                item?.href ? (
                  <a
                    key={index}
                    href={item?.href}
                    className={`text-neutral-90 text-[15px] leading-[18px] max-w-[372px] hover:underline flex gap-4 ${
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
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
