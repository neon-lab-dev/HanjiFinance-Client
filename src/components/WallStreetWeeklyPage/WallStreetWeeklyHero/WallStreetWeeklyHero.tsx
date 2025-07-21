import { ICONS, IMAGES } from "../../../assets";
import ReusableHeroSection from "../../Reusable/HeroSection/HeroSection";

const WallStreetWeeklyHero = () => {
  const heroDetails = [
    { value: "Markets", icon: ICONS.getAccess },
    { value: "Money", icon: ICONS.checkByTeam },
    { value: "Mindset", icon: ICONS.mindset },
    { value: "Every Sunday", icon: ICONS.calender },
    { value: "Free", icon: ICONS.free },
  ];

  return (
    <ReusableHeroSection
      headingLines={["@hanjifinance Weekly Newsletter"]}
      bgImage={IMAGES.wallStreetWeeklyHeroImg}
      heroDetails={heroDetails}
      description={
        <>No spam. No sasta gyaan. Just Headlines that really matter (with context)</>
      }
      buttonLabel="Subscribe now for Free !"
      gradientBottom="bg-gradient-hero"
    />
  );
};

export default WallStreetWeeklyHero;
