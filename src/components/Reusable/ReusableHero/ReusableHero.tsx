import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { IMAGES } from "../../../assets";
import Container from "../Container/Container";

const ReusableHero = ({ title }: { title: string }) => {
  const details = [
    {
      label: "Owner",
      value: "Amandeep Singh Juneja",
    },
    {
      label: "SEBI Registration No.",
      value: "To be updated post-approval",
    },
    {
      label: "Contact:",
      value: "hanjifinanceteam@gmail.com",
    },
  ];

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const detailsContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const detailItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-surface-30 relative font-Montserrat overflow-hidden">
      <img
        src={IMAGES.heroBg}
        alt="hero-image"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      <Container>
        <div className="relative z-10 pt-20 md:pt-[148px] pb-20">
          <motion.h1
            className="text-neutral-30 text-[32px] md:text-[64px] font-bold leading-9 md:leading-[70px] text-center max-w-[1000px] mx-auto"
            initial="hidden"
            animate="visible"
            variants={titleVariants}
          >
            {title}
          </motion.h1>

          <motion.div
            className="flex flex-col xl:flex-row items-center justify-center gap-8 xl:gap-3 mt-8 xl:mt-6"
            initial="hidden"
            animate="visible"
            variants={detailsContainerVariants}
          >
            {details.map((item, index, arr) => (
              <motion.div
                key={item.label}
                className="flex flex-col xl:flex-row items-center gap-2 xl:gap-[2px]"
                variants={detailItemVariants}
              >
                <div className="bg-surface-70 px-2 py-1 text-neutral-30 text-[15px] xl:text-[13px] 2xl:text-[15px] font-medium leading-[18px] rounded-[30px] w-fit">
                  {item.label}
                </div>
                <p className="text-neutral-30 text-[15px] xl:text-[13px] 2xl:text-xl font-medium leading-6">
                  {item.value}
                </p>
                {index !== arr.length - 1 && (
                  <span className="text-neutral-90 text-[28px] font-medium leading-8 mx-2 hidden xl:block">
                    |
                  </span>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default ReusableHero;
