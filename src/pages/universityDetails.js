import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getUniversityById } from "../store/slice/university/universitySlice";
import { useParams } from "react-router-dom";

export default function UniversityDetails() {
  const dispatch = useDispatch();
  const params = useParams();
  const university = useSelector((state) => state.universitySlice.universityByIdState.university);

  useEffect(() => {
    dispatch(getUniversityById(params.id));
  }, []);

  useEffect(() => {
    console.log(university);
  }, [university]);
  return (
    <div className="p-5">
      <div className="flex justify-center mt-5">
        <div>
          <img className="rounded-full" src={university.logo} />
        </div>
        <div className="ml-4">
          <p className="text-white text-3xl">{university.university_name}</p>
          <p className="text-white text-2xl">{university.city}</p>
        </div>
      </div>
    </div>
  );
}
