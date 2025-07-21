import Container from "../../Reusable/Container/Container";
import SectionTitle from "../../Reusable/Heading/Heading";
import JoinWaitlistForm from "./JoinWaitlistForm";

const JoinWaitlist = () => {
  return (
    <div className="bg-gradient-newsletter pt-[60px]">
      <Container>
        <SectionTitle heading="Exclusive space. Practical. 100% financial clarity." subHeading="This isn’t a group you just join. It’s a circle you apply for. We review every application to maintain the quality of this space." />
        <JoinWaitlistForm/>
      </Container>
      <div className={`bg-gradient-weekly-form-blur h-[168px] w-full`}></div>
    </div>
  );
};

export default JoinWaitlist;
