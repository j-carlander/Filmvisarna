import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./stylesheet/main.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { MoviesPage } from "./pages/MoviesPage/MoviesPage.jsx";
import { AdminPage } from "./pages/AdminPage/AdminPage.jsx";
import { BookingConfirmationPage } from "./pages/BookingConfirmationPage/BookingConfirmationPage.jsx";
import { CancelBookingPage } from "./pages/CancelBookingPage/CancelBookingPage.jsx";
import { MovieDetailPage } from "./pages/MovieDetailPage/MovieDetailPage.jsx";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import { AboutUs } from "./pages/AboutUsPage/AboutUsPage.jsx";
import { BookingPage } from "./pages/Bookingpage/BookingPage.jsx";
import { LoginPage } from "./pages/LoginPage/LoginPage.jsx";
import { PageNotFound } from "./pages/PageNotFound/PageNotFound.jsx";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage.jsx";
import { MyAccountPage } from "./pages/MyAccountPage/MyAccountPage.jsx";
import { AdminSearchBookingPage } from "./pages/AdminSearchBookingPage/AdminSearchBookingPage.jsx";

export const pages = [
  { path: "/", element: <LandingPage /> },
  { path: "/movies", label: "Filmer", element: <MoviesPage /> },
  { path: "/movies/:movieid", element: <MovieDetailPage /> },
  { path: "/aboutus#find-us", label: "Hitta hit", element: <AboutUs /> },
  { path: "/aboutus#contact", label: "Kontakt", element: <AboutUs /> },
  { path: "/aboutus", label: "Om oss", element: <AboutUs /> },
  { path: "/booking/:screeningid", element: <BookingPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/myaccount", element: <MyAccountPage /> },
  {
    path: "/bookingconfirmation/:screeningId",
    element: <BookingConfirmationPage />,
  },
  { path: "/register", element: <RegisterPage /> },
  { path: "*", element: <PageNotFound /> },
];

export const adminPages = [
  {
    path: "/admin",
    label: "Sök bokning",
    element: <AdminSearchBookingPage />,
  },
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
    children: adminPages,
  },
  { path: "/cancel", element: <CancelBookingPage /> },
]);

ReactDOM.createRoot(document.querySelector("#root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
