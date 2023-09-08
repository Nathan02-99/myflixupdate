import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import ImageSlider from './Components/imageslider';
import { SliderData } from './Components/sliderdata';
import Footer from './Components/Footer';
import MovieCard from './Components/cards'; // Import the MovieCard component
import './index.css';
import './Components/css/cards.css';

function App() {
  const [movies, setMovies] = useState([]); // Store movie data from the API
  const [series, setSeries] = useState([]); // Store TV series data from the API

  useEffect(() => {
    // Fetch movie data from the movie API and set it in state
    fetch('http://localhost:3003/api/popular-movies') // Replace with your movie API endpoint
      .then((response) => response.json())
      .then((data) => {
        setMovies(data); // Set the movie data from the API
      })
      .catch((error) => {
        console.error('Error fetching movies data:', error);
      });

    // Fetch TV series data from the series API and set it in state
    fetch('http://localhost:3003/api/popular-series') // Replace with your series API endpoint
      .then((response) => response.json())
      .then((data) => {
        setSeries(data); // Set the TV series data from the API
      })
      .catch((error) => {
        console.error('Error fetching series data:', error);
      });
  }, []);

  return (
    <div className="HomeApp">
      <Navbar />
      <div className="content">
        <ImageSlider slides={SliderData} />

        <div className='poptitle'><h3>Popular Movies</h3></div>
        

        {/* Wrap the movie-card-container in a scrolling parent */}
        <div className="movie-card-scroll">
          <div className="movie-card-container">
            {movies.map((movie, index) => (
              <MovieCard
                key={index}
                movie={{
                  title: movie.title, // Assuming the movie API provides a title field
                  posterUrl: movie.poster_path, // Assuming the movie API provides a poster_path field
                }}
              />
            ))}
          </div>
        </div>

        <div className='poptitle'><h3>Popular Tv Shows</h3></div>
        

        {/* Wrap the series-card-container in a scrolling parent */}
        <div className="movie-card-scroll">
          <div className="movie-card-container">
            {series.map((serie, index) => (
              <MovieCard
                key={index}
                movie={{
                  title: serie.name, // Assuming the series API provides a name field
                  posterUrl: serie.poster_path, // Assuming the series API provides a poster_path field
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
