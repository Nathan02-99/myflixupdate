import React from 'react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Favorites from './Components/Favorites';


function FavoritesPage() {
  // Example favorite items data
  const favoriteItems = [
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
    // Add more favorite items as needed
  ];

  return (
    <>
      <Navbar />

      <div className="favorites-page-container">
        <Favorites favoriteItems={favoriteItems} />
      </div>

      <Footer />
    </>
  );
}

export default FavoritesPage;
