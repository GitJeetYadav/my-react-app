import React from "react";
import { getLoggedInData } from "../../store/hooks";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
export default function HasPermission({ requiredPermission, children }) {
  const rolePermission = useSelector(getLoggedInData);
  const hasPermission =
    Array.isArray(rolePermission.claims) &&
    rolePermission.claims.includes(requiredPermission);

  if (!hasPermission) {
    return <></>;
  }

  return children;
}
