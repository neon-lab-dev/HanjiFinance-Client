import { useNavigate } from "react-router-dom";
import { ICONS, IMAGES } from "../../../assets";
import ConfirmationModal from "../../ConfirmationModal/ConfirmationModal";
import Container from "../../Reusable/Container/Container";
import ReusableHeroSection from "../../Reusable/HeroSection/HeroSection";
import OnBoardingForm from "./OnBoardingForm";
import PortfolioCards from "./PortfolioCards";
import { useState } from "react";

const PortfolioHero = () => {
  const navigate = useNavigate();
  const [onBoardingStatus, setOnBoardingStatus] = useState<boolean>(false);
  const [onSuccessful, setOnSuccessful] = useState<boolean>(false);
  const [onFormOpen, setOnFormOpen] = useState<boolean>(false);
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
  const handleSubmit = () => {
    setOnFormOpen(false);
    setOnSuccessful(true);
  };
  const portfolio = [
    {
      icon: ICONS.message,
      title: "Quick Discussion",
      description:
        "Get the basic advice or your portfolio reviewed over a 30-min 1 on 1 call",
      price: "₹999",
      path: "/services/chat-and-chill",
      buttonLabel: "Learn More",
      onClick: () => navigate("/services/chat-and-chill"),
    },
    {
      icon: ICONS.financialCheakup,
      title: "⁠Financial Checkup 1",
      description:
        "Get in depth review of finances and creating a financial plan to achieve your long term goals.",
      price: "₹1,999",
      path: "/",
      buttonLabel: "Get My Portfolio Reviewed",
    },
    {
      icon: ICONS.financialCheakup,
      title: "⁠Financial Checkup 2",
      description:
        "Full access on financial checkup 1, plus 2 expert calls for next 2 months to review the asset allocations and how sustainable it is",
      price: "₹9,999",
      path: "/",
      buttonLabel: "Get My Portfolio Reviewed",
    },
    {
      icon: ICONS.portfolioManagement,
      title: "Portfolio Management Services",
      description: "Get your complete portfolio managed by exclusively by Aman",
      price: "₹1,999",
      path: "/",
      buttonLabel: "Learn More",
      onClick: () => setOnBoardingStatus(true),
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
    <div className="relative font-Montserrat ">
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

      <ConfirmationModal
        isConfirmationModalOpen={onSuccessful}
        setIsConfirmationModalOpen={setOnSuccessful}
        isCrossVisible={true}
      >
        <div className="flex flex-col items-center pb-12">
          <div className="size-14 rounded-full bg-[#16A34A] flex items-center justify-center p-4">
            <img src={ICONS.tickMark} alt="" className="size-11" />
          </div>
          <h1 className="text-neutral-10 text-[28px] font-medium leading-8 mt-4 text-center">
            Form Filled Successfully!
          </h1>
          <p className="text-neutral-20 text-sm font-medium leading-[18px] mt-4 max-w-[550px] mx-auto text-center">
            Stay tuned in your inbox, our team will get back with the new
            onboarding as soon as available!
          </p>
          <p className="text-neutral-10 text-sm font-normal leading-[18px] mt-4 max-w-[550px] mx-auto text-center">
            You will be redirected to the home page now....
          </p>
        </div>
      </ConfirmationModal>
      <ConfirmationModal
        isConfirmationModalOpen={onBoardingStatus}
        setIsConfirmationModalOpen={setOnBoardingStatus}
        isCrossVisible={true}
      >
        <div className="flex flex-col items-center pb-12">
          <div className="size-14 rounded-full bg-primary-15 flex items-center justify-center p-4">
            <p className="text-white text-[32px] leading-9 font-medium">!</p>
          </div>
          <h1 className="text-neutral-10 text-[28px] font-medium leading-8 mt-4 text-center">
            Onboarding Full!
          </h1>
          <p className="text-neutral-20 text-sm font-medium leading-[18px] mt-4 max-w-[550px] mx-auto text-center">
            New spots are full for now. We’re working to reopen onboarding soon,
            stay close, you won’t want to miss it.
          </p>
          <p className="text-neutral-20 text-sm font-medium leading-[18px] mt-4 max-w-[550px] mx-auto text-center">
            Want first access, when it re-opens?{" "}
            <span
              onClick={() => {
                setOnFormOpen(true);
                setOnBoardingStatus(false);
              }}
              className="font-bold text-primary-20 cursor-pointer"
            >
              Join the waitlist
            </span>
          </p>
        </div>
      </ConfirmationModal>
      <ConfirmationModal
        isConfirmationModalOpen={onFormOpen}
        setIsConfirmationModalOpen={setOnFormOpen}
        isCrossVisible={true}
      >
        <div className="flex flex-col items-center pb-6">
          <h1 className="text-neutral-20 text-[28px] font-medium leading-8 mt-4 mb-6 text-center tracking-[-0.56px]">
            Join the waitlist
          </h1>
          <div className="w-full px-6">
            <OnBoardingForm onSubmitSuccess={handleSubmit} />
          </div>
        </div>
      </ConfirmationModal>
    </div>
  );
};

export default PortfolioHero;
