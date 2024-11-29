import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/index.js";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./auth/authconfig.js";
import { PublicClientApplication } from "@azure/msal-browser";

const msalInstance = new PublicClientApplication(msalConfig);
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <MsalProvider instance={msalInstance}>
      <StrictMode>
        <App />
      </StrictMode>
    </MsalProvider>
  </Provider>
);
