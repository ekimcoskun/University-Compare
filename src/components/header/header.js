import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import "./header.css";

export default function Header() {
  return (
    <div className="bg-slate-700">
      <div className="flex items-center ">
        <Link to="/">
          <img className="p-4 rounded-full" width={100} height={100} src={Logo} />
        </Link>
        <div className="flex items-center ml-5">
          <Link to="/universities" className="link">
            <p className="link text-white text-3xl font-semibold">Üniversiteler</p>
          </Link>
          <Link to="/compare" className="link">
            <p className="link ml-6 text-white text-3xl font-semibold">Kıyasla</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
