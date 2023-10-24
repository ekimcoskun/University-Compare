import React from "react";

const Card = ({ title, statistic }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{statistic}</p>
    </div>
  );
};

export default Card;
