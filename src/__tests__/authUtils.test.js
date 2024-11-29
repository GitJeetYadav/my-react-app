import { useSelector } from "react-redux";
import data from "../components/common/data.json";
import { getUserRole } from "../store/hooks";
import { hasPermission, getUserRoleFromToken } from "../components/ui-components/authUtils";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

describe("Role Permissions", () => {
  describe("hasPermission", () => {
    it("returns true when the user has the required permission", () => {
      const userRole = "admin"; 
      const requiredPermission = "editUser";
      
      data.rolePermissions = {
        admin: ["viewDashboard", "editUser", "deleteUser","addUser","viewAdminCard","viewDealerCard","viewSupplierCard"], 
      };
      
      expect(hasPermission(userRole, requiredPermission)).toBe(true);
    });

    it("returns false when the user does not have the required permission", () => {
      const userRole = "dealer"; 
      const requiredPermission = "manageUsers";
      data.rolePermissions = {
        dealer: ["viewDashboard", "editUser","viewDealerCard"],
      };

      expect(hasPermission(userRole, requiredPermission)).toBe(false);
    });

    it("returns false when the role does not exist in permissions data", () => {
      const userRole = "unknownRole";
      const requiredPermission = "manageUsers";
      
      expect(hasPermission(userRole, requiredPermission)).toBe(false);
    });
  });

  describe("getUserRoleFromToken", () => {
    it("returns the user role from the Redux store", () => {
      const mockUserRole = "editor";

      // Mock useSelector to return "editor" role
      useSelector.mockImplementation((selector) => {
        if (selector === getUserRole) return mockUserRole;
        return null;
      });

      expect(getUserRoleFromToken()).toBe(mockUserRole);
    });
  });
});
