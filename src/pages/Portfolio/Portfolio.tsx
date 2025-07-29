import PortfolioHero from "../../components/Portfolio/PortfolioHero/PortfolioHero";
import WhatYouGet from "../../components/Portfolio/WhatYouGet/WhatYouGet";
import Faq from "../../components/Shared/Faq/Faq";
import FinancialCheckup1 from './../../components/Portfolio/FinancialCheckup1/FinancialCheckup1';

const Portfolio = () => {
  return (
    <div>
      <PortfolioHero />
      <WhatYouGet/>
      <FinancialCheckup1/>
      <Faq />
    </div>
  );
};

export default Portfolio;
