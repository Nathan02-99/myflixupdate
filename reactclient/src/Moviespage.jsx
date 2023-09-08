import React from 'react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Movies from './Components/movies';
import './Components/css/movies.css';


function MoviesPage() {
  // Static movie data
  const staticMovies = [
    {
        id: 1,
        title: 'Movie 1',
        posterUrl: 'https://www.themoviedb.org/t/p/w440_and_h660_face/bQLrHIRNEkE3PdIWQrZHynQZazu.jpg',
      },
      {
        id: 2,
        title: 'Game Of Thrones',
        posterUrl: 'https://www.themoviedb.org/t/p/w440_and_h660_face/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg',
      },
      {
          id: 2,
          title: 'Movie 2',
          posterUrl: 'https://www.themoviedb.org/t/p/w440_and_h660_face/7DJKHzAi83BmQrWLrYYOqcoKfhR.jpg',
        },
        {
          id: 2,
          title: 'Movie 2',
          posterUrl: 'https://www.themoviedb.org/t/p/w440_and_h660_face/vR7hwaGQ0ySRoq1WobiNRaPs4WO.jpg',
        },
        {
          id: 2,
          title: 'Movie 2',
          posterUrl: 'https://www.themoviedb.org/t/p/w440_and_h660_face/maBJkaBM4UqAttn9UkLCfZEVEfk.jpg',
        },
        {
            id: 1,
            title: 'Movie 1',
            posterUrl: 'https://www.themoviedb.org/t/p/w440_and_h660_face/bQLrHIRNEkE3PdIWQrZHynQZazu.jpg',
          },
          {
            id: 2,
            title: 'Game Of Thrones',
            posterUrl: 'https://www.themoviedb.org/t/p/w440_and_h660_face/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg',
          },
          {
              id: 2,
              title: 'Movie 2',
              posterUrl: 'https://www.themoviedb.org/t/p/w440_and_h660_face/7DJKHzAi83BmQrWLrYYOqcoKfhR.jpg',
            },
            {
              id: 2,
              title: 'Movie 2',
              posterUrl: 'https://www.themoviedb.org/t/p/w440_and_h660_face/vR7hwaGQ0ySRoq1WobiNRaPs4WO.jpg',
            },
            {
              id: 2,
              title: 'Movie 2',
              posterUrl: 'https://www.themoviedb.org/t/p/w440_and_h660_face/maBJkaBM4UqAttn9UkLCfZEVEfk.jpg',
            },
            {
                id: 1,
                title: 'Movie 1',
                posterUrl: 'https://www.themoviedb.org/t/p/w440_and_h660_face/bQLrHIRNEkE3PdIWQrZHynQZazu.jpg',
              },
              {
                id: 2,
                title: 'Game Of Thrones',
                posterUrl: 'https://www.themoviedb.org/t/p/w440_and_h660_face/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg',
              },
              {
                  id: 2,
                  title: 'Movie 2',
                  posterUrl: 'https://www.themoviedb.org/t/p/w440_and_h660_face/7DJKHzAi83BmQrWLrYYOqcoKfhR.jpg',
                },
                {
                  id: 2,
                  title: 'Movie 2',
                  posterUrl: 'https://www.themoviedb.org/t/p/w440_and_h660_face/vR7hwaGQ0ySRoq1WobiNRaPs4WO.jpg',
                },
                {
                  id: 2,
                  title: 'Movie 2',
                  posterUrl: 'https://www.themoviedb.org/t/p/w440_and_h660_face/maBJkaBM4UqAttn9UkLCfZEVEfk.jpg',
                },
    // Add more static movie data as needed
  ];

  return (
    <>
      <Navbar />
      <div className='movies-page'>
       <h2>Movies</h2>
      <div className="movies-page-container">
        <Movies movies={staticMovies} />
      </div>

      <button className='Load'>More</button>
       </div>
      <Footer />
    </>
  );
}

export default MoviesPage;

