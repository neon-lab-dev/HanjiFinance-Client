import { Link } from "react-router-dom";
import { ICONS, IMAGES } from "../../../assets";
import { FaAngleRight } from "react-icons/fa";
import Container from "../../Reusable/Container/Container";
import HeroHeading from "../../Reusable/HeroHeading/HeroHeading";

const BoardroomHero = () => {
  const services = [
    {
      icon: ICONS.email,
      title: "Wall Street Weekly",
      description: "Subscribe to our newsletter",
      path: "/newsletter-subscription",
    },
    {
      icon: ICONS.whatsapp,
      title: "Boardroom Banter",
      description: "Join our WhatsApp group",
      path: "/boardroom-banter",
    },
    {
      icon: ICONS.financialFashion,
      title: "Financial Fashion",
      description: "Space for your Apparels",
      path: "/financial-fashion",
    },
    {
      icon: ICONS.brainGains,
      title: "Brain Gains",
      description: "Browse our courses",
      path: "/courses",
    },
    {
      icon: ICONS.fundManagement,
      title: "Fund Management",
      description: "View our Advisor services",
      path: "/fund-management",
    },
    {
      icon: ICONS.chatChill,
      title: "Chat & Chill",
      description: "Book a 1 on 1 call with Aman",
      path: "/book-call",
    },
  ];

  return (
    <div className="relative">
      <img
        src={IMAGES.boardroomHeroBgImg}
        alt="BoardroomHero-image"
        className="absolute -top-30 lg:-top-20 xl:-top-15 left-0 w-full h-full object-fit z-0"
      />
      {/* <img
        src={IMAGES.BoardroomHeroMobileBg}
        alt="BoardroomHero-image"
        className="absolute xl:hidden left-0 w-full h-fit object-fill -z-100"
      /> */}
      <div className="relative z-10 py-[68px]">
        <Container>
          <HeroHeading lines={["Boardroom Banter"]} />

         
        </Container>
      </div>
    </div>
  );
};

export default BoardroomHero;
