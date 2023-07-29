import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUniversities } from "../store/slice/university/universitySlice";
import UniversityCard from "../components/UniversityCard";

const Universities = () => {
  const dispatch = useDispatch();
  const universities = useSelector((state) => state.universitySlice.universityState.universities);
  const totalRecords = useSelector(
    (state) => state.universitySlice.universityState.pagination.totalRecords
  );

  useEffect(() => {
    dispatch(getAllUniversities({ page: 1, size: 10 }));
  }, [dispatch]);

  useEffect(() => {
    console.log(totalRecords);
  }, [universities, totalRecords]);

  return (
    <div className="container mx-auto px-4">
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
    </div>
  );
};

export default Universities;
