import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="flex flex-col items-center justify-center bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white"
      style={{ height: "81dvh" }}
    >
      <h1 className="text-5xl font-bold mb-4">Oops! 404</h1>
      <p className="text-xl">Bu sayfa maalesef bulunamadı.</p>
      <Link
        to="/"
        className="mt-8 px-6 py-3 rounded-md bg-white text-orange-500 font-semibold hover:bg-orange-500 hover:text-white transition duration-300"
      >
        Anasayfaya Dön
      </Link>
    </div>
  );
};

export default NotFound;
