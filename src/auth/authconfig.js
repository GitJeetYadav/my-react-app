import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "6b29a008-20c3-4776-ad09-76bd64eb2241",
    authority: "https://login.microsoftonline.com/2f8f7dbd-bc25-4b9e-915d-09baacd44c5f",
    redirectUri: "https://localhost:3000",
    postLogoutRedirectUri: "https://localhost:3000",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie:true
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message) => {
        if (level === LogLevel.Error) console.error(message);
      },
    },
    tokenRenewalOffsetSeconds: 300,  // 5 minutes before expiration
  },
};

export const loginRequest = {
  scopes: ["Admins.Read.All"],
};
