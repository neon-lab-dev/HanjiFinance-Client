import SectionTitle from "../../Reusable/Heading/Heading";
import Container from "../../Reusable/Container/Container";
import Accordion from "./Accordion";
import { IMAGES } from "../../../assets";

const Faq = () => {
  return (
    <div className="bg-gradient-course pt-[60px] font-Montserrat">
      <Container>
        <SectionTitle heading="Your questions matter!" />
        <Accordion />
      </Container>
      <img src={IMAGES.coursesSectionBlur} alt="About Us" className="w-full" />
    </div>
  );
};

export default Faq;
