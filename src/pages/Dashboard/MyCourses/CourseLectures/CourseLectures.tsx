/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCompleteCourseMutation,
  useCompleteLectureMutation,
  useGetAllLecturesByCourseIdQuery,
} from "../../../../redux/Features/Course/courseApi";
import Button from "../../../../components/Reusable/Button/Button";
import toast from "react-hot-toast";
import { useGetMeQuery } from "../../../../redux/Features/User/userApi";
import { FaCheck, FaLock } from "react-icons/fa";

const CoursePlayer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: myProfile } = useGetMeQuery({});
  const { data: lectures, isLoading } = useGetAllLecturesByCourseIdQuery(id);
  const [completeCourse] = useCompleteCourseMutation();
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
        navigate("/dashboard/my-courses")
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
        <Button
          onClick={() => {
            navigate("/dashboard/attend-exam/:id");
          }}
          variant="custom"
          label="Attempt Exam"
          classNames="bg-white shadow-none p-0 text-neutral-20 border-surface-90 bg-surface-30 px-4 py-2" 
        />
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
              label={"Complete Course"}
              classNames="w-fit py-2 px-3"
              onClick={handleCompleteCourse}
              disabled={completedLectures.length !== allLectures.length || purchasedCourse?.isCompletedCourse }
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
              className={`cursor-pointer border rounded-lg mb-3 flex justify-between items-center overflow-hidden shadow-sm px-3 py-2 transition 
                ${
                  selectedIndex === index
                    ? "bg-neutral-85/30 border-neutral-85/60 font-semibold"
                    : "font-medium hover:bg-gray-100 border-neutral-85/60"
                }
                ${isLocked ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              <p className="text-gray-800 font-medium">{lecture.title}</p>
              <span className="flex items-center justify-center gap-2">
                {/* <img src={ICONS.duration} alt="" /> */}
                {/* <span className="text-sm text-neutral-85">{lecture.duration}</span> */}
                {isCompleted ? (
                  <FaCheck className="text-green-500 ml-1" />
                ) : isLocked ? (
                  <FaLock className="text-gray-400 ml-1" />
                ) : null}
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
