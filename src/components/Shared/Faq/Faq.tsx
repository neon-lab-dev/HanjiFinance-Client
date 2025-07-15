import SectionTitle from "../../Reusable/Heading/Heading";
import Container from "../../Reusable/Container/Container";
import Accordion from "./Accordion";

const Faq = () => {
  return (
    <div className="bg-gradient-course py-[60px] font-Montserrat">
      <Container>
        <SectionTitle heading="Your questions matter!" />
        <Accordion />
      </Container>
    </div>
  );
};

export default Faq;
