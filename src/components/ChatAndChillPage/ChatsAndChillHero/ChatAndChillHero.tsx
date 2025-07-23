import { ICONS, IMAGES } from "../../../assets";
import ReusableHeroSection from "../../Reusable/HeroSection/HeroSection";

const ChatAndChillHero = () => {
  const heroDetails = [
    {
      value: "Some questions are too personal for reels",
      icon: ICONS.curatedConversations,
    },
    {
      value: (
        <>
          <strong>₹ 999/session </strong>
        </>
      ),
      icon: ICONS.gMeet,
    },
    { value: "1 to 1 exclusive Google meet", icon: ICONS.mindset },
  ];
  const description = (
    <span className="flex items-center justify-center flex-wrap gap-2">
      Book a 1-on-1 with
      <span className="text-surface-80 font-bold"> Aman </span>
      <img src={ICONS.blueTick} alt="verified" className="size-6 mt-1" />
    </span>
  );

  return (
    <ReusableHeroSection
      headingLines={["Chat & Chill"]}
      bgImage={IMAGES.ChatAndChillHeroImg}
      heroDetails={heroDetails}
      description={description}
      buttonLabel="Book Now"
      gradientBottom="bg-gradient-hero"
    />
  );
};

export default ChatAndChillHero;
