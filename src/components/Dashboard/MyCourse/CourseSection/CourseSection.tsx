/* eslint-disable @typescript-eslint/no-explicit-any */
import CourseCard from "../CourseCard/CourseCard";
import { useGetMyCourseOrdersQuery } from "../../../../redux/Features/CourseOrders/courseOrdersApi";
import Loader from "../../../Shared/Loader/Loader";

const CourseSection = () => {
  const { data: courses, isLoading } = useGetMyCourseOrdersQuery({});

  return (
    <div className="mt-9">
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {courses?.data?.orders?.map((courseOrder: any) => (
            courseOrder?.courses?.map((course: any) => 
              <CourseCard {...course} enrolledDate={courseOrder.createdAt} />
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseSection;
