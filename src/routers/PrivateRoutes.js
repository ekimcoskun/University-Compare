import React, { Suspense, lazy } from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Dashboard from "../pages/dashboard";

export function PrivateRoutes({ user }) {
  const NotFoundPage = lazy(() => import("../pages/notFound"));
  const Universities = lazy(() => import("../pages/universities"));
  const Login = lazy(() => import("../pages/login/index"));
  const Signup = lazy(() => import("../pages/signup/index"));
  const Edit = lazy(() => import("../pages/edit/index"));

  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/universities" element={<Universities />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {user?.isAdmin && (
          <>
            <Route path="/edit" element={<Edit />} />
          </>
        )}
      </Routes>
    </Suspense>
  );
}
