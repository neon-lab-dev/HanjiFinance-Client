import CourseDetailsHero from "../../components/CourseDetails/CourseDetailsHero/CourseDetailsHero";
import CourseDescription from "../../components/CourseDetails/CourseDescription/CourseDescription";
import Container from "../../components/Reusable/Container/Container";
import Learning from "../../components/CourseDetails/Learning/Learning";
import CourseActionCard from "../../components/CourseDetails/CourseActionCard/CourseActionCard";
import Lectures from "../../components/CourseDetails/Lectures/Lectures";
import { useGetSingleCourseByIdQuery } from "../../redux/Features/Course/courseApi";
import { useParams } from "react-router-dom";

const CourseDetails = () => {
  // ✅ Get course id from URL
  const { id } = useParams();

  // ✅ Fetch course data using RTK Query
  const { data, isLoading, error } = useGetSingleCourseByIdQuery(id);
  if (isLoading) return <p>Loading course...</p>;
  if (error) return <p>Failed to load course.</p>;

  return (
    <div>
      <CourseDetailsHero course={data?.data} />
      <Container>
        <div className="flex flex-col-reverse md:flex-row gap-10 2xl:gap-20 items-start font-Montserrat mb-10 lg:mb-20">
          {/* Left Content */}
          <div className="w-full md:w-[65%]">
            <CourseDescription course={data?.data} />
            <Learning />

            <h2 className="text-neutral-5 font-bold text-lg">Please Note:</h2>
            <p className="text-neutral-85 mt-4">
              This is an introductory course, designed to help you understand
              what each financial term means, how values are derived, and how
              different parts of the market interconnect.
              <br />
              <br />
              For in-depth, calculations-based advanced learning, refer to my
              other specialized courses.
            </p>
          </div>

          {/* Right Sticky Sidebar */}
          <div className="w-full md:w-[35%] md:sticky md:top-20 h-fit">
            <CourseActionCard course={data?.data} />
            <Lectures course={data?.data} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CourseDetails;
