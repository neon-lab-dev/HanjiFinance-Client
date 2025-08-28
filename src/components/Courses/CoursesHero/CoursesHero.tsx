import ReusableHeroSection from '../../Reusable/HeroSection/HeroSection';
import { ICONS, IMAGES } from '../../../assets';
import { scrollToSection } from '../../../utils/scrollToSection';

const CoursesHero = () => {
 const heroDetails = [
    {
      value: "Expert-Led Courses",
      icon: ICONS.getAccess,
    },
    {
      value: "Only for 200 Members",
      icon: ICONS.checkByTeam,
    },
    {
      value: "Best ROI = Rest On Instant",
      icon: ICONS.mindset,
    },
  ];

  const description = (
    <span className="flex items-center justify-center flex-wrap gap-2">
      Buy courses individually or as a premium bundle for the complete edge
      
    </span>
  );

  return (
    <ReusableHeroSection
      headingLines={["Master Finance.","Secure Your Future."]}
      bgImage={IMAGES.courseHeroBg}
      heroDetails={heroDetails}
      description={description}
      buttonLabel="Explore Courses"
      gradientBottom="bg-gradient-hero"
      onButtonClick={() => scrollToSection("join-waitlist")}
    />
  );
};

export default CoursesHero