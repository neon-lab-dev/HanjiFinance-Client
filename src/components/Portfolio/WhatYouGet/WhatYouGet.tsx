import { ICONS } from "../../../assets";
import Container from "../../Reusable/Container/Container";
import SectionTitle from "../../Reusable/Heading/Heading";
import WhatYouGetCard from "./WhatYouGetCard";

const WhatYouGet = () => {
  const whatYouGetData = [
    {
      icon: ICONS.assetBreakdown,
      title: "Asset Breakdown",
      description:
        "With detailed look into your portfolio composition, Identify red flags in your current investments.",
    },
    {
      icon: ICONS.riskMapping,
      title: "Risk & Return Mapping",
      description:
        "Get an actionable plan, built around you, where we decode volatility, correlation, sector blases",
    },
    {
      icon: ICONS.portfolioManagement,
      title: "Goal Based Investments",
      description:
        "Realign your risk to reward intent and  align your money with your goals",
    },
  ];
  return (
    <div
      id="subscribe-newsletter"
      className="bg-gradient-newsletter pt-[60px] mt-[420px]"
    >
      <Container>
        <SectionTitle
          heading="What You Get?"
          subHeading="Turn chaos into clarity with SEBI-compliant portfolio advice tailored to you"
        />
        <div className="grid gap-6 grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {whatYouGetData.map((item, index) => (
            <WhatYouGetCard key={index} item={item} />
          ))}
        </div>
      </Container>
      <div className={`bg-gradient-weekly-form-blur h-[168px] w-full`}></div>
    </div>
  );
};

export default WhatYouGet;
