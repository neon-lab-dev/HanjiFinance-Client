import { IMAGES } from "../../../assets";
import Button from "../../Reusable/Button/Button";
import Container from "../../Reusable/Container/Container";
import SectionTitle from "../../Reusable/Heading/Heading";
import GoalCard from "./GoalCard";
import { goal } from "./GoalCard.dt";

const AboutUs = () => {
  return (
    <div>
      <img
        src={IMAGES.aboutUsBg}
        alt="About Us"
        className="w-full font-Montserrat"
      />
      <Container>
        <SectionTitle heading="Your Real Financial Wala Dost" />

        <div className="flex flex-col items-center pt-24 md:flex-row gap-10">
          {/* Left: Profile Section */}
          <div className="flex flex-col items-center text-center md:w-1/2">
            <img
              src="https://i.imgur.com/I9OAF1s.png"
              alt="Amandeep Singh Juneja"
              className="w-36 h-36 rounded-full border-[3px] border-pink-500 mb-4"
            />
            <div className="text-xl font-semibold">
              hanjifinance <span className="text-blue-500">✔</span>
            </div>
            <div className="mt-2">
              <p className="font-semibold">Amandeep Singh Juneja</p>
              <div className="text-sm text-gray-600 mt-1">
                <p>
                  100+ <span className="text-xs">Posts</span>
                </p>
                <p>
                  187K <span className="text-xs">Followers</span>
                </p>
                <p>
                  1 <span className="text-xs">Following</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right: Bio and Goals */}
          <div className="md:w-1/2">
            <div className="flex flex-col gap-6">
              <h3 className="text-xl font-medium leading-6 -tracking-[0.2px] mb-2">
                My Goal
              </h3>
              <div className="flex flex-col lg:flex-row ">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
                  {goal.map((goal, index) => (
                    <GoalCard key={index} icon={goal.icon} title={goal.title} />
                  ))}
                </div>
              </div>
            </div>

            <Button label="Book 1 on 1 Call with me" variant="primary" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutUs;
