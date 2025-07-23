import { ICONS, IMAGES } from "../../../assets";
import { scrollToSection } from "../../../utils/scrollToSection";
import ReusableHeroSection from "../../Reusable/HeroSection/HeroSection";

const BoardRoomHero = () => {
  const heroDetails = [
    {
      value: "Curated Conversations ",
      icon: ICONS.curatedConversations,
    },
    {
      value: (
        <>
          <strong>₹500/month </strong> {"(Subscription)"}
        </>
      ),
      icon: ICONS.subscriptionFee,
    },
    {
      value: "Only for 200 Members",
      icon: ICONS.members,
    },
    {
      value: "Super Serious Cult",
      icon: ICONS.seriousCult,
    },
  ];

  const description = (
    <span className="flex items-center justify-center flex-wrap gap-2">
      A private finance circle by
      <span className="text-success-15 font-bold"> Hanjifinance </span>
      <img src={ICONS.verified} alt="verified" className="size-6 mt-1" />
    </span>
  );

  return (
    <ReusableHeroSection
      headingLines={["Boardroom Banter"]}
      bgImage={IMAGES.boardroomHeroBgImg}
      heroDetails={heroDetails}
      description={description}
      buttonLabel="Join the Waitlist"
      gradientBottom="bg-gradient-hero"
      onButtonClick={() => scrollToSection("join-waitlist")}
    />
  );
};

export default BoardRoomHero;
