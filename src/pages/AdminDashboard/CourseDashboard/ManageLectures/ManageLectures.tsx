import { FaVideo, FaTrash, FaRegFileVideo } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Button from "../../../../components/Reusable/Button/Button";
import SubscriptionStatus from "../../../../components/Dashboard/SubscriptionStatus/SubscriptionStatus";
import ConfirmationModal from "../../../../components/ConfirmationModal/ConfirmationModal";
import { useState } from "react";
import AddLecture from "../../../../components/AdminDashboard/Courses/AddLecture";
import { useParams } from "react-router-dom";
import { useDeleteLectureMutation, useGetSingleCourseByIdQuery } from "../../../../redux/Features/Course/courseApi";
import type { TLecture } from "../../../../types/course.types";

const ManageLectures = () => {
  const { id } = useParams();
  const { data } = useGetSingleCourseByIdQuery(id);
  const [deleteLecture] = useDeleteLectureMutation();
  const [isAddLectureModalOpen, setIsAddLectureModalOpen] = useState<boolean>(false);
  const [deletingVideoId, setDeletingVideoId] = useState<string | null>(null);

  const handledDeleteLecture = async (lectureId: string) => {
    try {
      setDeletingVideoId(lectureId);
      const response = await deleteLecture({ courseId: id, lectureId }).unwrap();
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setDeletingVideoId(null);
    }
  };

  const lectures = data?.course?.lectures || [];

  return (
    <div>
      <SubscriptionStatus>
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Manage Lectures</h2>
          <p className="text-gray-500 text-sm">Organize your course lectures in an easy way</p>
        </div>

        {/* Lectures List */}
        {lectures.length > 0 ? (
          <div className="flex flex-col gap-4">
            {lectures.map((lecture: TLecture) => (
              <div
                key={lecture._id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200"
              >
                {/* Left: Video Icon */}
                <div className="flex items-center gap-4">
                  <div className="text-primary-10 text-3xl">
                    <FaVideo />
                  </div>
                  {/* Title & Duration */}
                  <div>
                    <h3 className="font-medium text-gray-800">{lecture.title}</h3>
                    <p className="text-gray-500 text-sm">Duration: {lecture.duration}</p>
                  </div>
                </div>

                {/* Right: Delete Button / Loader */}
                <button
                  onClick={() => handledDeleteLecture(lecture._id)}
                  className="text-primary-10 hover:text-red-600 transition-colors cursor-pointer flex items-center justify-center"
                  disabled={deletingVideoId === lecture._id}
                >
                  {deletingVideoId === lecture._id ? (
                    <AiOutlineLoading3Quarters className="animate-spin text-xl" />
                  ) : (
                    <FaTrash />
                  )}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400 gap-4">
            <FaRegFileVideo className="text-5xl" />
            <p className="text-lg font-medium">No lectures added yet</p>
          </div>
        )}

        {/* Add Lecture Button */}
        <div className="mt-6 flex justify-start">
          <Button
            variant="primary"
            label="Add New Lecture"
            type="button"
            classNames="py-2 px-3"
            onClick={() => setIsAddLectureModalOpen(true)}
          />
        </div>
      </SubscriptionStatus>

      <ConfirmationModal
        heading="Add New Lecture"
        isConfirmationModalOpen={isAddLectureModalOpen}
        setIsConfirmationModalOpen={setIsAddLectureModalOpen}
        isCrossVisible={true}
      >
        <AddLecture
          courseId={id as string}
          setIsAddLectureModalOpen={setIsAddLectureModalOpen}
        />
      </ConfirmationModal>
    </div>
  );
};

export default ManageLectures;
