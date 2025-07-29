import Container from "../../Reusable/Container/Container";
import { motion, type Variants } from "framer-motion";
import SectionTitle from "../../Reusable/Heading/Heading";
import FinancialCheakupForm from "./FinancialCheakupForm";

const FinancialCheckup1 = () => {
  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const blurVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1, ease: "easeOut", delay: 0.5 },
    },
  };
  return (
    <div className="bg-gradient-course pt-[60px] overflow-hidden">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={titleVariants}
        >
          <SectionTitle
            heading="Not Sure, Where To Start From?"
            subHeading="Let’s Start With A Financial Checkup 1"
          />
        </motion.div>

        <FinancialCheakupForm/>
      </Container>
      <motion.div
        className="bg-gradient-course-blur h-[113px] w-full mt-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.8 }}
        variants={blurVariants}
      ></motion.div>
    </div>
  );
};

export default FinancialCheckup1;
