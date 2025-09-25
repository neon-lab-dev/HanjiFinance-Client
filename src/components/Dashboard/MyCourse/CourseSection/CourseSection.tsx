/* eslint-disable @typescript-eslint/no-explicit-any */
import CourseCard from "../CourseCard/CourseCard";
import Loader from "../../../Shared/Loader/Loader";
import { useGetMeQuery } from "../../../../redux/Features/User/userApi";

const CourseSection = () => {
  const { data: myProfile, isLoading } = useGetMeQuery({});
  console.log(myProfile)

  return (
    <div className="mt-9">
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {myProfile?.data?.purchasedCourses?.map((course: any) => (
            <CourseCard courseId={course?.courseId} isCourseCompleted={course.isCompletedCourse} completedPercentage={course.progress?.percentage} />
          ))}
        </div>
      )}
    </div>
  );
};
 
export default CourseSection;
