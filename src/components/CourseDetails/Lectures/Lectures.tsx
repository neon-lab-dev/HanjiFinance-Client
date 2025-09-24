import { FaVideo } from "react-icons/fa";
import { useGetAllLecturesByCourseIdQuery } from "../../../redux/Features/Course/courseApi";
import type { TLecture } from "../../../types/course.types";
import { ICONS } from "../../../assets";
import { BiLock } from "react-icons/bi";

const Lectures = ({ course }) => {
  const { data, isLoading } = useGetAllLecturesByCourseIdQuery(course._id);
  const lectures = data?.data?.lectures || [];
  return (
    <div className=" py-10 font-Montserrat space-y-4">
      <h5 className="text-primary-20 font-bold">Course contents</h5>
      <div className="space-y-1 rounded-lg shadow-lg shadow-accent-5/10 p-4">
        {lectures.map((lecture: TLecture) => (
          <div
            key={lecture._id}
            className="flex items-center gap-1 justify-between px-4 py-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow w-full duration-200"
          >
            {/* Left: Video Icon */}
            <div className="flex  w-full items-center gap-4 justify-between">
              <div className="flex items-center justify-start gap-4 text-primary-10">
                <FaVideo className="text-lg" />
                <h3 className="font-medium text-neutral-10 capitalize">
                  {lecture.title}
                </h3>
              </div>
              {/* Title & Duration */}
              <div className="flex items-center justify-end gap-1">
                <img src={ICONS.duration} alt="" />
                <p className="text-gray-500 text-sm">
                  {lecture.duration} {"  "}
                </p>{" "}
                <BiLock className="text-primary-10 ml-3" />
              </div>
            </div>

            {/* Right: Delete Button / Loader */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lectures;
