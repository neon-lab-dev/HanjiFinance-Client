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
        <div className="flex flex-col-reverse md:flex-row gap-10 items-start">
          {/* Left Content */}
          <div className="w-[100%] md:w-[65%]">
            <CourseDescription course={data?.data} />
            <Learning/>
            <Lectures course={data?.data} />
          </div>

          {/* Right Sticky Sidebar */}
          <div className="w-[100%] md:w-[35%] md:sticky md:top-20 h-fit">
            <CourseActionCard course={data?.data} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CourseDetails;
