/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import Button from "../../../Reusable/Button/Button";
import { Link } from "react-router-dom";
import { useGetSingleCourseByIdQuery } from "../../../../redux/Features/Course/courseApi";

// Progress Section Component
type TProgressSection = {
  progress: number;
};

const ProgressSection: React.FC<TProgressSection> = ({ progress }) => {
  return (
    <div className="space-y-4 font-Montserrat">
      <div className="relative w-full h-2 bg-neutral-200 rounded-full">
        <motion.div
          className="h-2 bg-blue-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />

        <span
          className="font-Montserrat absolute -top-8 text-sm leading-5 font-medium text-surface-100 bg-surface-40 border border-surface-95 px-1.5 py-0.5 rounded-md"
          style={{ left: `calc(${progress}% - ${progress === 0 ? 10 : 40}px)` }}
        >
          {progress?.toFixed(0)}%
        </span>
      </div>
    </div>
  );
};

type TCourseCard = {
  courseId:string,
  _id: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  imageUrl: string;
  progressData?: {
    completed: number;
    total: number;
    progress: number; // in percentage
  };
  completedPercentage: number;
  isCourseCompleted?: boolean;
};

const CourseCard = ({
  courseId,
  completedPercentage,
  isCourseCompleted,
  
}) => {
  const {data:course, isLoading}=useGetSingleCourseByIdQuery(courseId)

  return (
    <div className="bg-white rounded-xl shadow-lg font-Montserrat relative">
      {/* Course Image */}
      <div>
        <img
          src={course?.data?.imageUrl}
          alt={course?.data?.title}
          className="rounded-t-xl w-full h-[250px]"
        />
      </div>

      {isCourseCompleted && (
        <div className="bg-green-50 text-green-500 p-1 rounded w-fit absolute top-3 right-3">
          Completed
        </div>
      )}

      {/* Course Content */}
      <div className="flex flex-col gap-4 pb-4">
        {/* Details */}
        <div className="w-full bg-surface-30 p-4 space-y-2">
          <div>
            <h1 className="text-neutral-130 text-xl tracking-[-0.2px] font-bold leading-6">
              {course?.data?.title}
            </h1>
            <p className="text-neutral-60 text-sm leading-5 capitalize">
              {course?.data?.subtitle}
            </p>
          </div>
          {/* <span className="text-neutral-160 text-xs font-medium leading-[14px] tracking-[-0.12px]">
            Enrolled on {formatDate(enrolledDate)}
          </span> */}
        </div>

        {/* Progress Section (reusable) */}
        <div className="px-4 pt-2 space-y-5 mt-auto">
          {/* {progressData && (
          <ProgressSection
              completed={progressData.completed}
              total={progressData.total}
              progress={progressData.progress}
          />
          )} */}
          <ProgressSection progress={completedPercentage} />

          {/* CTA Button */}
          <Link to={`${courseId}`}>
            <Button
              label="Continue Learning"
              variant="primary"
              classNames="w-full"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
