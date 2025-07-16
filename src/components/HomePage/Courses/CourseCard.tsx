import { ICONS } from "../../../assets";
import Button from "../../Reusable/Button/Button";
type TCourseCard = {
  title: string;
  description: string;
  image: string;
  duration: string;
  lessons: string;
  author: string;
  rating: number;
};
const CourseCard: React.FC<TCourseCard> = ({
  title,
  description,
  image,
  duration,
  lessons,
  author,
  rating,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-neutral-98  ">
      <img src={image} alt="" className="rounded-t-xl w-full" />
      <div className="p-[21px] flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <img
            src={ICONS.courseTitle}
            alt="course-title-icon"
            className="w-7"
          />
          <h1 className="text-accent-10 text-[17px] font-semibold leading-5">
            {title}
          </h1>
        </div>
        <p className="text-neutral-50 text-sm leading-5">{description}</p>

        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <img
                src={ICONS.clock}
                alt="course-title-icon"
                className="size-7"
              />
              <p className="text-neutral-50 text-sm leading-5 font-medium">
                {duration}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <img
                src={ICONS.author}
                alt="course-title-icon"
                className="size-7"
              />
              <p className="text-neutral-50 text-sm leading-5 font-medium">
                {author}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <img
                src={ICONS.lesson}
                alt="course-title-icon"
                className="size-7"
              />
              <p className="text-neutral-50 text-sm leading-5 font-medium">
                {lessons}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <img
                src={ICONS.rating}
                alt="course-title-icon"
                className="w-20"
              />
              <p className="text-neutral-50 text-sm leading-5 font-medium">
                {rating}
              </p>
            </div>
          </div>
        </div>
        <Button label="Enroll Now" variant="primary" className="w-full" />
      </div>
    </div>
  );
};

export default CourseCard;
