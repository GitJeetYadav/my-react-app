import React from "react";
import "./Layout.css";
import PropTypes from "prop-types";
import Sidebar from "../sidebar/Sidebar";
import HeaderComponent from "../../auth/header/Header";

const Layout = ({ children }) => {
  return (
    <>
      <div data-testid="main-wrapper" className="page">
        <Sidebar />
        <div
          id="page-content-wrapper"
          className="page-wrapper res-page-wrapper"
        >
          <HeaderComponent />
          <div className="flex-fill">
            <div className="page-body">{children}</div>
          </div>
          {/* <Footer /> */}
        </div>
      </div>
    </>
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.any,
};
