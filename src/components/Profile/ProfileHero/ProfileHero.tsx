import { ICONS, IMAGES } from "../../../assets"
import Container from "../../Reusable/Container/Container";
import ReusableHeroSection from "../../Reusable/HeroSection/HeroSection"
import PortfolioCards from "./PortfolioCards";

const ProfileHero = () => {
     const heroDetails = [
    {
      value: "No cap, just smart, long-term plays",
      icon: ICONS.noCap,
    },
    {
      value: "Not built for everyone, built for you",
      icon: ICONS.verifired2,
    },
  ];

    const portfolio = [
    {
      icon: ICONS.email,
      title: "Wall Street Weekly",
      description: "Subscribe to our newsletter",
      price:"999",
      path: "/services/wall-street-weekly",
    },
    {
      icon: ICONS.whatsapp,
      title: "Boardroom Banter",
      description: "Join our WhatsApp group",
      price:"999",
      path: "/services/boardroom-banter",
    },
    {
      icon: ICONS.financialFashion,
      title: "Financial Fashion",
      price:"999",
      description: "Space for your Apparels",
      path: "/",
    },
    {
      icon: ICONS.brainGains,
      title: "Brain Gains",
      description: "Browse our courses",
      price:"999",
      path: "/",
    },
    
  ];

     const description = (
        <span className="flex items-center justify-center flex-wrap gap-2">
          Get your finances reviewed in 4 ways by 
          <span className="text-surface-85 font-bold"> Aman </span>
          <img src={ICONS.darkBlueTick} alt="verified" className="size-6 mt-1" />
          <span className="text-neutral-145 text-2xl font-medium ">{ "(SEBI-registered Advisor)"}</span>
        </span>
      );
  return (
    <div>
        <ReusableHeroSection
      headingLines={["Boardroom Banter"]}
      bgImage={IMAGES.portfolioBg}
      heroDetails={heroDetails}
      description={description}
      gradientBottom="bg-gradient-hero"
      
    />
   

   <Container>
     <div className="grid gap-6 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
  {portfolio.map((item, index) => (
    <PortfolioCards key={index} item={item} />
  ))}
</div>

   </Container>
        </div>
  )
}

export default ProfileHero