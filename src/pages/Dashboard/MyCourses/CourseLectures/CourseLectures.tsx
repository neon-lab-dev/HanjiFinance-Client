/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCompleteCourseMutation,
  useCompleteLectureMutation,
  useGetAllLecturesByCourseIdQuery,
  useGetExamByCourseIdQuery,
  useGetMyCoursesQuery,
} from "../../../../redux/Features/Course/courseApi";
import Button from "../../../../components/Reusable/Button/Button";
import toast from "react-hot-toast";
import { FaCheck, FaClock, FaLock, FaPlay } from "react-icons/fa";
const CoursePlayer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: myProfile } = useGetMyCoursesQuery({});
  const { data: lectures, isLoading } = useGetAllLecturesByCourseIdQuery(id);
  const { data: exam } = useGetExamByCourseIdQuery(id);
  const [completeCourse, { isLoading: isCourseCompleting }] =
    useCompleteCourseMutation();
  const [completeLecture] = useCompleteLectureMutation();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const allLectures = lectures?.data?.lectures || [];
  const selectedLecture = allLectures[selectedIndex];

  // Get completed lecture IDs from user profile
  const purchasedCourse = myProfile?.data?.purchasedCourses?.find(
    (pc: any) => pc.courseId?._id === id
  );
  const completedLectures: string[] =
    purchasedCourse?.progress?.completedLectures || [];

  useEffect(() => {
    if (allLectures.length > 0) {
      setSelectedIndex(0);
    }
  }, [lectures]);

  const handleCompleteCourse = async () => {
    try {
      const response = await completeCourse(id).unwrap();

      if (response?.success) {
        toast.success("Course completed successfully.");
        navigate("/dashboard/my-courses");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to complete course");
    }
  };

  const handleNext = async () => {
    if (!selectedLecture) return;

    // If lecture is not completed, complete it first
    if (!completedLectures.includes(selectedLecture._id)) {
      try {
        const response = await completeLecture({
          courseId: id,
          lectureId: selectedLecture._id,
        }).unwrap();

        if (response?.success) {
          // toast.success("Lecture marked as completed");
        }
      } catch (err: any) {
        toast.error(err?.data?.message || "Failed to complete lecture");
        return; // stop moving to next if failed
      }
    }

    // Move to next lecture if available
    if (selectedIndex < allLectures.length - 1) {
      setSelectedIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (selectedIndex > 0) setSelectedIndex((prev) => prev - 1);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-3">
      <div className="w-full flex item-center justify-end">
        {exam && purchasedCourse?.isPassed === false && (
          <Button
            onClick={() => {
              navigate(`/dashboard/attend-exam/${id}`);
            }}
            disabled={
              purchasedCourse?.isCompletedCourse == false ||
              purchasedCourse?.examLimitLeft < 1
            }
            variant="custom"
            label="Attempt Exam"
            classNames="bg-white shadow-none p-0 text-neutral-20 border-surface-90 bg-surface-30 px-4 py-2"
          />
        )}
        {exam && purchasedCourse?.isPassed == true && (
          <Button
            variant="custom"
            label={`Passed | Score:${purchasedCourse?.score}`}
            classNames="bg-white shadow-none p-0 text-neutral-20 border-surface-90 bg-surface-30 px-4 py-2"
          />
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 bg-gray-50">
        <div className="col-span-2 sticky h-full top-20 flex flex-col p-6 ">
          {selectedLecture ? (
            <div className="relative w-full">
              <div className="absolute px-5 top-0 left-0 right-0 w-full bg-gradient-to-b from-neutral-20 to-white/50 rounded-t-lg">
                <h2 className="mt-4 text-xl text-white font-semibold">
                  {selectedLecture.title}
                </h2>
                <p className="text-white">{selectedLecture.description}</p>
              </div>
              <video
                key={selectedLecture._id}
                src={selectedLecture.videoUrl}
                controls
                className="w-full h-[70vh] rounded-lg shadow-md bg-black"
              />
            </div>
          ) : (
            <p className="text-neutral-35 w-full h-full text-center my-auto">
              Select a lecture to start watching
            </p>
          )}

          <div className="flex items-center gap-3 justify-between mt-4">
            <Button
              variant="secondary"
              label="Previous"
              classNames="w-fit py-2 px-3"
              onClick={handlePrevious}
              disabled={selectedIndex === 0}
            />
            <div className="flex gap-3">
              <Button
                variant="secondary"
                label={
                  isCourseCompleting ? "Please wait..." : "Complete Course"
                }
                classNames="w-fit py-2 px-3"
                onClick={handleCompleteCourse}
                disabled={
                  completedLectures.length !== allLectures.length ||
                  purchasedCourse?.isCompletedCourse
                }
              />
              <Button
                variant="primary"
                label="Next Lecture"
                classNames="w-fit py-2 px-3"
                onClick={handleNext}
                disabled={selectedIndex === allLectures.length}
              />
            </div>
          </div>
        </div>

        {/* Right: Playlist */}
        <div className="col-span-1 bg-white p-6 overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4">Course Playlist</h3>

          {allLectures?.map((lecture: any, index: number) => {
            const isCompleted = completedLectures.includes(lecture._id);
            const isLocked =
              index > 0 &&
              !completedLectures.includes(allLectures[index - 1]._id);

            return (
              <div
                key={lecture._id}
                onClick={() => !isLocked && setSelectedIndex(index)}
                className={`cursor-pointer border rounded-xl mb-3 flex justify-between items-center overflow-hidden shadow-sm px-4 py-3 transition-all duration-300 group
    ${
      selectedIndex === index
        ? "bg-blue-50 border-blue-200 shadow-md transform scale-[1.02]"
        : "bg-white border-gray-200 hover:bg-gray-50 hover:shadow-md hover:border-gray-300"
    }
    ${isLocked ? "opacity-60 cursor-not-allowed" : "hover:-translate-y-0.5"}
  `}
              >
                <div className="flex items-center gap-3">
                  {/* Play Icon Container */}
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
      ${
        selectedIndex === index
          ? "bg-primary-10 text-white"
          : isLocked
          ? "bg-gray-300 text-gray-500"
          : "bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-500"
      }
    `}
                  >
                    {isLocked ? (
                      <FaLock className="text-xs" />
                    ) : (
                      <FaPlay className="text-xs ml-0.5" />
                    )}
                  </div>

                  {/* Lecture Title */}
                  <div className="flex flex-col">
                    <p
                      className={`font-medium transition-colors
        ${
          selectedIndex === index
            ? "text-primary-10"
            : isLocked
            ? "text-gray-500"
            : "text-gray-800 group-hover:text-gray-900"
        }
      `}
                    >
                      {lecture.title}
                    </p>
                    {lecture.duration && (
                      <span className="text-xs text-gray-500 mt-0.5">
                        {lecture.duration}
                      </span>
                    )}
                  </div>
                </div>

                {/* Status Indicator */}
                <span className="flex items-center justify-center gap-2">
                  {isCompleted ? (
                    <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-full">
                      <FaCheck className="text-green-500" />
                      <span className="text-xs font-medium">Completed</span>
                    </div>
                  ) : isLocked ? (
                    <div className="flex items-center gap-1 text-gray-500">
                      <FaLock />
                      <span className="text-xs">Locked</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-gray-400 group-hover:text-gray-600 transition-colors">
                      <FaClock className="text-xs" />
                      {lecture.duration && (
                        <span className="text-xs">{lecture.duration}</span>
                      )}
                    </div>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
