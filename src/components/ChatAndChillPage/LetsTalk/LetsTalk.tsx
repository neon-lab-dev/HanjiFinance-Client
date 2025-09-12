import { useLocation } from "react-router-dom";
import Container from "../../Reusable/Container/Container";
import SectionTitle from "../../Reusable/Heading/Heading";
import LetsTalkForm from "./LetsTalkForm";
import { useEffect } from "react";

const LetsTalk = () => {
    const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  return (
    <div id="chat-chill-booking" className="bg-gradient-newsletter pt-[60px]">
      <Container>
        <SectionTitle heading="Exclusive space. Practical. 100% financial clarity." subHeading="This isn’t a group you just join. It’s a circle you apply for. We review every application to maintain the quality of this space." />
        <LetsTalkForm/>
      </Container>
      <div className={`bg-gradient-weekly-form-blur h-[168px] w-full`}></div>
    </div>
  );
};

export default LetsTalk;
