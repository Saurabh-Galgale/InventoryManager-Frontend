import React from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Authorization = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default Authorization;
