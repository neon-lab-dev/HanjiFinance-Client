import { motion } from "framer-motion";
import Button from "../../../Reusable/Button/Button";

// Progress Section Component
type TProgressSection = {
  completed: number;   // e.g. 3
  total: number;       // e.g. 14
  progress: number;    // e.g. 30
};

const ProgressSection: React.FC<TProgressSection> = ({ completed, total, progress }) => {
  return (
    <div className="space-y-4 font-Montserrat">
  {/* Progress Text */}
  <div className="flex justify-between font-medium text-neutral-10 pb-8 ">
    <span>
      Progress<span className="text-neutral-125"> |</span> <span className="text-neutral-50 text-sm font-medium">{completed}/{total} lessons</span> 
    </span>
  </div>

  {/* Progress Bar */}
  <div className="relative w-full h-2 bg-neutral-200 rounded-full">
    {/* Filled part */}
    <motion.div
      className="h-2 bg-blue-600 rounded-full"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    />

    {/* Floating progress label */}
    <span
      className=" font-Montserrat absolute -top-8 text-sm leading-5 font-medium text-surface-100 bg-surface-40 border border-surface-95 px-1.5 py-0.5 rounded-md"
      style={{ left: `calc(${progress}% - 20px)` }} // offset so it doesn't overflow
    >
      {progress}%
    </span>
  </div>
</div>

  );
};

// Course Card Component
type TCourseCard = {
  title: string;
  subTitle: string;
  tag: string;
  description: string;
  image: string;
  progressData?: {
    completed: number;
    total: number;
    progress: number; // in percentage
  };
};

const CourseCard: React.FC<TCourseCard> = ({
  title,
  subTitle,
  tag,
  image,
  progressData,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg font-Montserrat">
      {/* Course Image */}
      <div>
        <img src={image} alt={title} className="rounded-t-xl w-full" />
      </div>

      {/* Course Content */}
      <div className="flex flex-col gap-4 pb-4">
        {/* Details */}
        <div className="w-full p-4 space-y-2">
          <div>
            <h1 className="text-neutral-130 text-xl tracking-[-0.2px] font-bold leading-6">
              {title}
            </h1>
            <p className="text-neutral-60 text-sm leading-5">{subTitle}</p>
          </div>
          <span className="text-neutral-160 text-xs font-medium leading-[14px] tracking-[-0.12px]">
            {tag}
          </span>
        </div>

        {/* Progress Section (reusable) */}
        <div className="px-4 pt-2 space-y-5 mt-auto">
          {progressData && (
            <ProgressSection
              completed={progressData.completed}
              total={progressData.total}
              progress={progressData.progress}
            />
          )}

          {/* CTA Button */}
          <Button
            label="Continue Learning"
            variant="primary"
            classNames="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
