import { useNavigate } from "react-router-dom";
import Button from "../../Reusable/Button/Button";
import type { TCourse } from "../../../types/course.types";

const CourseActionCard = ({ course }: { course: TCourse }) => {
  const navigate = useNavigate();
  return (
    <div className="border border-primary-20 bg-linear-to-b form-[#ffffff] to-primary-30 rounded-lg p-4 mt-10 font-Montserrat">
      <div className="flex flex-row items-center justify-between gap-2">
        <h3 className="text-2xl text-neutral-20 font-bold">
          Rs. {course?.discountedPrice}{" "}
          <span className="text-xs  text-primary-20 line-through">
            Rs.{course?.basePrice}
          </span>
        </h3>
        <div className="bg-primary-15/10 border rounded-lg border-primary-15 px-3 py-1">
          {course?.accessType}
        </div>
      </div>
      <div className="w-full my-3 space-y-3">
        <span className=" bg-success-20 p-[5px] rounded-sm text-surface-5 text-xs font-semibold leading-3.5 tracking-[-0.12px]">
          {course.tagline}
        </span>
      </div>

      <div className="flex flex-row items-center justify-between gap-2 text-lg my-2">
        <p className="text-neutral-40 font-medium">Duration:</p>
        <p className="text-neutral-15 font-semibold">{course?.duration}</p>
      </div>

      <Button
        variant="primary"
        label="Enroll Now"
        classNames="w-full my-3"
        onClick={() => {
          navigate(`/course-payment/${course?._id}`);
        }}
      />
    </div>
  );
};

export default CourseActionCard;
