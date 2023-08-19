import React from "react";
import { Link } from "react-router-dom";

const UniversityCard = ({ university, onUniversitySelect }) => {
  const { university_id, university_name, city, logo } = university;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full flex flex-col items-center relative">
      <button
        className="absolute top-2 left-2 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md transition duration-300"
        onClick={() => onUniversitySelect(university)}
      >
        +
      </button>
      <div className="flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
        <img src={logo} alt={university_name} className="object-contain rounded-full" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{university_name}</h3>
      <p className="text-gray-600 mb-2">Şehir: {city}</p>
      <div className="mt-4 border-t border-gray-200 pt-4 text-center">
        <Link
          to={`/universities/${university_id}`}
          className="text-blue-600 hover:text-blue-800 font-medium transition duration-300"
        >
          Detaylar
        </Link>
      </div>
    </div>
  );
};

export default UniversityCard;
