import React, { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Outlet, useNavigate } from "react-router-dom";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { toast } from "react-toastify";
import "./Login.css";
import Header from "../header/Header";
import { StyledH1, SignIn, SpanText, ErrorMessage } from "./LoginStyles";
import Layout from "../../common/layout/Layout";
import { getRequest } from "../../../service/apiService";
import {
  setUser,
  setUserRole,
  getUserRole,
  setLoggedInData,
} from "../../../store/hooks";
import { useDispatch, useSelector } from "react-redux";

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const validatePassword = (password) => {
  // Regular expression for strong password
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return strongPasswordRegex.test(password);
};

const Login = () => {
  const disptach = useDispatch();
  const auth = localStorage.getItem("isLoggegIn") === "true";
  const userRole = useSelector(getUserRole);
  const { t } = useTranslation();
  const navigate = useNavigate();
  // login form data
  const [formData, setFormData] = useState({
    email: "admin@gmail.com",
    password: "Admin@1234",
  });
  const [errors, setErrors] = useState({});
  // for azure login
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
  }, [userRole]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = t("login.emailRequrid");
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t("login.emailInvalid");
    }
    if (!formData.password) {
      newErrors.password = t("login.passwordRequrid");
    } else if (!validatePassword(formData.password)) {
      newErrors.password = t("login.passwordLenght");
    }
    return newErrors;
  };

  const checkUserRole = async (email) => {
    try {
      const allRoles = await getRequest("/roleList");
      const user = allRoles?.find((user) => user.email === email);

      if (user) {
        // disptach(setIsLoggedIn(true));
        localStorage.setItem("role", user.role);
        localStorage.setItem("isLoggegIn", true);
        const token = {
          accessToken: "accessToken",
          refreshToken: "result.idToken",
          extExpiresOn: new Date().toLocaleString(),
        };
        localStorage.setItem("tokenData", JSON.stringify(token));

        disptach(setUserRole(user.role));
        disptach(setLoggedInData(user));
        navigate("apps/dashboard");
        toast.success(t("login.loginSuccessful"));
      } else {
        toast.error(t("error.userNotFound"));
      }
    } catch {
      (err) => console.error(err);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      checkUserRole(formData.email);
    } else {
      setErrors(formErrors);
    }
  };
  function convertDate(dateString) {
    const date = new Date(dateString);
    // Last digit of the year
    const yearLastDigit = date.getFullYear().toString().slice(-1);

    // Week number of the year (ISO Week Date standard)
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.floor(dayOfYear / 7) + 1;

    // Format result as a 4-digit string
    const formattedWeek = weekNumber.toString().padStart(3, "0");
    return `${yearLastDigit}${formattedWeek}`;
  }

  const handleAzureLogin = () => {
    instance
      .loginPopup({
        scopes: ["User.Read"],
      })
      .then((result) => {
        if (result.accessToken) {
          toast.success(t("login.loginSuccessful"));
          navigate("apps/dashboard");
          // disptach(setIsLoggedIn(true));
          localStorage.setItem("isLoggegIn", true);
          disptach(setLoggedInData(true));
          disptach(
            setUser({
              accessToken: result.accessToken,
              refreshToken: result.idToken,
              extExpiresOn: convertDate(result.extExpiresOn),
            })
          );
          localStorage.setItem("isAzureLoggedIn", true);
          disptach(setUserRole("admin"));
          // logic for refresh token!
          // const authData = JSON.parse(localStorage.getItem("userData"));
          // setTimeout(() => {
          //   authData.accessToken = authData.refreshToken;
          //   localStorage.setItem("userData", JSON.stringify(authData));
          // }, authData.extExpiresOn * 60 * 1000);
        }
      })
      .catch((err) => {
        console.error("login error ", err);
      });
  };

  if (!auth) {
    return (
      <>
        <Header />
        <div className="login-container">
          <div className="login-box">
            <div className="header">
              <div>
                <StyledH1>
                  <SpanText>|</SpanText>
                  {t("login.crudOperations")}
                </StyledH1>
              </div>
              <div className="centered-column">
                <SignIn>{t("login.signIn")}</SignIn>
                <p className="login-heading-text">
                  {t("login.enterYourCredentials")}
                </p>
              </div>
            </div>
            <div className="body">
              <form onSubmit={handleSubmit}>
                <div className="form-control">
                  <label htmlFor="">{t("login.email")}</label>
                  <input
                    type="text"
                    name="email"
                    placeholder={t("login.enterEmail")}
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                </div>
                <div className="form-control">
                  <label htmlFor="">{t("login.password")}</label>
                  <input
                    type="password"
                    name="password"
                    placeholder={t("login.enterPassword")}
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <ErrorMessage className="display-linebreak">
                      {errors.password}
                    </ErrorMessage>
                  )}
                </div>
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
                >
                  {t("login.signIn")}
                </Button>
              </form>
            </div>
            <div className="azure-btn">
              <Button
                variant="solid"
                onClick={handleAzureLogin}
                data-testid={"handle-azure"}
                style={{
                  display:"none",
                  minWidth: "100%",
                  background: "#feaf00",
                  color: "white",
                }}
              >
                {t("login.loginWithAzure")}
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default Login;
