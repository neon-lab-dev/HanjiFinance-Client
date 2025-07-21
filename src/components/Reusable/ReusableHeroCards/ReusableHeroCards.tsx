import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Container from "../Container/Container";

interface DetailItem {
  value: React.ReactNode; // now supports JSX (bold, spans, etc.)
  icon?: React.ReactNode;
}

interface ReusableHeroProps {
  details: DetailItem[]; 
  iconSize?: string; 
  bg?:string
}

const ReusableHeroCards = ({

  details,// Default to the current background
  iconSize = "24px", 
  bg // Default size for icons
}: ReusableHeroProps) => {

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
    <div className=" relative font-Montserrat overflow-hidden">
      {/* Background image */}
   
      <Container>
        <div className="relative z-10 mt-6 pb-20">
         

          {/* Details Section */}
          <motion.div
            className="flex flex-col xl:flex-row items-center justify-center gap-8 xl:gap-3 mt-8 xl:mt-6"
            initial="hidden"
            animate="visible"
            variants={detailsContainerVariants}
          >
            {details.map((item, index, arr) => (
              <motion.div
                key={index}
                className="flex flex-col xl:flex-row items-center"
                variants={detailItemVariants}
              >
              
               

                {/* Label */}
                <div className={`${bg} px-1 mr-[1px] py-1 text-neutral-30 text-[15px] xl:text-[13px] 2xl:text-[15px] font-medium leading-[18px] rounded-[30px] w-fit`}>
                  {item.icon && (
                  <div
                    className="flex items-center justify-center"
                    style={{ width: iconSize, height: iconSize }}
                  >
                    {item.icon}
                  </div>
                )}
                </div>

                {/* Value */}
                <p className="text-neutral-30 text-xl xl:text-[13px] 2xl:text-xl font-medium leading-6">
                  {item.value}
                </p>

                {/* Separator */}
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

export default ReusableHeroCards;
