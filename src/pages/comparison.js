import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUniveritiesForComparison } from "../store/slice/university/universitySlice";

export default function Comparison() {
  const params = useParams();
  const dispatch = useDispatch();
  const universities = useSelector(
    (state) => state.universitySlice.universitiesForComparisonState.universities
  );
  const features = ["name", "city", "logo"];

  useEffect(() => {
    dispatch(getUniveritiesForComparison({ ids: params.universityIds }));
  }, [params.universityIds]);

  useEffect(() => {
    console.log(universities);
  }, [universities]);
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 text-left font-semibold"></th>
                {features.map((feature, index) => (
                  <th key={index} className="py-2 px-4 text-left font-semibold">
                    {feature}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {universities.map((university, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="py-4 px-4">
                    <div className="font-semibold">{university.name}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-gray-500 overflow-hidden truncate">
                      {university.city}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <img
                        src={university.logo}
                        alt={university.name}
                        className="h-16 w-16 rounded"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
