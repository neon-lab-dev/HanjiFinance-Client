import type { TCourse } from "../../../types/course.types";
import Accordion from "../../Shared/Faq/Accordion";

const CourseDescription = ({ course }: { course: TCourse }) => {
  return (
    <div className=" py-10 font-Montserrat">
      <h5 className="text-primary-20 font-bold mb-2">Overview</h5>
      <p className="text-neutral-10">{course?.overview}</p>
      <h5 className="text-primary-20 font-bold mb-3 mt-10">Course Coverage:</h5>
      <Accordion accordingData={course?.courseCoverage} />
    </div>
  );
};

export default CourseDescription;
