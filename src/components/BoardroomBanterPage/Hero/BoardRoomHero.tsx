import { ICONS, IMAGES } from "../../../assets";
import { FaPhoneAlt, FaRegUser } from "react-icons/fa";
import Container from "../../Reusable/Container/Container";
import HeroHeading from "../../Reusable/HeroHeading/HeroHeading";
import ReusableHeroCards from "../../Reusable/ReusableHeroCards/ReusableHeroCards";
import Button from "../../Reusable/Button/Button";

const BoardroomHero = () => {
  const heroDetails = [
    {
      value: "Curated Conversations ",
      icon: <FaRegUser />, // Example icon for owner
    },
    {
      value: (
        <>
          <strong>₹ 500/month </strong> {"(Subscription)"}
        </>
      ),
      icon: <FaRegUser className="text-xl" />,
    },
    {
      value: "Only for 200 Members",
      icon: <FaPhoneAlt />, // Example icon for contact
    },
    {
      value: "Super Serious Cult",
      icon: <FaPhoneAlt />, // Example icon for contact
    },
  ];

  return (
    <div className="relative h-fit">
      <img
        src={IMAGES.boardroomHeroBgImg}
        alt="BoardroomHero-image"
        className="absolute top-0 left-0 w-full h-full object-cover -z-500"
      />
      {/* <img
        src={IMAGES.BoardroomHeroMobileBg}
        alt="BoardroomHero-image"
        className="absolute xl:hidden left-0 w-full h-fit object-fill -z-100"
      /> */}
      <div className="relative z-10 pt-[68px]">
        <Container>
          <HeroHeading lines={["Boardroom Banter"]} />
          <ReusableHeroCards details={heroDetails} bg="bg-surface-10" />
          <div className="mt-24 mb-28 flex flex-col gap-8 justify-center items-center">
            <p className="flex flex-row justify-center items-center text-[32px] tracking-[-0.6] font-medium text-neutral-30">
            A private finance circle by{" "}
            <span className="pl-3 pr-1 text-success-15 font-bold leading-9">
              {" "}
              Hanjifinance{" "}
            </span>{" "}
            <img
              src={ICONS.verified}
              alt="hanjiFinance"
              className="size-6 mt-2"
            />
          </p>
          <Button
            variant="primary"
            label="Book 1 on 1 call with me"
            classNames="w-full sm:w-fit px-8 py-4"
          />
          </div>
          
        </Container>
        <div className="bg-gradient-hero h-[100px] w-full"></div>
      </div>
    </div>
  );
};

export default BoardroomHero;
