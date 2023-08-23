import React from 'react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Series from './Components/series';
import './Components/css/series.css';


function SeriesPage() {
  // Static series data
  const staticSeries = [
    {
        id: 1,
        title: 'Series 1',
        posterUrl: 'https://www.themoviedb.org/t/p/w440_and_h660_face/bQLrHIRNEkE3PdIWQrZHynQZazu.jpg',
      },
      {
        id: 2,
        title: 'Game Of Thrones',
        posterUrl: 'https://www.themoviedb.org/t/p/w440_and_h660_face/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg',
      },
      {
          id: 2,
          title: 'Series 2',
          posterUrl: 'https://www.themoviedb.org/t/p/w440_and_h660_face/7DJKHzAi83BmQrWLrYYOqcoKfhR.jpg',
        },
        {
          id: 2,
          title: 'Series 2',
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
                {
                    id: 1,
                    title: 'Series 1',
                    posterUrl: 'https://www.themoviedb.org/t/p/w440_and_h660_face/bQLrHIRNEkE3PdIWQrZHynQZazu.jpg',
                  },
                  {
                    id: 2,
                    title: 'Game Of Thrones',
                    posterUrl: 'https://www.themoviedb.org/t/p/w440_and_h660_face/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg',
                  },
                  {
                      id: 2,
                      title: 'Series 2',
                      posterUrl: 'https://www.themoviedb.org/t/p/w440_and_h660_face/7DJKHzAi83BmQrWLrYYOqcoKfhR.jpg',
                    },
                    {
                      id: 2,
                      title: 'Series 2',
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
       <h2>Series</h2>
      <div className="series-page-container">
        <Series series={staticSeries} />
      </div>

      <button className='Load'>More</button>

      <Footer />
    </>
  );
}

export default SeriesPage;

