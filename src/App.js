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
  const [memoizedUser, setMemoizedUser] = useState(null);

  return (
    <div className=" bg-slate-500 h-full">
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={
              <Layout>
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
