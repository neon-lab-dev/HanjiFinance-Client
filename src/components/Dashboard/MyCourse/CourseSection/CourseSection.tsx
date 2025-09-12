/* eslint-disable @typescript-eslint/no-explicit-any */
import CourseCard from "../CourseCard/CourseCard";
import { useGetAllCoursesQuery } from "../../../../redux/Features/Course/courseApi";

const CourseSection = () => {
  const { data:courses, isLoading } = useGetAllCoursesQuery({ keyword: "", category: "" });
  
  if(isLoading){
    <div>Loading...</div>
  }

  return (
    <div className="mt-9">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses?.data?.courses?.map((course:any) => (
          <CourseCard {...course} />
      ))}
    </div>
  </div>
  );
};

export default CourseSection;
