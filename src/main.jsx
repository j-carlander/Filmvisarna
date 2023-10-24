import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./stylesheet/main.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { MoviesPage } from "./pages/MoviesPage/MoviesPage.jsx";
import { AdminPage } from "./pages/AdminPage/AdminPage.jsx";

export const pages = [{ path: "/", label: "Start", element: <MoviesPage /> }];

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: pages,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
]);

ReactDOM.createRoot(document.querySelector("#root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
