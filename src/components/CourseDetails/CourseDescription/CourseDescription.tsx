import type { TCourse } from "../../../types/course.types";
import Accordion from "../../Shared/Faq/Accordion";

const CourseDescription = ({ course }: { course: TCourse }) => {
  console.log(course);
  const courseCoverage = [
    {
      title: "Introduction to Stock Markets",
      description:
        "Covers IPOs, equities, indices, market capitalization, free float, corporate actions, company valuation basics, equity research fundamentals, and information asymmetry.",
    },
    {
      title: "Derivatives (F&O in Equities)",
      description:
        "Explains key derivative terminology, basics of futures and options pricing, and an introduction to common trading strategies in the F&O segment.",
    },
    {
      title: "Portfolio Management",
      description:
        "Includes portfolio-building approaches, strategy frameworks, risk assessment methods, volatility analysis, diversification, and construction of efficient portfolios.",
    },
    {
      title: "Commodities",
      description:
        "Introduces commodity market terminology, basic pricing calculations, fundamentals of futures trading, and how global supply-demand impacts prices.",
    },
    {
      title: "Currency Markets",
      description:
        "Covers central bank policy dynamics, currency contract pricing, exchange rate factors, and essential concepts for trading in forex markets.",
    },
    {
      title: "Fixed Income",
      description:
        "Explains the basics of the bond market, bond valuation, yields and yield curves, coupon structures, and how fixed-income instruments fit into a portfolio.",
    },
    {
      title: "Introduction to Technical Analysis & Backtesting",
      description:
        "Provides fundamentals of charting, patterns, indicators, and an introduction to backtesting trading strategies using historical price data.",
    },
  ];

  return (
    <div className=" py-10 font-Montserrat">
      <h5 className="text-primary-20 font-bold mb-2">Overview</h5>
      <p className="text-neutral-10">
        I’ve distilled my degrees, certifications, and years of hands-on
        experience into this Finance 101 Crash Course, built to help you truly
        understand the language of markets and connect the dots across sectors,
        instruments, and economies.
        <br />
        <br />
        While the core focus is on equities, the course also touches on other
        key segments of the capital markets to help you build a complete
        picture.
      </p>
      <h5 className="text-primary-20 font-bold mb-3 mt-10">Course Coverage:</h5>
      <Accordion accordingData={courseCoverage} />
    </div>
  );
};

export default CourseDescription;
