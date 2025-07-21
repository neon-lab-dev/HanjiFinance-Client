import Container from "../../Reusable/Container/Container";
import SectionTitle from "../../Reusable/Heading/Heading";
import SubscribeNewsletterForm from "./SubscribeNewsletterForm";

const SubscribeNewsletter = () => {
  return (
    <div className="bg-gradient-newsletter py-[60px]">
      <Container>
        <SectionTitle
          heading="Get the Next Issue"
          subHeading="Crush confusion, spark clarity, let’s get financially fluent, one newsletter at a time!"
        />
        <SubscribeNewsletterForm />
      </Container>
    </div>
  );
};

export default SubscribeNewsletter;
