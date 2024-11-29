// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { hasPermission, getUserRoleFromToken } from "../ui-components/authUtils";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ permission, children }) => {
  const userRole = getUserRoleFromToken();
  // Redirect if user doesn't have permission
  if (!hasPermission(userRole, permission)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
