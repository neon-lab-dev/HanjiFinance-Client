import Container from "../../Reusable/Container/Container";
import SectionTitle from "../../Reusable/Heading/Heading";
import SubscribeNewsletterForm from "./SubscribeNewsletterForm";

const SubscribeNewsletter = () => {
  return (
    <div id="subscribe-newsletter" className="bg-gradient-newsletter pt-[60px]">
      <Container>
        <SectionTitle
          heading="Get the Next Issue"
          subHeading="Crush confusion, spark clarity, let’s get financially fluent, one newsletter at a time!"
        />
        <SubscribeNewsletterForm />
      </Container>
      <div className={`bg-gradient-weekly-form-blur h-[168px] w-full`}></div>
    </div>
  );
};

export default SubscribeNewsletter;
