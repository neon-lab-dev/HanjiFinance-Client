/* eslint-disable @typescript-eslint/no-explicit-any */
import CourseCard from "../CourseCard/CourseCard";
import { useGetMyCourseOrdersQuery } from "../../../../redux/Features/CourseOrders/courseOrdersApi";

const CourseSection = () => {
  const { data:courses, isLoading } = useGetMyCourseOrdersQuery({ });
  console.log(courses);
  
  if(isLoading){
    <div>Loading...</div>
  }

  return (
    <div className="mt-9">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
      {courses?.data?.orders?.map((course:any) => (
          <CourseCard {...course} />
      ))}
    </div>
  </div>
  );
};

export default CourseSection;
