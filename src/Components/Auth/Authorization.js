import React from 'react';
import { Navigate } from 'react-router-dom';
import { Outlet } from "react-router-dom";

const Authorization = ({ children }) => {

    const item = localStorage.getItem("token");

    // if (item == null || item == undefined || !item) {
    //     return <Navigate to="/login" replace />;
    // }

    return <Outlet />;
}

export default Authorization;