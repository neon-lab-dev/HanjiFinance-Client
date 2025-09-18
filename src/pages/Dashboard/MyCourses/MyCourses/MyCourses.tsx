import { ICONS } from "../../../../assets";
import CourseSection from "../../../../components/Dashboard/MyCourse/CourseSection/CourseSection";
import Button from "../../../../components/Reusable/Button/Button";
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-5">
      <div className="w-full flex item-center justify-end">
        <Button
          onClick={() => {
            navigate("/courses");
          }}
          variant="custom"
          label="Browse Courses"
          classNames="bg-white shadow-none p-0 text-neutral-20 border-surface-90 bg-surface-30 px-4 py-2"
          icon={ICONS.noteBook}
        />
      </div>
      <CourseSection />
    </div>
  );
};

export default MyCourses;
