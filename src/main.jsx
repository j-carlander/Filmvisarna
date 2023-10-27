import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./stylesheet/main.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { MoviesPage } from "./pages/MoviesPage/MoviesPage.jsx";
import { AdminPage } from "./pages/AdminPage/AdminPage.jsx";
import { CancelBookingPage } from "./pages/CancelBookingPage/CancelBookingPage.jsx";
import { MovieDetailPage } from "./pages/MovieDetailPage/MovieDetailPage.jsx";
import { LandingPage } from "./pages/LandingPage/LandingPage";

export const pages = [
  { path: "/", label: "Start", element: <LandingPage /> },
  { path: "/movies", label: "Movies", element: <MoviesPage /> },
  { path: "/movies/:movieid", element: <MovieDetailPage /> },
];

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
  { path: "/cancel", element: <CancelBookingPage /> },
]);

ReactDOM.createRoot(document.querySelector("#root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
