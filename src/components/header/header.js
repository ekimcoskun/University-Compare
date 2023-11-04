import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import "./header.css";
import { useDispatch } from "react-redux";
import { userInfo } from "../../store/authSlice";
import { store } from "../../store/app/store";

export default function Header({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const logOut = () => {
    dispatch(userInfo(null));
    localStorage.clear();
    store.dispatch({ type: "RESET" });
    navigate("/login");
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div className="bg-slate-700">
      <div className="flex items-center">
        <Link to="/">
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img
            className="p-4 rounded-full"
            width={100}
            height={100}
            src={Logo}
          />
        </Link>
        <div className="flex items-center ml-5">
          <Link to="/universities" className="link">
            <p className="link text-white text-3xl font-semibold">
              Üniversiteler
            </p>
          </Link>
        </div>
        <div className="ml-auto flex items-center mr-5">
          {user?.isAdmin && (
            <Link to="/edit" className="link">
              <p className="link ml-6 text-white text-3xl font-semibold">
                Düzenle
              </p>
            </Link>
          )}
          {!user ? (
            <>
              <Link to="/login" className="link">
                <p className="link ml-6 text-white text-3xl font-semibold">
                  Giriş Yap
                </p>
              </Link>
              <Link to="/signup" className="link">
                <p className="link ml-6 text-white text-3xl font-semibold">
                  Kayıt Ol
                </p>
              </Link>
            </>
          ) : (
            <div className="relative inline-block text-left">
              <span className="cursor-pointer" onClick={handleDropdownToggle}>
                <p className="link ml-6 text-white text-3xl font-semibold">
                  {user.email}
                </p>
              </span>
              {isDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <button
                      onClick={logOut}
                      className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                      role="menuitem"
                    >
                      Çıkış Yap
                    </button>
                    <Link
                      to="/change-password"
                      className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                      role="menuitem"
                    >
                      Şifre Değiştir
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
