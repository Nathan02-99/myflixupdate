import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider,  } from 'react-router-dom';
// import App from './App';
import Signup from './signup';
import Signin from './signin';
import Profile from './profile';
import SearchPage from './searchpage';
// import Fullcastinfo from './fullcastinfo';
import FavoritesPage from './Favoritespage';
import MoviesPage from './Moviespage';
// import SeriesPage from './Seriespage'
// import SingleMoviePage from './Components/singlemovies';

import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Signup />,
    children: [
      {
        path: 'movies',
        element: <MoviesPage />
      }
    ]
  },
  {
    path: 'favorites-page',
    element: <FavoritesPage />
  },
  {
    path: 'profile-page',
    element: <Profile />
  },
  {
    path: 'search-results',
    element: <SearchPage />
  },
  {
    path: 'sign-in',
    element: < Signin/>
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
