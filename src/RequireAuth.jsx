import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ProfileContext } from "./contexts/ProfileContext";

const RequireAuth = ({ children }) => {
  // const location = useLocation();
  const { currentLocation: location } = useContext(ProfileContext);
  console.log(location);

  if (!sessionStorage.getItem("token")) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }
  return children;
};

export default RequireAuth;
