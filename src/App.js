import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import { useEffect, useState, lazy } from "react";
import { useSelector, useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { PrivateRoutes } from "./routers/PrivateRoutes";
import { userInfo } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();
  const NotFoundPage = lazy(() => import("./pages/notFound"));
  const user = useSelector((state) => state?.userInformation?.user);

  useEffect(() => {
    if (!user?.user) {
      let jwtToken = window.localStorage.getItem("token");
      if (jwtToken) {
        const decodedToken = jwtDecode(jwtToken);
        dispatch(userInfo(decodedToken));
      }
    }
  }, []);

  return (
    <div className="bg-slate-500 h-full">
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={
              <Layout user={user}>
                <PrivateRoutes user={user} />
              </Layout>
            }
          />
          <Route path="/error" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
