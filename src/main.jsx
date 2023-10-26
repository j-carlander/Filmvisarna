import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './stylesheet/main.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { MoviesPage } from './pages/MoviesPage/MoviesPage.jsx';
import { MovieDetailPage } from './pages/MovieDetailPage/MovieDetailPage.jsx';

export const pages = [
  { path: '/', label: 'Start', element: <MoviesPage /> },
  { path: '/movies/:movieid', label: 'Detail', element: <MovieDetailPage /> }
];

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: pages
  }
]);

ReactDOM.createRoot(document.querySelector('#root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
