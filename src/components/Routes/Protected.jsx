import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Protected({ children }) {
  const data = useSelector((state) => state.user);

  const isValid =
    Boolean(data?.name) && Boolean(data?.email) && Boolean(data?.role);

  if (!isValid) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default Protected;
