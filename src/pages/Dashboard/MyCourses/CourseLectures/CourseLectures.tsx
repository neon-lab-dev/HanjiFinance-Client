/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetAllLecturesByCourseIdQuery } from "../../../../redux/Features/Course/courseApi";
import { ICONS } from "../../../../assets";

const CoursePlayer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: lectures, isLoading } = useGetAllLecturesByCourseIdQuery(id);
  console.log(lectures);

  const [selectedLecture, setSelectedLecture] = useState<any>(null);

 useEffect(() => {
    if (lectures?.data?.lectures?.length > 0) {
      setSelectedLecture(lectures.data.lectures[0]);
    }
  }, [lectures]);

  if(isLoading){
    return(  <div>Loading...</div>);
  
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 bg-gray-50">
      <div className="col-span-2 sticky h-full top-20 flex flex-col p-6 ">
        {selectedLecture ? (
          <div className=" relative w-full">
            <div className="absolute px-5 top-0 left-0 right-0 w-full bg-gradient-to-b from-neutral-20 to-white/50 rounded-t-lg">
              <h2 className="mt-4 text-xl text-white font-semibold">{selectedLecture.title}</h2>
            <p className="text-white">{selectedLecture.description}</p></div>
            <video
              key={selectedLecture._id}
              src={selectedLecture.videoUrl}
              controls
              className="w-full h-[70vh] rounded-lg shadow-md bg-black"
            />
          
          </div>
        ) : (
          <p className="text-neutral-35 w-full h-full text-center my-auto">Select a lecture to start watching</p>
        )}
      </div>

      {/* Right: Playlist */}
      <div className="col-span-1 bg-white p-6 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Course Playlist</h3>

        {lectures?.data?.lectures?.map((lecture:any) => (
          <div
            key={lecture._id}
            onClick={() => setSelectedLecture(lecture)}
            className={`cursor-pointer border rounded-lg mb-3 flex justify-between items-center overflow-hidden shadow-sm px-3 py-2 transition 
              ${selectedLecture?._id === lecture._id ? "bg-neutral-85/30 border-neutral-85/60 font-semibold" : "font-medium hover:bg-gray-100 border-neutral-85/60"}
            `}
          >
            <p className="text-gray-800 font-medium">{lecture.title}</p>
            <span className="text-sm text-neutral-85 flex items-center justify-center gap-1"> <img src={ICONS.duration} alt=""/>{lecture.duration}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursePlayer;
