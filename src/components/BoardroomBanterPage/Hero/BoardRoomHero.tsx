import { IMAGES } from "../../../assets";
import { FaPhoneAlt, FaRegUser } from "react-icons/fa";
import Container from "../../Reusable/Container/Container";
import HeroHeading from "../../Reusable/HeroHeading/HeroHeading";
import ReusableHeroCards from "../../Reusable/ReusableHeroCards/ReusableHeroCards";

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
    <div className="relative">
      <img
        src={IMAGES.boardroomHeroBgImg}
        alt="BoardroomHero-image"
        className="absolute -top-30 lg:-top-20 xl:-top-15 left-0 w-full h-full object-cover z-0"
      />
      {/* <img
        src={IMAGES.BoardroomHeroMobileBg}
        alt="BoardroomHero-image"
        className="absolute xl:hidden left-0 w-full h-fit object-fill -z-100"
      /> */}
      <div className="relative z-10 py-[68px]">
        <Container>
          <HeroHeading lines={["Boardroom Banter"]} />
          <ReusableHeroCards details={heroDetails} bg="bg-surface-10" />
          <p className="flex flex-row justify-center items-center text-[32px] mt-24">A private finance circle by <span> Hanjifinance </span> <FaRegUser/></p>
        </Container>
      </div>
    </div>
  );
};

export default BoardroomHero;
