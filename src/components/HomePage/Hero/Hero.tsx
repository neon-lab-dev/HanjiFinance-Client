import { ICONS, IMAGES } from "../../../assets";
import { FaAngleRight } from "react-icons/fa";
import Container from "../../Reusable/Container/Container";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import HeroHeading from "../../Reusable/HeroHeading/HeroHeading";
import AuthModal from "../../Auth/AuthModal/AuthModal";

const Hero = () => {
  const services = [
    {
      icon: ICONS.email,
      title: "Wall Street Weekly",
      description: "Subscribe to our newsletter",
      path: "/services/wall-street-weekly",
    },
    {
      icon: ICONS.whatsapp,
      title: "Boardroom Banter",
      description: "Join our WhatsApp group",
      path: "/services/boardroom-banter",
    },
    {
      icon: ICONS.financialFashion,
      title: "Financial Fashion",
      description: "Space for your Apparels",
      path: "/",
    },
    {
      icon: ICONS.brainGains,
      title: "Brain Gains",
      description: "Browse our courses",
      path: "/",
    },
    {
      icon: ICONS.fundManagement,
      title: "Fund Management",
      description: "View our Advisor services",
      path: "/",
    },
    {
      icon: ICONS.chatChill,
      title: "Chat & Chill",
      description: "Book a 1 on 1 call with Aman",
      path: "/services/chat-and-chill",
    },
  ];

  const logoVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <div className="relative overflow-hidden">
      <img
        src={IMAGES.heroBgImg}
        alt="hero-image"
        className="hidden xl:block absolute -top-30 lg:-top-20 xl:-top-15 left-0 w-full h-full object-fit z-0"
      />
      <img
        src={IMAGES.heroMobileBg}
        alt="hero-image"
        className="absolute xl:hidden left-0 w-full h-fit object-fill -z-100"
      />
      <div className="relative z-10 py-[68px]">
        
        <AuthModal/>
        <Container>
          
          <motion.img
            src={ICONS.logo}
            alt="Hanjifinance"
            className="size-full xl:w-[550px] xl:h-[236px] mx-auto"
            initial="hidden"
            animate="visible"
            variants={logoVariants}
          />
          <HeroHeading lines={["Build Wealth,", "One Click at a Time"]} />
          {/* All 6 services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[21px] mt-11 lg:mt-[101px]">
            {/* Service card */}
            {services?.map((service, index) => {
              const isFirstRow = index < 3;
              const animationProps = {
                initial: "hidden",
                variants: cardVariants,
                transition: { duration: 0.5, delay: (index % 3) * 0.2 + 0.4 },
                ...(isFirstRow
                  ? { animate: "visible" }
                  : {
                      whileInView: "visible",
                      viewport: { once: true, amount: 0.5 },
                    }),
              };

              return (
                <motion.div
                  key={service?.title}
                  className="bg-white border border-neutral-98 rounded-lg flex justify-between"
                  {...animationProps}
                >
                  <div className="flex flex-col gap-6 p-6">
                    <div className="bg-neutral-100 p-3 rounded-lg flex items-center justify-center w-fit">
                      <img src={service?.icon} alt="" className="size-9" />
                    </div>
                    <div>
                      <h1 className="text-neutral-10 text-[17px] font-semibold leading-5">
                        {service?.title}
                      </h1>
                      <p className="text-neutral-50 text-sm leading-5 mt-3">
                        {service?.description}
                      </p>
                    </div>

                    <a
                      href={service?.path}
                      className="text-primary-20 flex items-center gap-2 text-[17px] font-semibold leading-5 transition-all duration-300 delay-100 transform hover:-translate-y-1"
                    >
                      Learn More <FaAngleRight />
                    </a>
                  </div>

                  <div className="bg-neutral-99 px-[7px] flex items-center justify-center rounded-r-lg h-full">
                    <img
                      src={ICONS.logo}
                      alt="Hanjifinance"
                      className="w-[64px] h-[30px] mx-auto opacity-35"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Hero;
