import React, { Suspense, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/auth/login/Login";
import Admin from "./components/ui-components/admin/Admin";
import Supplier from "./components/ui-components/supplier/Supplier";
import Dealer from "./components/ui-components/dealer/Dealer";
import Dashboard from "./components/ui-components/dashboard/Dashboard";
import AccessDenied from "./components/common/AccessDenied";
import { getUserRole } from "./store/hooks";
import { useSelector } from "react-redux";

const RoutesPage = () => {
  const role = useSelector(getUserRole);
  const navigate = useNavigate();

  // Handle navigation based on the role
  useEffect(() => {
    if (role) {
      window.localStorage.setItem("userRole", role); // Persist the role
    }
  }, [role]);

  // Define allowed routes based on user role
  const allowedRoutes = {
    admin: [
      <Route
        path="apps/dashboard"
        element={<Dashboard />}
        key="admin-dashboard"
      />,
      <Route path="/apps/adminlist" element={<Admin />} key="admin-list" />,
      <Route
        path="/apps/supplierlist"
        element={<Supplier />}
        key="supplier-list"
      />,
      <Route path="/apps/dealerlist" element={<Dealer />} key="dealer-list" />,
    ],
    supplier: [
      <Route
        path="apps/dashboard"
        element={<Dashboard />}
        key="supplier-dashboard"
      />,
      <Route
        path="/apps/supplierlist"
        element={<Supplier />}
        key="supplier-list"
      />,
    ],
    dealer: [
      <Route
        path="apps/dashboard"
        element={<Dashboard />}
        key="dealer-dashboard"
      />,
      <Route path="/apps/dealerlist" element={<Dealer />} key="dealer-list" />,
    ],
  };

  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<Login />}>
            {/* Render routes based on the current user role */}
            {
              localStorage.getItem("role") &&
                allowedRoutes[localStorage.getItem("role")]
              // || (
              // <Route path="*/*" element={<AccessDenied />} />
              // )
            }
          </Route>
          <Route path="*" element={<AccessDenied />}></Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default RoutesPage;
