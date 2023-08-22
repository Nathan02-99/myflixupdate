import React from 'react';
import Navbar from './Components/Navbar';
import Carousel from './Components/customslider';
import Footer from './Components/Footer';
import MovieCard from './Components/cards'; // Import the MovieCard component
import './index.css';

function App() {
  const movies = [
    { title: 'Movie 1', posterUrl: 'https://www.themoviedb.org/t/p/w1280/lZ2sOCMCcGaPppaXj0Wiv0S7A08.jpg' },
    { title: 'Movie 2', posterUrl: 'https://www.themoviedb.org/t/p/w1280/lZ2sOCMCcGaPppaXj0Wiv0S7A08.jpg' },
    { title: 'Movie 3', posterUrl: 'https://www.themoviedb.org/t/p/w1280/lZ2sOCMCcGaPppaXj0Wiv0S7A08.jpg' },
    { title: 'Movie 4', posterUrl: 'https://www.themoviedb.org/t/p/w1280/lZ2sOCMCcGaPppaXj0Wiv0S7A08.jpg' },
    { title: 'Movie 5', posterUrl: 'https://www.themoviedb.org/t/p/w1280/lZ2sOCMCcGaPppaXj0Wiv0S7A08.jpg' },
    { title: 'Movie 6', posterUrl: 'https://www.themoviedb.org/t/p/w1280/lZ2sOCMCcGaPppaXj0Wiv0S7A08.jpg' },
    { title: 'Movie 7', posterUrl: 'https://www.themoviedb.org/t/p/w1280/lZ2sOCMCcGaPppaXj0Wiv0S7A08.jpg' },
    { title: 'Movie 8', posterUrl: 'https://www.themoviedb.org/t/p/w1280/lZ2sOCMCcGaPppaXj0Wiv0S7A08.jpg' },
    { title: 'Movie 9', posterUrl: 'https://www.themoviedb.org/t/p/w1280/lZ2sOCMCcGaPppaXj0Wiv0S7A08.jpg' },
    
  ];

  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Carousel />

        <div className='poptitle'><h3>Popular movies</h3></div>
          <hr></hr>
        {/* Wrap the movie-card-container in a scrolling parent */}
        <div className="movie-card-scroll">
          <div className="movie-card-container">
            {movies.map((movie, index) => (
              <MovieCard key={index} movie={movie} />
            ))}
          </div>
        </div>
        <div className='poptitle'><h3>Popular series</h3></div>
        <hr></hr>

        <div className="movie-card-scroll">
          <div className="movie-card-container">
            {movies.map((movie, index) => (
              <MovieCard key={index} movie={movie} />
            ))}
          </div>
        </div>
        
      </div>
      <Footer />
    </div>
  );
}

export default App;