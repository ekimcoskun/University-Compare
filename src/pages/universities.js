import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUniversities } from "../store/slice/university/universitySlice";
import UniversityCard from "../components/UniversityCard";
import { RingLoader } from "react-spinners";
import { debounce } from "lodash";
import DebounceTextInput from "../components/DebounceTextInput";
import { useNavigate } from "react-router-dom";

const Universities = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isNextPage, setIsNextPage] = useState(false);
  const [selectedUniversities, setSelectedUniversities] = useState([]);
  const [isPrevPage, setIsPrevPage] = useState(false);
  const [filter, setFilter] = useState("");
  const universities = useSelector(
    (state) => state.universitySlice.universityState.universities
  );
  const totalRecords = useSelector(
    (state) => state.universitySlice.universityState.pagination.totalRecords
  );
  const loading = useSelector(
    (state) => state.universitySlice.universityState.status
  );

  useEffect(() => {
    dispatch(getAllUniversities({ page: 1, size: perPage, filter }));
  }, []);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    dispatch(getAllUniversities({ page: currentPage + 1, size: perPage }));
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
    dispatch(getAllUniversities({ page: currentPage - 1, size: perPage }));
  };

  useEffect(() => {
    const total = Math.ceil(totalRecords / perPage);
    if (currentPage < total) {
      setIsNextPage(true);
    }
    if (currentPage >= total) {
      setIsNextPage(false);
    }
    if (currentPage > 1) {
      setIsPrevPage(true);
    }
    if (currentPage <= 1) {
      setIsPrevPage(false);
    }
  }, [universities, currentPage, totalRecords]);

  const handleFilterChange = (value) => {
    dispatch(getAllUniversities({ filter: value, size: perPage, page: 1 }));
  };

  const handleUniversitySelect = (university) => {
    const universityIndex = selectedUniversities.findIndex(
      (u) => u.university_id === university.university_id
    );

    if (universityIndex === -1) {
      setSelectedUniversities([...selectedUniversities, university]);
    } else {
      const updatedSelectedUniversities = [...selectedUniversities];
      updatedSelectedUniversities.splice(universityIndex, 1);
      setSelectedUniversities(updatedSelectedUniversities);
    }
  };

  useEffect(() => {
    console.log(selectedUniversities);
  }, [selectedUniversities]);

  const handleComparisonClick = () => {
    const selectedIds = selectedUniversities.map(
      (university) => university.university_id
    );
    const comparisonUrl = `/comparison/${selectedIds.join(",")}`;
    navigate(comparisonUrl);
  };

  return (
    <div>
      <div className="container mx-auto">
        <div className="py-8">
          <p className="text-white text-2xl font-semibold mb-4">
            Üniversiteler
          </p>
          <DebounceTextInput
            placeHolder="Üniversite Ara..."
            onChange={(value) => handleFilterChange(value)}
            delay={1000}
          />
        </div>
        {loading ? (
          <div className="flex justify-center align-center mt-5">
            <RingLoader className="mt-5" color="white" size={80} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {universities && universities.length > 0 ? (
              universities.map((university, index) => (
                <UniversityCard
                  key={index}
                  university={university}
                  onUniversitySelect={handleUniversitySelect}
                />
              ))
            ) : (
              <p className="text-white text-xl font-semibold mb-4">
                No universities found.
              </p>
            )}
          </div>
        )}
        {universities && universities.length > 0 && (
          <div className="flex justify-center mt-8 mb-4">
            <button
              className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-white px-6 py-3 rounded-full shadow-md mr-4 transform transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handlePrevPage}
              disabled={!isPrevPage}
            >
              Önceki
            </button>
            <button
              className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-white px-6 py-3 rounded-full shadow-md transform transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleNextPage}
              disabled={!isNextPage}
            >
              Sonraki
            </button>
          </div>
        )}
        <div className="fixed bottom-0 right-0 w-full bg-gray-100 shadow-lg md:w-1/2 rounded-lg md:m-4">
          <div className="relative">
            {selectedUniversities.length > 0 && (
              <div className="p-4 md:p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Selected Universities
                </h2>
                <div className="flex flex-row gap-2 md:gap-4 overflow-x-auto">
                  {selectedUniversities.map((university, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center text-center"
                    >
                      <img
                        src={university.logo}
                        alt={`${university.name} Logo`}
                        className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover"
                      />
                      <p className="text-gray-600 mt-2">
                        {university.name.length > 20
                          ? `${university.name.substring(0, 20)}...`
                          : university.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {selectedUniversities.length >= 2 && (
              <button
                className="mt-2 mr-2 absolute top-0 right-0  bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={handleComparisonClick}
              >
                Kıyasla
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Universities;
