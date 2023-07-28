import React from "react";
import { Link } from "react-router-dom";

const notFound = () => {
  return (
    <div className="w-full text-center py-10">
      <div className="w-full">
        <h1>404 - Page Not Found</h1>
      </div>
      <div className="w-full">
        <p>Sorry, This page could not be found.</p>
      </div>
      <div className="w-full">
        <Link className="font-bold" to="/">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default notFound;
