import Container from "../../Reusable/Container/Container";
import { ICONS } from "../../../assets";
import Button from "../../Reusable/Button/Button";
import { useNavigate } from "react-router-dom";
import type { TCourse } from "../../../types/course.types";

const CourseDetailsHero = ({ course }: { course: TCourse }) => {
  const navigate = useNavigate();
  const detsils = [
    "Grasp the meaning and context behind financial terms and events.",
    "Decode what any news update might imply for a company’s fundamentals.",
    "See how different segments: equity, commodities, currency, etc move together and influence one another.",
  ];
  return (
    <div className="bg-linear-to-b form-[#ffffff] to-primary-30 font-Montserrat py-10 2xl:py-16">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          <div className="md:w-[65%] space-y-4">
            <h2 className="text-neutral-15 text-4xl font-bold">
              Finance - Crash Course
            </h2>
            <div>
              <p className="text-neutral-85">
                New to the markets and lost in the jargon? This course is
                designed to fix exactly that.
              </p>
              <p className="text-neutral-40 mt-8 font-semibold">
                By the end of this course, you’ll be able to:
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 w-[70%]">
              {detsils?.map((text, index) => (
                <div
                  key={index}
                  className="flex gap-2 items-start justify-start w-full"
                >
                  <div className="bg-success-20/80 rounded-full size-5 flex items-center justify-center shrink-0">
                    <img
                      src={ICONS.tickMark}
                      alt="tick"
                      className="size-3 object-contain block"
                    />
                  </div>

                  <h4 className="text-accent-10">{text}</h4>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-start gap-4 mt-8">
              <Button
                label="Enroll Now"
                variant="primary"
                onClick={() => {
                  navigate(`/course-payment/${course?._id}`);
                }}
              />
              <div className="flex items-center gap-2">
                <p className="text-neutral-5">Have any queries?</p>
                <a
                  href="tel:+91 98765 00000"
                  className="text-primary-10 font-bold  hover:underline"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>
          <div className="md:w-[35%]">
            <img
              src={course?.imageUrl}
              alt={"course detail"}
              className="w-full h-full rounded-xl"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CourseDetailsHero;
