import { useSelector } from "react-redux";
import data from "../common/data.json"
import { getLoggedInData, getUserRole } from "../../store/hooks";

const rolePermissions = data.rolePermissions;

// Check if a user has the necessary permission
export const hasPermission = (userRole, requiredPermission) => {
  // const rolePermission = useSelector(getLoggedInData);
  // return Array.isArray(rolePermission.claims) &&  rolePermissions[userRole].includes(requiredPermission);
  return rolePermissions[userRole].includes(requiredPermission);
};

export const getUserRoleFromToken = () => {
  const userRole = useSelector(getUserRole);
    return userRole;
}
