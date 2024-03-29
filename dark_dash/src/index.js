import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { DataProvider } from "./components/notecontext";
import { ThemeProvider } from "./components/ThemeContext";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout";

import ClipLoader from "react-spinners/ClipLoader";
import { useState, useEffect } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Tablenew from "./components/Tablenew";
import { useTheme } from "./components/ThemeContext";










const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "complaints",
        element: <Tablenew />,
      },
    ],
  },
]);
const AppLoader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Adjust the loading time as needed

    return () => clearTimeout(loadingTimeout);
  }, []);

  return isLoading ? (
    <div className="flex justify-center items-center h-screen text-white">
      <ClipLoader color="white" size={50} />
    </div>
  ) : (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider>
    <DataProvider>
      <React.StrictMode>
        <AppLoader />
      </React.StrictMode>
    </DataProvider>
  </ThemeProvider>
);


reportWebVitals();