import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUniversities } from "../store/slice/university/universitySlice";
import UniversityCard from "../components/UniversityCard";
import { RingLoader } from "react-spinners";

const Universities = () => {
  const dispatch = useDispatch();
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isNextPage, setIsNextPage] = useState(false);
  const [isPrevPage, setIsPrevPage] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const universities = useSelector((state) => state.universitySlice.universityState.universities);
  const totalRecords = useSelector(
    (state) => state.universitySlice.universityState.pagination.totalRecords
  );
  const loading = useSelector((state) => state.universitySlice.universityState.status);

  useEffect(() => {
    dispatch(getAllUniversities({ page: 1, size: perPage }));
  }, [dispatch]);

  useEffect(() => {
    console.log("loading", loading);
  }, [loading]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    dispatch(getAllUniversities({ page: currentPage + 1, size: perPage }));
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
    dispatch(getAllUniversities({ page: currentPage - 1, size: perPage }));
  };

  useEffect(() => {
    setTotalPages(Math.ceil(totalRecords / perPage));
    if (currentPage < totalPages) {
      setIsNextPage(true);
    }
    if (currentPage >= totalPages) {
      setIsNextPage(false);
    }
    if (currentPage > 1) {
      setIsPrevPage(true);
    }
    if (currentPage <= 1) {
      setIsPrevPage(false);
    }
  }, [universities, currentPage]);

  return (
    <div>
      {loading && loading ? (
        <div className="flex justify-center align-center mt-5">
          <RingLoader className="mt-5" color="white" size={80} />
        </div>
      ) : (
        <div className="container mx-auto">
          <div className="py-8">
            <p className="text-white text-2xl font-semibold mb-4">Üniversiteler</p>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Üniversite Ara..."
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {universities && universities.length > 0 ? (
              universities.map((university, index) => (
                <UniversityCard key={index} university={university} />
              ))
            ) : (
              <p className="text-white text-xl font-semibold mb-4">No universities found.</p>
            )}
          </div>

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
        </div>
      )}
    </div>
  );
};

export default Universities;
