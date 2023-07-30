import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { lazy, useMemo, useState } from "react";
import { PrivateRoutes } from "./routers/PrivateRoutes";

function App() {
  const NotFoundPage = lazy(() => import("./pages/notFound"));
  const user = useSelector((state) => state?.userInformation?.user);
  const [memoizedUser, setMemoizedUser] = useState(null);

  useMemo(() => {
    if (user && user.role) {
      setMemoizedUser(user);
    } else {
      setMemoizedUser(null);
    }
  }, [user]);

  return (
    <div className=" bg-slate-500 h-full">
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={
              <Layout memoizedUser={memoizedUser}>
                <PrivateRoutes />
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
