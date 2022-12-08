import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Protected({ children }) {
  const data = useSelector((state) => state.user);

  if (!data) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default Protected;
