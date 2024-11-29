import React, { Suspense } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Root from "./components/common/Root";
import "./i18n";
import "./App.css";
import "../src/service/apiInterceptor";

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={"loading.."}>
          <ChakraProvider>
            <Root />
            <ToastContainer />
          </ChakraProvider>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
