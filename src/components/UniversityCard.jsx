import React from "react";
import { Link } from "react-router-dom";

const UniversityCard = ({ university }) => {
  const { university_id, university_name, city, logo } = university;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full flex flex-col items-center">
      <img
        src={logo}
        alt={university_name}
        width={100}
        height={100}
        className="object-contain mb-4 rounded-full"
      />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{university_name}</h3>
      <p className="text-gray-600 mb-2">Şehir: {city}</p>
      <div className="mt-4 border-t border-gray-200 pt-4 text-center">
        <Link
          to={`/universities/${university_id}`}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Detaylar
        </Link>
      </div>
    </div>
  );
};

export default UniversityCard;
