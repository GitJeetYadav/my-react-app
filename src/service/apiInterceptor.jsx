import axios from "axios";

const apiInterceptor = axios.create({
  // baseURL:'https://671ba9fc2c842d92c380d404.mockapi.io/api/mock/'
  baseURL: "https://jsonplaceholder.typicode.com/",
});

apiInterceptor.interceptors.request.use(
  (config) => {
    const authData = JSON.parse(localStorage.getItem("userData"));
    config.headers = { "Content-Type": "application/json" };
    let user = localStorage.getItem("tokenData");
    if (user) {
      user = JSON.parse(user);
      const expiryIn = new Date(user.extExpiresOn);
      const current = new Date();
      if (current > expiryIn) {
        config.headers.Authorization = `Bearer ${authData.refreshToken}`;
      } else {
        if (authData?.accessToken) {
          config.headers.Authorization = `Bearer ${authData.accessToken};`;
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiInterceptor.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with a status code out of the 2xx range
      const { status, data } = error.response;

      switch (status) {
        case 400:
          console.error("Bad Request: ", data.message || data);
          break;
        case 401:
          console.error("Unauthorized: Please log in again.");
          // Optionally log out the user
          break;
        case 403:
          console.error("Forbidden: You don't have permission.");
          break;
        case 404:
          console.error("Not Found: ", data.message || "Requested resource not found.");
          break;
        case 500:
          console.error("Internal Server Error: Please try again later.");
          break;
        default:
          console.error(`Error ${status}: `, data.message || data);
      }
    } else if (error.request) {
      // No response was received from the server
      console.error("Network Error: ", error.message);
    } else {
      // Something happened in setting up the request
      console.error("Unexpected Error: ", error.message);
    }

    // Optionally show a global error notification

    return Promise.reject(error);
  }
);
export default apiInterceptor;
