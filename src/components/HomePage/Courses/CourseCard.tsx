import { useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../Reusable/Button/Button";

type TAccordionItem = {
  title: string;
  description: string[];
};

type TCourseCard = {
  title: string;
  subTitle: string;
  tag: string;
  description: string;
  image: string;
  accordion: TAccordionItem;
  price: string;
};

const CourseCard: React.FC<TCourseCard> = ({
  title,
  subTitle,
  tag,
  image,
  accordion,
  price,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen((prev) => !prev);

  return (
    <div className="bg-white rounded-xl shadow-lg font-Montserrat">
      {/* Course Image */}
      <img src={image} alt={title} className="rounded-t-xl w-full" />

      <div className="flex flex-col gap-4 pb-4">
        {/* Course Details */}
        <div className="bg-secondary-20 w-full p-4 space-y-3">
          <div>
            <h1 className="text-neutral-130 text-xl  tracking-[-0.2px] font-bold leading-6">
              {title}
            </h1>
            <p className="text-neutral-60 text-sm leading-5">{subTitle}</p>
          </div>
          <span className=" bg-success-20 p-[5px] rounded-sm text-surface-5 text-xs font-semibold leading-[14px] tracking-[-0.12px]">{tag}</span>
        </div>

        {/* Accordion */}
        <div className="px-4">
          <article className="">
            <div
              className="flex gap-2 cursor-pointer items-center justify-start w-full"
              onClick={handleClick}
            >
              <h2 className="text-neutral-20 font-semibold leading-[20px] text-sm">
                {accordion.title}
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
                    {accordion.description.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </motion.section>
              )}
            </AnimatePresence>
          </article>
        </div>

        <div className="px-4 space-y-5">
          <div className="space-y-1">
            <p className="text-neutral-130 text-[17px] leading-5 font-bold tracking-[-0.18px]">₹ {price}</p>
            <p className="text-neutral-60 text-sx leading-[14px] tracking-[-0.12]">Lifetime Access</p>
          </div>

          <Button label="Enroll Now" variant="primary" classNames="w-full" />
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
