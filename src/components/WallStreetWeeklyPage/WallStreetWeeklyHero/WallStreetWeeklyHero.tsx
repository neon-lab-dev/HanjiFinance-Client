import { ICONS, IMAGES } from "../../../assets";
import Container from "../../Reusable/Container/Container";
import HeroHeading from "../../Reusable/HeroHeading/HeroHeading";
import ReusableHeroCards from "../../Reusable/ReusableHeroCards/ReusableHeroCards";
import Button from "../../Reusable/Button/Button";

const WallStreetWeeklyHero = () => {
  const heroDetails = [
    {
      value: "Markets",
      icon: ICONS.getAccess,
    },
    {
      value: "Money",
      icon: ICONS.checkByTeam,
    },
    {
      value: "Mindset",
      icon: ICONS.mindset,
    },
    {
      value: "Every Sunday",
      icon: ICONS.calender,
    },
    {
      value: "Free",
      icon: ICONS.free,
    },
  ];

  return (
    <div className="relative h-fit">
      <img
        src={IMAGES.wallStreetWeeklyHeroImg}
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
          <HeroHeading lines={["@hanjifinance Weekly Newsletter"]} />
          <ReusableHeroCards details={heroDetails} bg="bg-surface-10" />
          <div className="mt-24 mb-28 flex flex-col gap-8 justify-center items-center">
            <p className="flex flex-row justify-center items-center text-[32px] tracking-[-0.6] font-medium text-neutral-30">
              No spam. No sasta gyaan. Just Headlines that really matter (with
              context)
            </p>
            <Button
              variant="primary"
              label="Subscribe now for Free !"
              classNames="w-full sm:w-fit px-8 py-4"
            />
          </div>
        </Container>
        <div className="bg-gradient-hero h-[100px] w-full"></div>
      </div>
    </div>
  );
};

export default WallStreetWeeklyHero;
