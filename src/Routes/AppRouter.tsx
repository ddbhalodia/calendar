import React from "react";
import { Home } from "../Pages";
import "../Styles/index.css";
import { Navigate, Route, Routes } from "react-router-dom";

const AppRouter = () => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  
  return (
    <Routes>
      <Route path="*" element={<Navigate to={`/${year}/${month + 1}`} />} />
      <Route path={`/:queryYear/:queryMonth`} element={<Home />} />
    </Routes>
  );
};

export default AppRouter;
