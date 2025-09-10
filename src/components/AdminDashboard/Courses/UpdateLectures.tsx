/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";

const UpdateLectures = () => {
  const [lectures, setLectures] = useState([
    { id: 1, title: "Introduction to React" },
    { id: 2, title: "State & Props" },
    { id: 3, title: "React Hooks" },
  ]);

  const handleDelete = (id: number) => {
    setLectures(lectures.filter((lec) => lec.id !== id));
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">Lectures</h2>

      {lectures.length === 0 ? (
        <p className="text-gray-500 text-sm">No lectures added yet.</p>
      ) : (
        <ul className="divide-y">
          {lectures.map((lec) => (
            <li
              key={lec.id}
              className="flex justify-between items-center py-3"
            >
              <span className="text-gray-800">{lec.title}</span>
              <button
                onClick={() => handleDelete(lec.id)}
                className="text-red-500 hover:text-red-700"
              >
                <FiTrash2 size={18} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UpdateLectures;
