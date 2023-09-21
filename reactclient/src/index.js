import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider,  } from 'react-router-dom';
import App from './App';
import Signup from './signup';
import Signin from './signin';
import Profile from './profile';
import SearchPage from './searchpage';
import Fullcastinfo from './fullcastinfo';
import FavoritesPage from './Favoritespage';
import MoviesPage from './Moviespage';
import SeriesPage from './Seriespage'
import SingleMoviePage from './Components/singlemovies';
import SingleSeriePage from './Components/singleseries';
import { UserProvider } from './userContext';

import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      
    ]
  },
  {
    path: 'movies',
    element: <MoviesPage />
  },
  {
    path:'SingleMoviePage/:id/details',
    element: <SingleMoviePage />
  },
  {
    path: 'series',
    element: <SeriesPage />
  },
  {
    path:'SingleSeriePage/:id/details',
    element: <SingleSeriePage/>
  },
  {
    path:'Fullcastinfo/director/:id',
    element: <Fullcastinfo/>
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
    path: 'search-results/:query',
    element: <SearchPage />
  },
  {
    path: 'sign-in',
    element: < Signin/>
  },
  {
    path: 'sign-up',
    element: < Signup/>
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
     <UserProvider> {/* Wrap your main component with UserProvider */}
      <RouterProvider router={router} />
    </UserProvider>
  
  </React.StrictMode>,  root
);

reportWebVitals();
