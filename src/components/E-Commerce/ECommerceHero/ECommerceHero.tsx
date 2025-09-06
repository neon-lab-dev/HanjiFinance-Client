import ReusableHeroSection from '../../Reusable/HeroSection/HeroSection';
import { ICONS, IMAGES } from '../../../assets';
import { scrollToSection } from '../../../utils/scrollToSection';

const ECommerceHero = () => {
  const heroDetails = [
    {
      value: "Trendy Outfit",
      icon: ICONS.getAccess,
    },
    {
      value: "Attract Vibe",
      icon: ICONS.checkByTeam,
    },
    {
      value: "Best ROI = Rest On Instant",
      icon: ICONS.mindset,
    },
  ];

  const description = (
    <span className="flex items-center justify-center flex-wrap gap-2">
Equity volatile hai, but iss fabric ka comfort stable hai.    </span>
  );

  return (
    <ReusableHeroSection
      headingLines={["@hanjifinance Official"," Merchandise Store"]}
      bgImage={IMAGES.ecommerceHero}
      heroDetails={heroDetails}
      description={description}
      buttonLabel="Explore Products"
      gradientBottom="bg-gradient-hero"
      onButtonClick={() => scrollToSection("products")}
    />
  );
};

export default ECommerceHero