import { useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Button from "../../Reusable/Button/Button";
import { useNavigate } from "react-router-dom";


export type TCourse = {
  _id:string,
  imageUrl?: string;
  title: string;
  subtitle: string;
  tagline: string;
  benefits : string[];
  accessType : "lifetime" | "limited";
  accessValidity: Date;
  category: string;
  basePrice: number;
  discountedPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
};

const CourseCard: React.FC<TCourse> = ({
  _id,
  title,
  subtitle,
  tagline,
  imageUrl,
  basePrice,
  accessType,
  benefits
,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate=useNavigate()
  const handleClick = () => setIsOpen((prev) => !prev);
  const blurVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1, ease: "easeOut", delay: 0.5 },
    },
  };
  return (
    <div
      className={`bg-white rounded-xl shadow-lg font-Montserrat ${
        isOpen ? "h-full " : ""
      } `}
    >
      <div> <img src={imageUrl} alt={title} className="rounded-t-xl w-full h-[250px]" /></div>
      {/* Course Image */}
     

      <div className="flex flex-col gap-4  pb-4 ">
        {/* Course Details */}
        <div className="bg-secondary-20 w-full p-4 space-y-3">
          <div>
            <h1 className="text-neutral-130 text-xl  tracking-[-0.2px] font-bold leading-6">
              {title}
            </h1>
            <p className="text-neutral-60 text-sm leading-5">{subtitle}</p>
          </div>
          <span className=" bg-success-20 p-[5px] rounded-sm text-surface-5 text-xs font-semibold leading-[14px] tracking-[-0.12px]">
            {tagline}
          </span>
        </div>

        {/* Accordion */}
       <div className="px-4">
          <article className="">
            <div
              className="flex gap-2 cursor-pointer items-center justify-start w-full"
              onClick={handleClick}
            >
              <h2 className="text-neutral-20 font-semibold leading-[20px] text-sm">
               This course will help you
              </h2>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <IoChevronDownSharp className="text-[20px] text-neutral-115" />
              </motion.div>
            </div>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.section
                  key="content"
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                  <ul className="list-disc pl-5 space-y-2 text-neutral-20 mb-2 text-sx leading-4">
                    {benefits?.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </motion.section>
              )}
            </AnimatePresence>
            <AnimatePresence initial={false}>
              {!isOpen && (
                <motion.section
                  key="content"
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                  <ul className=" relative list-disc pl-5 space-y-2 text-neutral-20 mb-2 text-sx leading-4 h-10 overflow-hidden">
                    {benefits?.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                    <motion.div
                      className="absolute top-0 right-0 left-0 bg-gradient-course-card-blur h-[46px] w-full "
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.8 }}
                      variants={blurVariants}
                    ></motion.div>
                  </ul>
                </motion.section>
              )}
            </AnimatePresence>
          </article>
        </div> 
        <div className="px-4  pt-2 space-y-5  z-100 mt-auto ">
          <div className="space-y-1">
            <p className="text-neutral-130 text-[17px] leading-5 font-bold tracking-[-0.18px]">
              ₹ {basePrice}
            </p>
            <p className="text-neutral-60 text-sx capitalize leading-[14px] tracking-[-0.12]">
             {accessType}
            </p>
          </div>

          <Button label="Enroll Now" variant="primary" classNames="w-full" onClick={()=>navigate(`/course-payment/${_id}`)} />
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
