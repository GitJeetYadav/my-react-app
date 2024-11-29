import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const AccessDenied = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const userRole = useSelector((state) => state.data.userRole);
  const handleClick = () => {
    navigate("/");
    localStorage.removeItem("role");
    localStorage.setItem("isLoggegIn", false);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="header">
          <div className="centered-column">
            <p className="login-heading-text">
              {t("common.accessDenied")}
            </p>
          </div>
        </div>
        <div className="body">
          <Button
            variant="solid"
            type="submit"
            style={{
              minWidth: "100%",
              background: "#feaf00",
              marginTop: "25px",
              color: "white",
            }}
            data-testid={"handle-signin"}
            onClick={handleClick}
          >
            {t("common.goToLogin")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;
