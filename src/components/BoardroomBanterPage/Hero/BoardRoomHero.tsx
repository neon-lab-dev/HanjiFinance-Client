import { Link } from "react-router-dom";
import { ICONS, IMAGES } from "../../../assets";
import { FaAngleRight } from "react-icons/fa";
import Container from "../../Reusable/Container/Container";

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
      {/* <img
        src={IMAGES.BoardroomHeroBgImg}
        alt="BoardroomHero-image"
        className="hidden xl:block absolute -top-30 lg:-top-20 xl:-top-15 left-0 w-full h-full object-fit z-0"
      />
      <img
        src={IMAGES.BoardroomHeroMobileBg}
        alt="BoardroomHero-image"
        className="absolute xl:hidden left-0 w-full h-fit object-fill -z-100"
      /> */}
      <div className="relative z-10 py-[68px]">
        <Container>
          <img
            src={ICONS.logo}
            alt="Hanjifinance"
            className="size-full xl:w-[550px] xl:h-[236px] mx-auto"
          />
          <h1 className="text-[32px] lg:text-[64px] font-bold leading-9 lg:leading-[70px] text-neutral-10 text-center max-w-[600px] mx-auto mt-9">
            Build Wealth, <br /> One Click at a Time
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[21px] mt-11 lg:mt-[101px]">
            {services?.map((service) => (
              <div
                key={service?.title}
                className="bg-white border border-neutral-98 rounded-lg flex justify-between"
              >
                <div className="flex flex-col gap-6 p-6">
                  <div className="bg-neutral-100 p-3 rounded-lg flex items-center justify-center w-fit">
                    <img src={service?.icon} alt="" className="size-9" />
                  </div>
                  <div>
                    <h1 className="text-neutral-10 text-[17px] font-semibold leading-5">
                      {service?.title}
                    </h1>
                    <p className="text-neutral-50 text-sm leading-5 mt-3">
                      {service?.description}
                    </p>
                  </div>

                  <Link
                    to={service?.path}
                    className="text-primary-20 flex items-center gap-2 text-[17px] font-semibold leading-5 transition-all duration-300 delay-100 transform hover:-translate-y-1"
                  >
                    Learn More <FaAngleRight />
                  </Link>
                </div>

                <div className="bg-neutral-99 px-[7px] flex items-center justify-center rounded-r-lg h-full">
                  <img
                    src={ICONS.logo}
                    alt="Hanjifinance"
                    className="w-[64px] h-[30px] mx-auto opacity-35"
                  />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default BoardroomHero;
