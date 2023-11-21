/**
 * Main component sets up all the routes on the website. Including admin routes.
 */

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
import { AdminAddScreeningPage } from "./pages/AdminAddScreeningPage/AdminAddScreeningPage.jsx";
import { AdminHandleUserPage } from "./pages/AdminHandleUserPage/AdminHandelUserPage.jsx";
import { AdminMoviesPage } from "./pages/AdminMoviesPage/AdminMoviesPage.jsx";
import { AdminScreeningsPage } from "./pages/AdminScreeningsPage/AdminScreeningsPage.jsx";
import { AdminAddMoviePage } from "./pages/AdminAddMoviePage/AdminAddMoviePage.jsx";

export const pages = [
  { path: "/", element: <LandingPage /> },
  { path: "/filmer", label: "Filmer", element: <MoviesPage /> },
  { path: "/filmer/:movieid", element: <MovieDetailPage /> },
  { path: "/om-oss#hitta-hit", label: "Hitta hit", element: <AboutUs /> },
  { path: "/om-oss#kontakt", label: "Kontakt", element: <AboutUs /> },
  { path: "/om-oss", label: "Om oss", element: <AboutUs /> },
  { path: "/bokning/:screeningid", element: <BookingPage /> },
  { path: "/logga-in", element: <LoginPage /> },
  { path: "/mitt-konto", element: <MyAccountPage /> },
  {
    path: "/bokningsbekraftelse/:screeningId",
    element: <BookingConfirmationPage />,
  },
  { path: "/registrera", element: <RegisterPage /> },
  { path: "*", element: <PageNotFound /> },
];

export const adminPages = [
  {
    path: "/admin",
    label: "Sök bokning",
    element: <AdminSearchBookingPage />,
  },
  {
    path: "/admin/lagg-till-visning",
    label: "Lägg till visning",
    element: <AdminAddScreeningPage />,
  },
  {
    path: "/admin/visningar",
    label: "Ta bort visning",
    element: <AdminMoviesPage />,
  },
  {
    path: "/admin/anvandare",
    label: "Hantera användare",
    element: <AdminHandleUserPage />,
  },
  {
    path: "/admin/visningar/:movieid",
    element: <AdminScreeningsPage />,
  },
  {
    path: "/admin/lagg-till-film",
    label: "Lägg till en film",
    element: <AdminAddMoviePage />,
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
