import React, { Suspense, lazy } from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Dashboard from "../pages/dashboard";

export function PrivateRoutes() {
  const NotFoundPage = lazy(() => import("../pages/notFound"));
  const Universities = lazy(() => import("../pages/universities"));
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/universities" element={<Universities />} />
      </Routes>
    </Suspense>
  );
}
