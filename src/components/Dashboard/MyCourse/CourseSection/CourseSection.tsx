import CourseCard from "../CourseCard/CourseCard";
import { IMAGES } from "../../../../assets";
import { Link } from "react-router-dom";
import { useGetAllCoursesQuery } from "../../../../redux/Features/Course/courseApi";

const CourseSection = () => {
  const { data:courses, isLoading } = useGetAllCoursesQuery({ keyword: "", category: "" });
  console.log(courses)

  return (
    <div className="mt-9">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses?.data?.courses.map((course) => (
          <CourseCard {...course} />
      ))}
    </div>
  </div>
  );
};

export default CourseSection;
