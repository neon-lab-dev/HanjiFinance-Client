import SectionTitle from "../../Reusable/Heading/Heading";
import Container from "../../Reusable/Container/Container";
import Accordion from "./Accordion";

const Faq = () => {
  return (
    <div className="bg-gradient-course pt-[60px] font-Montserrat">
      <Container>
        <SectionTitle heading="Your questions matter!" />
        <Accordion />
      </Container>
       <div className="bg-gradient-faq-blur h-[168px] w-full"></div>
    </div>
  );
};

export default Faq;
