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
  return (
    <div className="bg-gradient-course py-[60px] mb-52">
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
    </div>
  );
};

export default FinancialCheckup1;
