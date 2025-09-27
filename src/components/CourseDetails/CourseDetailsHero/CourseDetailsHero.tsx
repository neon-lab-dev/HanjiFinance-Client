import Container from "../../Reusable/Container/Container";
import { ICONS } from "../../../assets";
import Button from "../../Reusable/Button/Button";
import { useNavigate } from "react-router-dom";

const CourseDetailsHero = ({ course }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-b form-[#ffffff] to-primary-30 font-Montserrat py-10">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          <div className="md:w-[65%] space-y-4">
            <h2 className="text-neutral-15 text-4xl font-bold">
              {course?.title}
            </h2>
            <p className="text-neutral-85">{course?.subtitle}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-[70%]">
              {course?.benefits?.map((text, index) => (
                <div
                  key={index}
                  className="flex gap-2 items-start justify-start"
                >
                  <div className="bg-success-20/80 rounded-full size-5 flex items-center justify-center">
                    <img src={ICONS.tickMark} alt="tick" className="size-3" />
                  </div>
                  <h4 className="text-accent-10">{text}</h4>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-start gap-4">
              <Button
                label="Enroll Now"
                variant="primary"
                onClick={() => {
                  navigate(`/course-payment/${course?._id}`);
                }}
              />
              <Button label="View Details" variant="secondary" />
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
