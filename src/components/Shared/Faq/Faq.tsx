import SectionTitle from "../../Reusable/Heading/Heading";
import Container from "../../Reusable/Container/Container";
import Accordion from "./Accordion";
import { motion, type Variants } from 'framer-motion';

const Faq = () => {
  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
  return (
    <div className="bg-gradient-course pt-[60px] font-Montserrat">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={titleVariants}>

        <SectionTitle heading="Your questions matter!" />
        </motion.div>
        <Accordion />
      </Container>
       <div className="bg-gradient-faq-blur h-[168px] w-full"></div>
    </div>
  );
};

export default Faq;
