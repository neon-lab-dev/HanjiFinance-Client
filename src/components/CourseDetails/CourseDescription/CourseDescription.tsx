import type { TCourse } from "../../../types/course.types";

const CourseDescription = ({course} : {course: TCourse}) => {
  return (
    <div className=" py-10 font-Montserrat space-y-4">
        <h5 className="text-primary-20 font-bold">Description</h5>
        <div className=" rounded-lg shadow-lg shadow-accent-5/10 p-4">
          <p>
            {course.subtitle}
          </p>
        </div>
   
    </div>
  );
};

export default CourseDescription;
