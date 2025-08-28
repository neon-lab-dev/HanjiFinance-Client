import { useParams } from "react-router-dom";
import CoursePlayer from "../../../../../components/Dashboard/MyCourse/CoursePlayer/CoursePlayer";

const CoursesDetails = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <div>
     <CoursePlayer/>
    </div>
  );
};

export default CoursesDetails;