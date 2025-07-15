import { ICONS, IMAGES } from "../../../assets";
import Button from "../../Reusable/Button/Button";
import Container from "../../Reusable/Container/Container";
import SectionTitle from "../../Reusable/Heading/Heading";
import GoalCard from "./GoalCard";

const AboutUs = () => {
  const profileStats = [
    {
      value: "100+",
      title: "Posts",
    },
    {
      value: "187K",
      title: "Followers",
    },
    {
      value: "1",
      title: "Following",
    },
  ];
  return (
    <div className="font-Montserrat mt-[116px] lg:mt-[150px]">
      <img src={IMAGES.aboutUsBg} alt="About Us" className="w-full" />
      <div className="pb-[70px] pt-[70px] lg:pt-0 lg:pb-[144px]">
        <Container>
          <SectionTitle heading="Your Real Financial Wala Dost" />

          <div className="flex flex-col items-center lg:flex-row gap-12 lg:gap-0 mt-10 lg:mt-[120px]">
            {/* Left side */}
            <div className="flex flex-col lg:sticky lg:top-[120px] self-start xl:flex-row gap-12 items-center w-full lg:w-[50%]">
              {/* Profile name and picture */}
              <div className="flex flex-col gap-6 items-center">
                <div className="flex items-center gap-2">
                  <h1 className="text-neutral-5 font-bold text-[26px] leading-[30px]">
                    hanjifinance
                  </h1>
                  <img src={ICONS.blueTick} alt="" className="size-6" />
                </div>
                <div className="bg-gradient-profile-picture size-[262px] rounded-full p-1">
                  <div className="bg-white rounded-full p-4">
                    <img
                      src={IMAGES.dummyAvatar}
                      alt=""
                      className="rounded-full"
                    />
                  </div>
                </div>
              </div>
              {/* Profile stats */}
              <div className="flex flex-col gap-6 items-center">
                <h1 className="text-neutral-5 font-bold text-lg leading-5">
                  Amandeep Singh Juneja
                </h1>
                <div className="flex gap-6">
                  {profileStats?.map((item) => (
                    <div
                      key={item?.title}
                      className="flex flex-col items-center gap-2"
                    >
                      <h1 className="text-neutral-5 font-semibold text-lg leading-5">
                        {item?.value}
                      </h1>
                      <p className="text-neutral-5 text-sm leading-4">
                        {item?.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side */}
            <div className="flex flex-col gap-12 w-full lg:w-[50%] ">
              <div className="text-neutral-5 leading-5">
                <p>
                  Hi, I’m <strong>Amandeep Singh Juneja</strong>, the person
                  behind @hanjifinance.
                </p>
                <p className="mt-[17px]">
                  I’m a trader, entrepreneur, and someone deeply passionate
                  about helping people make sense of money. Over the years, I’ve
                  built businesses, managed a proprietary trading desk, and
                  studied the wealth game inside out both academically and
                  practically.
                </p>
                <p className="mt-5">
                  I hold a Master’s in Wealth Management from Queen Mary
                  University of London, and I’ve lived and worked across London,
                  Dubai, and India.
                </p>
                <p className="mt-5">
                  What started as a simple experiment, posting finance videos on
                  Instagram, turned into Hanjifinance, one of the
                  fastest-growing finance communities in India. Today, this is
                  more than just content. It’s a movement towards financial
                  clarity.
                </p>
              </div>

              {/* My goal */}
              <div>
                <h1 className="text-neutral-5 text-xl font-medium leading-6">
                  My Goal
                </h1>
                <div className="flex flex-col gap-5 mt-[25px]">
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 ">
                    <GoalCard icon={ICONS.volumeCross} title="Cut the noise" />
                    <GoalCard icon={ICONS.money} title="Simplify money" />
                    <div className="hidden lg:block">
                      {" "}
                      <GoalCard
                        icon={ICONS.peopleNearby}
                        title="Help people think smarter about wealth"
                      />
                    </div>
                  </div>
                  <div className="block lg:hidden">
                    <GoalCard
                      icon={ICONS.peopleNearby}
                      title="Help people think smarter about wealth"
                    />
                  </div>
                </div>
              </div>

              <p className="text-neutral-5 leading-5">
                This website is an extension of that mission — a hub for
                everything I’m building: newsletters, private groups, courses,
                services, and more.
                <br />
                <br />
                If you landed here from a reel, a story, or just stumbled across
                it — welcome. You’re in the right place.
              </p>
              <Button
                variant="primary"
                label="Book 1 on 1 call with me"
                className="w-full md:w-fit"
              />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AboutUs;
