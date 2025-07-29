import { ICONS, IMAGES } from "../../../assets";
import Container from "../../Reusable/Container/Container";
import ReusableHeroSection from "../../Reusable/HeroSection/HeroSection";
import PortfolioCards from "./PortfolioCards";

const PortfolioHero = () => {
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
      icon: ICONS.message,
      title: "Quick Discussion",
      description: "Get the basic advice or your portfolio reviewed over a 30-min 1 on 1 call",
      price: "₹999",
      path: "/",
    },
    {
      icon: ICONS.financialCheakup,
      title: "⁠Financial Checkup 1",
      description: "Get in depth review of finances and creating a financial plan to achieve your long term goals.",
      price: "₹1,999",
      path: "/",
    },
    {
      icon: ICONS.financialCheakup,
      title: "⁠Financial Checkup 2",
      description: "Full access on financial checkup 1, plus 2 expert calls for next 2 months to review the asset allocations and how sustainable it is",
      price: "₹9,999",
      path: "/",
    },
    {
      icon: ICONS.portfolioManagement,
      title: "Portfolio Management Services",
      description: "Get your complete portfolio managed by exclusively by Aman",
      price: "₹1,999",
      path: "/",
    },
  ];

  const description = (
    <span className="flex items-center justify-center flex-wrap gap-2">
      Get your finances reviewed in 4 ways by
      <span className="text-surface-85 font-bold"> Aman </span>
      <img src={ICONS.darkBlueTick} alt="verified" className="size-6 mt-1" />
      <span className="text-neutral-145 text-2xl font-medium ">
        {"(SEBI-registered Advisor)"}
      </span>
    </span>
  );
  return (
    <div className="relative ">
      <ReusableHeroSection
        headingLines={["Your Portfolio, Our Perspective."]}
        bgImage={IMAGES.portfolioBg}
        heroDetails={heroDetails}
        description={description}
        gradientBottom="bg-gradient-hero"
      />

      <div className="absolute -bottom-60 left-0 right-0 z-10">
        <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolio.map((item, index) => (
            <PortfolioCards key={index} item={item} />
          ))}
        </div>
      </Container>
      </div>
    </div>
  );
};

export default PortfolioHero;
